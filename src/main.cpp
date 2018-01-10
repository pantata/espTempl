/**
 * Sablona aplikace pro ESP8266 s Arduino frameworkem
 *
 * Obsahuje:
 *  - zakladni web portal, s moznosti lokalizace pomoci json souboru
 *  - konfigurace se uklada na FS v json souboru
 *  - nastaveni wifi, casu, ntp serveru, casove zony 
 *  - slozka data obsahuje sablonu web stranky, vcetne CSS
 *  - trace.html (upraveno z http://www.xPablo.cz)
 *  - captive portal pri pripojeni na AP 
 *  - mnozstvi chyb a prasackeho kodu, ktery by potreboval prepsat :) 
 * 
 * pro prelozeni vyzaduje krome Arduino frameworku tyto knihovny (slozka lib):
 *  ArduinoJSON
 *  EspAsyncTCP
 *  Esp Async Wbserver
 *  interval
 *  MyTime
 *  NTPClient
 * 
 * Pripadne dotazy na ludek.slouf@gmail.com
 * 
 * Licence:
 * Copyright (C) 2014, 201ý  Ludek Slouf ludek.slouf@gmail.com
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses 
 * 
 */

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoOTA.h>
#include <ArduinoJson.h>

#include <Ticker.h>
#include <ESP8266mDNS.h>
#include <DNSServer.h>

#include <NTPClient.h>

#include "webserver.h"
#include "config.h"
#include "common.h"
#include "trace.h"

#include "main.h"

extern "C" {
#include "user_interface.h"
}

//Casovac pro test wifi
Ticker wifi_test_ticker;

//DNS server
DNSServer dnsServer;
bool isDNSStarted = false;

//NTP klient
WiFiUDP Udp;
NTPClient ntpClient(Udp);
bool ntpSync = false;
//Casovac pro synchronizaci
Ticker ntp_sync_ticker;
//funkce pro synchronizaci
void ntp_sync()
{
	ntpSync = config.useNtp;
	//nastav dalsi cas synch.
	ntp_sync_ticker.once(NTPSYNCINTERVAL, ntp_sync);
}

//promenna pro docasne ulozeni druhu nastaveni
changed_t changed = ch_NONE;

/*
 * Error SOS led
 * zobrazuje posledni chybu
 */
Ticker sos_ticker;

#define SOS_DELAY 250 //min. pauza mezi kody

#define SOS_LED_OFF HIGH
#define SOS_LED_ON LOW

#define SOS_REPEAT 5
#define SOS_LONG 1	//sec
#define SOS_SHORT 250 //milisec

void sos_timer(sos_code_t e)
{
	static sos_code_t isSet = sos_NO_ERR;
	static int n = 0;
	static int state = SOS_LED_OFF;

	if (isSet != e)
	{
		TRACE(TRACE_DEBUG, "SOS timer is set");
		sos_ticker.detach();
		n = 0;
		state = SOS_LED_OFF;
	}
	isSet = e;
	switch (e)
	{
	case sos_NO_ERR:
		digitalWrite(SOS_LED, SOS_LED_OFF);
		n = 0;
		state = SOS_LED_OFF;
		break;
	case sos_FS_ERR:
		state = !state;
		digitalWrite(SOS_LED, state);
		if (++n < 8)
		{
			sos_ticker.once_ms(SOS_SHORT, sos_timer, e);
		}
		else
		{
			n = 0;
			state = SOS_LED_OFF;
			sos_ticker.once(SOS_REPEAT, sos_timer, e);
		}
		break;
	case sos_WIFI_ERR:
		state = !state;
		digitalWrite(SOS_LED, state);
		n++;
		if (n < 6)
		{
			sos_ticker.once_ms(SOS_SHORT, sos_timer, e);
		}
		else if (n < 10)
		{
			sos_ticker.once(SOS_LONG, sos_timer, e);
		}
		else
		{
			n = 0;
			state = SOS_LED_OFF;
			sos_ticker.once(SOS_REPEAT, sos_timer, e);
		}
		break;
	default:
		state = !state;
		digitalWrite(SOS_LED, state);
		n++;
		if (n < 13)
		{
			sos_ticker.once_ms(SOS_SHORT, sos_timer, e);
		}
		else
		{
			n = 0;
			state = SOS_LED_OFF;
			sos_ticker.once(SOS_REPEAT, sos_timer, e);
		}
	}
	return;
}

//Wifi udalosti
WiFiEventHandler stationConnectedHandler;
WiFiEventHandler stationModeConnectedHandler;
WiFiEventHandler stationModeDisconnectedHandler;

//Pripojeni wifi na AP
void onStaConnected(const WiFiEventStationModeConnected &evt)
{
	TRACE(TRACE_DEBUG, F("WiFi connected"));
	sos_timer(sos_NO_ERR);
	ntpSync = true;
}

//Odpojeni wifi na AP
void onStaDisconnected(const WiFiEventStationModeDisconnected &evt)
{
	TRACE(TRACE_DEBUG, F("WiFi disconnected"));
	sos_timer(sos_WIFI_ERR);
}

//Pripojeni klienta na WIFI v rezimu AP
void onStationConnected(const WiFiEventSoftAPModeStationConnected &evt)
{
	TRACE(TRACE_DEBUG, F("Station connected"));
	sos_timer(sos_NO_ERR);
}

/*
 *  Test, zda je vifi v rezimu STA
 *  a pokud ano, zda je pripojena
 *  Pokud neni, pokusi se pripojit.
 */
#define WIFI_RECONNECT_TIME 600000UL //jak casto se budeme pokouset pripojit
#define WIFI_RECONNECT_ATTTEMPT 5	//max pocet pokusu, nez prejde do rezimu AP
void testWifiConnection()
{
	static uint32_t lastAttempt = 0;
	static int numAttempt = 0;
	TRACE(TRACE_INFO, F("Test WIFI"));

	if (WiFi.getMode() != WIFI_STA)
		return;

	if ((config.wifimode == WIFI_STA) && (millis() - lastAttempt > WIFI_RECONNECT_TIME) && (WiFi.status() != WL_CONNECTED))
	{
		lastAttempt = millis();
		if (numAttempt < WIFI_RECONNECT_ATTTEMPT)
		{
			TRACE(TRACE_ERROR, F("Attempt WIFI reconnect"));
			numAttempt++;
			WiFi.reconnect();
		}
		else
		{
			TRACE(TRACE_ERROR, F("WIFI failover"));
			numAttempt = 0;
			wifiFailover();
		}
	}
}

/*
 * Cekan na pripojeni na WIFi nebo na vyprseni timeoutu
 * Vraci status WiFi
 */
wl_status_t waitForConnectResult(unsigned long _connectTimeout)
{
	unsigned long start = millis();
	boolean waitConnecting = true;
	wl_status_t status;
	while (waitConnecting)
	{
		status = WiFi.status();
		if ((millis() > (start + _connectTimeout)) || (status == WL_CONNECTED) || (status == WL_CONNECT_FAILED))
		{
			waitConnecting = false;
		}
		delay(100);
	}
	return status;
}

/*
 * Nastaví rezim AP, default IP, SSID, HOSTNAME
 * Nastartuje interni DNS server pro captive portal
 */

void wifiFailover(bool fromConfig)
{
	WiFi.hostname(config.hostname.c_str());
	WiFi.mode(WIFI_AP);
	IPAddress apip = IPAddress((uint32_t)0);
	IPAddress apmask = IPAddress((uint32_t)0);
	if (fromConfig)
	{
		apip.fromString(config.apip);
		apmask.fromString(config.apmask);
	}
	else
	{
		apip.fromString(AP_IP);
		apmask.fromString(AP_MASK);
	}

	WiFi.softAPConfig(apip, apip, apmask);
	if (fromConfig)
	{
		WiFi.softAP(config.hostname.c_str(), config.appwd.c_str());
	}
	else
	{
		WiFi.softAP((HOSTNAME).c_str(), (AP_PWD).c_str());
	}

	TRACE(TRACE_INFO, F("WiFi AP started"));
	if (isDNSStarted)
		dnsServer.stop();

	isDNSStarted = dnsServer.start(DNS_PORT, "*", WiFi.softAPIP());
	
	if (!fromConfig)
		sos_timer(sos_WIFI_ERR);
}

/*
 * Nastavi wifi dle konfig. souboru a 
 * pokusi se pripojit, pokud je nastaven rezim klient.
 * V pripade neuspechu je volan wifiFailover(), ktery
 * nastavi rezim AP s default hodnotami
 */
bool wifiConnect(bool force)
{
	bool ret = false;
	if (WiFi.status() == WL_CONNECTED)
	{
		if (force)
		{
			WiFi.disconnect();
			delay(1000);
		}
		else
		{
			return ret;
		}
	}

	if (config.wifimode == WIFI_AP)
	{
		wifiFailover(true);
		ret = false;
	}
	else
	{
		if (WiFi.getMode() != WIFI_STA)
			WiFi.mode(WIFI_STA);

		IPAddress ip = IPAddress((uint32_t)0);
		IPAddress gw = IPAddress((uint32_t)0);
		IPAddress mask = IPAddress((uint32_t)0);
		IPAddress dns1 = IPAddress((uint32_t)0);
		IPAddress dns2 = IPAddress((uint32_t)0);

		if (!config.wifidhcp)
		{

			TRACE(TRACE_DEBUG, "Set static IP");
			gw.fromString(config.wifigw);
			mask.fromString(config.wifimask);
			ip.fromString(config.wifiip);
			dns1.fromString(config.wifidns1);
			dns2.fromString(config.wifidns1);
			WiFi.config(ip, gw, mask, dns1, dns2);
		}
		else
		{
			TRACE(TRACE_DEBUG, "Use DHCP");
		}

		if (config.ssid != "")
		{
			//pokud to neprojde, pak to zkusime s nastaveni z konfigu
			WiFi.begin(config.ssid.c_str(), config.pwd.c_str());
			if (waitForConnectResult(WAIT_FOR_WIFI) != WL_CONNECTED)
			{
				//a pokud ani to neprojde, pak spustime AP
				TRACE(TRACE_ERROR, F("WIFI connection error"));
				wifiFailover();
				ret = false;
			}

			if (config.wifidhcp)
				(void)wifi_station_dhcpc_start();
			TRACE(TRACE_INFO, F("WIFI connected"));
			WiFi.hostname(config.hostname.c_str());
			ret = true;
		}
		else
		{
			TRACE(TRACE_ERROR, F("Config SSID error"));
			wifiFailover();
		}
	}

	return ret;
}

/*
 * Obsluha NTP
 */
time_t getNtpTime()
{
	time_t l = 0;
	if (ntpClient.forceUpdate())
	{
		l = ntpClient.getEpochTime();
	}

	TRACE(TRACE_INFO, "Epoch: %lu", l);
	return l;
}

void setup()
{
#ifdef DEBUG
	Serial.begin(115200);
	Serial.setDebugOutput(true);
#else
	//inicializace komunikace pres ser. port
	Serial.begin(BAUD_RATE);
	Serial.flush();
#endif

	WiFi.persistent(false);
	WiFi.setAutoConnect(false);
	WiFi.setAutoReconnect(false);

	TRACE_INIT;

	pinMode(SOS_LED, OUTPUT);
	digitalWrite(SOS_LED, SOS_LED_OFF);

	stationConnectedHandler = WiFi.onSoftAPModeStationConnected(&onStationConnected);
	stationModeDisconnectedHandler = WiFi.onStationModeDisconnected(&onStaDisconnected);
	stationModeConnectedHandler = WiFi.onStationModeConnected(&onStaConnected);
#ifdef OTA
	ArduinoOTA.onStart([]() {
		SPIFFS.end();
	});
	ArduinoOTA.begin();
#endif

	//otervreme souborovy szstem a nacteme konfiguraci
	if (!(SPIFFS.begin()))
	{
		TRACE(TRACE_ERROR, F("SPIFFS ERROR"));
		sos_timer(sos_FS_ERR);
	}
	else
	{
		if (!loadConfig())
		{
			//TODO: pri prvnim spusteni muzeme naformatovat
			//a vytvorit vsechny potrebne soubory
			//SPIFFS.format();

			/* config file nenalezen, udelame novy. */
			TRACE(TRACE_INFO, F("No config file found"));
			normalizeConfig();
			if (!saveConfig())
			{
				TRACE(TRACE_ERROR, F("Config file save error"));
				sos_timer(sos_CONFIG_ERR);
			}
		}
	}

	// Nastavime a spustime wifi dle hodnot z config souboru
	TRACE(TRACE_INFO, F("Setup WIFI"));
	wifiConnect();

	//hlidac wifi spojeni
	wifi_test_ticker.attach(300, testWifiConnection);

	//spustime web server
	webserver_begin();

	//spustime mdns responder

	if (MDNS.begin(config.hostname.c_str()))
	{
		MDNS.addService("http", "tcp", 80);
	}

	//Spustime NTP klienta
	ntpClient.setPoolServerName(config.ntpServer.c_str());
	ntpClient.begin();
	//a nastavime obsluhu synchronizace casu
	setSyncProvider(getNtpTime);
	//zkusime synchronizaci a nastavime dalsi
	ntp_sync();
}

void loop()
{
	// *********** povinna sekce
	// Tento kod neodstranovat!!
	// Pokud nejsou zpracovany DNS requesty a je DNS pusteno
	// pak dojde k zablokovani procesoru s chybou LmacRxBlk:1
	if (isDNSStarted)
		dnsServer.processNextRequest();
#ifdef OTA
	//obsluha OTA update firmware
	ArduinoOTA.handle();
#endif
	//obsluha trace udalosti
	TRACE_POLL;

	//ntp synchronizace
	if (ntpSync)
	{
		now(true);
		ntpSync = false;
		/*
	 * pokud se synchronizace povede,
	 * nastav priznak zmeny casu
	 */
		if (timeStatus() == timeSet)
			changed = ch_TIME;
	}
	// *********** konec povinne sekce

	//Provedeme zmeny identifikovane priznakem changed
	switch (changed)
	{
	default:
		changed = ch_NONE;
		break;
	case ch_TIME:
		/* pokud potrebujeme provest nejakou akci 
		 * v pripade, ze doslo ke zmene casu,
		 * pak zde
		 */ 
		changed = ch_NONE;
		break;
	case ch_TIME_CONFIG:
		ntpClient.setPoolServerName(config.ntpServer.c_str());
		saveConfig();
		changed = ch_NONE;
		break;
	case ch_WIFI:
		if (wifiConnect(true))
			saveConfig();
		changed = ch_NONE;
		break;
	case ch_IP:
		changed = ch_NONE;
		break;
	case ch_LANG:
		changed = ch_NONE;
		break;
	case ch_RESET:
		ESP.restart();
		changed = ch_NONE;
		break;
		/*
 *     Zde konci zmeny ze sablony
 *     a je mozne pridavat vlastni kody
 *     changed_t je deklarovano v common.h
 */
	case ch_RESETAVR:
		changed = ch_NONE;
		break;
	case ch_UPDATEAVR:
		changed = ch_NONE;
		break;
	}
	/*
	 * Zde je pro vlastni kod vykonavany ve smycce
	 */

	/*
	 * Konec hlavni smycky
	 */
	delay(1);
}