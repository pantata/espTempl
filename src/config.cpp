/*
 * config.cpp
 *
 *  Created on: 15. 12. 2017
 *      Author: slouf
 */


#include <Arduino.h>
#include <ArduinoJson.h>
#include <FS.h>
#include <ESP8266WiFi.h>
#include <MD5.h>
#include "config.h"
#include "trace.h"

Config config;
String md5Config;

/*
 * nasteni konfigurace ze souboru
 */ 
bool loadConfig() {

	File configFile = SPIFFS.open("/config.json", "r");
	if (!configFile) {
		return false;
	}
	DynamicJsonBuffer jsonBuffer;	
	JsonObject& json = jsonBuffer.parseObject(configFile);

	if (!json.success()) {
		return false;
	}
//Zakladni konfigurace
	if (json.containsKey("ssid"))
		config.ssid = String((const char *) json[F("ssid")]);
	if (json.containsKey("pwd"))
		config.pwd = String((const char *) json[F("pwd")]);
	if (json.containsKey("hostname"))
		config.hostname = String((const char *) json[F("hostname")]);
	if (json.containsKey("wifimode"))
		config.wifimode = json["wifimode"];
	if (json.containsKey("ntpServer"))
		config.ntpServer = String((const char*) json[F("ntpServer")]);
	if (json.containsKey("localPort"))
		config.localPort = json["localPort"];
	String useNtp =
			(json.containsKey("useNtp")) ?
					String((const char*) json[F("useNtp")]) : "false";
	config.useNtp = (useNtp.equals("true")) ? 1 : 0;
	String wifidhcp =
			(json.containsKey("wifidhcp")) ?
					String((const char*) json[F("wifidhcp")]) : "true";
	config.wifidhcp = (wifidhcp.equals("true")) ? 1 : 0;
	if (json.containsKey("wifiip"))
		config.wifiip = String((const char*) json[F("wifiip")]);
	if (json.containsKey("wifimask"))
		config.wifimask = String((const char*) json[F("wifimask")]);
	if (json.containsKey("wifigw"))
		config.wifigw = String((const char*) json[F("wifigw")]);
	if (json.containsKey("wifidns1"))
		config.wifidns1 = String((const char*) json[F("wifidns1")]);
	if (json.containsKey("wifidns2"))
		config.wifidns2 = String((const char*) json[F("wifidns2")]);
	if (json.containsKey("appwd"))
		config.appwd = String((const char*) json[F("appwd")]);
	if (json.containsKey("apchannel"))
		config.apchannel = json[F("apchannel")];
	if (json.containsKey("apip"))
		config.apip = String((const char*) json[F("apip")]);
	if (json.containsKey("apmask"))
		config.apmask = String((const char*) json[F("apmask")]);
	if (json.containsKey("apgw"))
		config.apgw = String((const char*) json[F("apgw")]);
	String useDST =
			(json.containsKey("useDST")) ?
					String((const char*) json[F("useDST")]) : "false";
	config.useDST = (useDST.equals("true")) ? 1 : 0;
	config.tzRule = TzRule();
	if (json.containsKey("tzRule.tzName"))
		config.tzRule.tzName = String((const char*) json[F("tzRule.tzName")]);
	if (json.containsKey("tzRule.dstStart.day"))
		config.tzRule.dstStart.day = json[F("tzRule.dstStart.day")];
	if (json.containsKey("tzRule.dstStart.hour"))
		config.tzRule.dstStart.hour = json[F("tzRule.dstStart.hour")];
	if (json.containsKey("tzRule.dstStart.month"))
		config.tzRule.dstStart.month = json[F("tzRule.dstStart.month")];
	if (json.containsKey("tzRule.dstStart.offset"))
		config.tzRule.dstStart.offset = json[F("tzRule.dstStart.offset")];
	if (json.containsKey("tzRule.dstStart.weeek"))
		config.tzRule.dstStart.week = json[F("tzRule.dstStart.weeek")];
	if (json.containsKey("tzRule.dstEnd.day"))
		config.tzRule.dstEnd.day = json[F("tzRule.dstEnd.day")];
	if (json.containsKey("tzRule.dstEnd.hour"))
		config.tzRule.dstEnd.hour = json[F("tzRule.dstEnd.hour")];
	if (json.containsKey("tzRule.dstEnd.month"))
		config.tzRule.dstEnd.month = json[F("tzRule.dstEnd.month")];
	if (json.containsKey("tzRule.dstEnd.offset"))
		config.tzRule.dstEnd.offset = json[F("tzRule.dstEnd.offset")];
	if (json.containsKey("tzRule.dstEnd.week"))
		config.tzRule.dstEnd.week = json[F("tzRule.dstEnd.week")];

	if (json.containsKey("tmFormat"))
		config.tmFormat = json[F("tmFormat")];
	if (json.containsKey("dtFormat"))
		config.dtFormat = json[F("dtFormat")];

	if (json.containsKey("lcdTimeout"))
		config.lcdTimeout = json[F("lcdTimeout")];
	if (json.containsKey("menuTimeout"))
		config.menuTimeout = json[F("menuTimeout")];

	if (json.containsKey("lang"))
		config.lang = json[F("lang")];

//UZivatelska konfigurace
	if (json.containsKey("profileFileName"))
		config.profileFileName = String((const char*) json[F("profileFileName")]);
	String useManual =
			(json.containsKey("led.manual")) ?
					String((const char*) json[F("led.manual")]) : "false";
	config.manual = (useManual.equals("true")) ? 1 : 0;

	if (json.containsKey("manualValues")) {
		for (int i = 0; i < MAX_MODULES; i++) {
			config.manualValues[i][0] = json[F("manualValues")][i][0];
			config.manualValues[i][1] = json[F("manualValues")][i][1];
			config.manualValues[i][2] = json[F("manualValues")][i][2];
			config.manualValues[i][3] = json[F("manualValues")][i][3];
			config.manualValues[i][4] = json[F("manualValues")][i][4];
			config.manualValues[i][5] = json[F("manualValues")][i][5];
			config.manualValues[i][6] = json[F("manualValues")][i][6];
		}
	}
	
	configFile.close();
	// Kontrola a doplneni kong. souboru.
	normalizeConfig();
	//spocitame kontrolni md5 a ulozime
	MD5Builder md5;
	md5.begin();
	md5.add((uint8_t*)&config, sizeof(config));
	md5.calculate();
	md5Config = md5.toString();
	TRACE(TRACE_INFO,"Config MD5:%s",md5Config.c_str());
	return true;
}

/*
 * Kontrola hodnot nactenych z konf. souboru
 * (napr. po riucni editaci), nastaveni mezi, konstant atd 
 */ 
void normalizeConfig(void) {
	 //zakladni konfigurace
	if (config.hostname.length() == 0)
		config.hostname = HOSTNAME;

	if (config.ssid.length() == 0) {
		config.ssid = HOSTNAME;
		config.wifimode = WIFI_AP;
		config.useNtp = false;
	}

	if (config.wifimode == 0)
		config.wifimode = WIFI_AP;
	if (config.appwd.length() == 0)
		config.appwd = AP_PWD;		
	if (config.apip.length() == 0)
		config.apip = AP_IP;
	if (config.apmask.length() == 0)
		config.apmask = AP_MASK;
	if (config.ntpServer.length() == 0)
		config.ntpServer = TIMESERVER;
	if (config.wifiip.length() == 0)
		config.wifidhcp = true;

	config.apchannel = constrain(config.apchannel, 1, 11);

	if (config.useDST == NULL)
		config.useDST = true;
	if (config.tzRule.tzName.length() == 0) {
		config.tzRule.tzName = "SEC";
		config.tzRule.dstStart.month = Mar;
		config.tzRule.dstStart.week = Second;
		config.tzRule.dstStart.day = Sun;
		config.tzRule.dstStart.hour = 2;
		config.tzRule.dstStart.offset = 120;
		config.tzRule.dstEnd.month = Oct;
		config.tzRule.dstEnd.week = Last;
		config.tzRule.dstEnd.day = Sun;
		config.tzRule.dstEnd.hour = 3;
		config.tzRule.dstEnd.offset = 60;
	}

	config.dtFormat = constrain(config.dtFormat, 0, 4);
	config.tmFormat = constrain(config.tmFormat, 0, 7);

	config.lcdTimeout = constrain(config.lcdTimeout, 5, 127);
	config.menuTimeout = constrain(config.menuTimeout, 5, 127);
	config.lang = constrain(config.lang, 0, 3);
	
	//Uzivatelska konfigurace
}

/*
 * Ulozeni struktury Config do json souboru
 * Uklada se pouze pri zmene obsahu struktury
 * vuci obsahu ulozenemu na disku
 * vraci false, pokud dojde k chybe
 */ 
bool saveConfig(void) {
	//kontrola, zda opravdu doslo ke zmene v datech struktury
	MD5Builder md5;
	md5.begin();	
	md5.add((uint8_t*)&config, sizeof(config));
	md5.calculate();
	String md5MemConfig = md5.toString();

	if (md5MemConfig.equals(md5Config))	{
		TRACE(TRACE_INFO,F("Config is equal, not saving"));
		return true;
	} else {
		TRACE(TRACE_INFO,F("Config save"));
	}

	DynamicJsonBuffer jsonBuffer;
	JsonObject& json = jsonBuffer.createObject();

//zakladni konfigurace
	json["ssid"] = config.ssid.c_str();
	json["pwd"] = config.pwd.c_str();
	json["hostname"] = config.hostname.c_str();
	json["wifimode"] = config.wifimode;
	json["ntpServer"] = config.ntpServer.c_str();
	json["localPort"] = config.localPort;
	json["useNtp"] = (config.useNtp) ? "true" : "false";
	json["wifidhcp"] = (config.wifidhcp) ? "true" : "false";
	json["wifiip"] = config.wifiip.c_str();
	json["wifimask"] = config.wifimask.c_str();
	json["wifigw"] = config.wifigw.c_str();
	json["wifidns1"] = config.wifidns1.c_str();
	json["wifidns2"] = config.wifidns2.c_str();
	json["appwd"] = config.appwd.c_str();
	json["apchannel"] = config.apchannel;
	json["apip"] = config.apip.c_str();
	json["apmask"] = config.apmask.c_str();
	json["apgw"] = config.apgw.c_str();
	json["useDST"] = (config.useDST) ? "true" : "false";
	json["tzRule.tzName"] = config.tzRule.tzName.c_str();
	json["tzRule.dstStart.day"] = config.tzRule.dstStart.day;
	json["tzRule.dstStart.hour"] = config.tzRule.dstStart.hour;
	json["tzRule.dstStart.month"] = config.tzRule.dstStart.month;
	json["tzRule.dstStart.offset"] = config.tzRule.dstStart.offset;
	json["tzRule.dstStart.week"] = config.tzRule.dstStart.week;
	json["tzRule.dstEnd.day"] = config.tzRule.dstEnd.day;
	json["tzRule.dstEnd.hour"] = config.tzRule.dstEnd.hour;
	json["tzRule.dstEnd.month"] = config.tzRule.dstEnd.month;
	json["tzRule.dstEnd.offset"] = config.tzRule.dstEnd.offset;
	json["tzRule.dstEnd.week"] = config.tzRule.dstEnd.week;

	json["tmFormat"] = config.tmFormat;
	json["dtFormat"] = config.dtFormat;
	json["lcdTimeout"] = config.lcdTimeout;
	json["menuTimeout"] = config.menuTimeout;
	json["led.manual"] = (config.manual) ? "true" : "false";
	json["lang"] = config.lang;

//Uzivatelska konfigurace
	json["profileFileName"] = config.profileFileName.c_str();
	JsonArray& data = json.createNestedArray("manualValues");
	for (int i = 0; i < MAX_MODULES; i++) {
		JsonArray& ledVal = data.createNestedArray();
		ledVal.add(config.manualValues[i][0]);
		ledVal.add(config.manualValues[i][1]);
		ledVal.add(config.manualValues[i][2]);
		ledVal.add(config.manualValues[i][3]);
		ledVal.add(config.manualValues[i][4]);
		ledVal.add(config.manualValues[i][5]);
		ledVal.add(config.manualValues[i][6]);
	}

	File configFile = SPIFFS.open("/config.json", "w");
	if (!configFile) {
		return false;
	}

	json.printTo(configFile);
	configFile.close();
	return true;
}
