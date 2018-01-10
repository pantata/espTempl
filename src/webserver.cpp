//
//  webserver.cpp
//  RlcWebFw
//
//  Created by Ludek Slouf on 14.11.16.
//  Copyright © 2016 Ludek Slouf. All rights reserved.
//  @version v0.2-10-gf4a3c71

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <FS.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>
#include "common.h"
#include "config.h"
#include "webserver.h"
#include "trace.h"

AsyncWebServer server(HTTP_PORT);

#ifdef USE_TRACE
AsyncWebSocket ws("/trc");
#endif

class CaptiveRequestHandler: public AsyncWebHandler {
public:
	CaptiveRequestHandler() {
	}

	bool canHandle(AsyncWebServerRequest *request) {		
		// redirect if not in wifi client mode (through filter)
		// and request for different host (due to DNS * response)
		if (request->host() != WiFi.softAPIP().toString())
			return true;
		else
			return false;
	}

	void handleRequest(AsyncWebServerRequest *request) {
		TRACE(TRACE_INFO,"Captive portal - host:%s",(request->host()).c_str());
		String location = "http://" + WiFi.softAPIP().toString();
		if (request->host() == config.hostname + ".local")
			location += request->url();
		location += CAPTIVE_URL;
		request->redirect(location);
	}
};


void sendJsonResultResponse(AsyncWebServerRequest *request, bool cond,
							String okResultText, String errorResultText, uint32_t processedTime)
{
	AsyncResponseStream *response = request->beginResponseStream("text/json");
	DynamicJsonBuffer jsonBuffer;
	JsonObject &root = jsonBuffer.createObject();
	root["result"] = (cond) ? okResultText : errorResultText;
	root["time"] = processedTime;
	root.printTo(*response);
	request->send(response);
}

void printDirectory(Dir dir, int numTabs, AsyncResponseStream *response)
{
	bool isDirectory = false;
	response->print(
		F("<table><tr><td><i>File Name</i></td><td  align=\"right\"><i>Size</i></td></tr>"));
	while (dir.next())
	{

		File entry = dir.openFile("r");
		if (!entry)
		{
			isDirectory = true;
		}
		else
		{
			isDirectory = false;
		}

		response->print(F("<tr><td><a href=\""));
		String e = String((const char *)entry.name());
		e.replace(".gz", "");
		response->print(e.c_str());
		response->print(F("\">"));
		response->print(entry.name());
		response->print(F("</a>"));
		response->print(F("</td><td align=\"right\">"));
		if (isDirectory)
		{
			Dir dir1 = SPIFFS.openDir(dir.fileName() + "/" + entry.name());
			printDirectory(dir1, numTabs + 1, response);
		}
		else
		{
			// files have sizes, directories do not
			response->println(entry.size(), DEC);
			response->print(F("</td>"));
		}
		response->print(F("</tr>"));
	}
	FSInfo info;
	SPIFFS.info(info);
	response->print(F("<tr><td></td></tr>"));
	response->print(F("<tr><td>Bytes Total</td>"));
	response->printf("<td align=\"right\">%d</td></tr>", info.totalBytes);
	response->print(F("<tr><td>Bytes Used</td>"));
	response->printf("<td align=\"right\">%d</td></tr>", info.usedBytes);
	response->print(F("<tr><td>Bytes Free</td>"));
	response->printf("<td align=\"right\">%d</td></tr>",
					 (info.totalBytes - info.usedBytes));

	response->print(F("</table>"));
}

//Handle upload file
void onUpload(AsyncWebServerRequest *request, String filename, size_t index,
			  uint8_t *data, size_t len, bool final)
{

	File f;
	String name = "/" + filename;
	if (!index)
	{
		f = SPIFFS.open(name.c_str(), "w");
	}
	else
	{
		f = SPIFFS.open(name.c_str(), "a");
	}

	for (size_t i = 0; i < len; i++)
		f.write(data[i]);

	f.close();

	if (final)
	{
		request->send_P(200, htmltype, "File was successfully uploaded\n");
	}
}

//Handle firmware file
void onUpdate(AsyncWebServerRequest *request, String filename, size_t index,
			  uint8_t *data, size_t len, bool final)
{
	if (!index)
	{
		Update.runAsync(true);
		if (!Update.begin((ESP.getFreeSketchSpace() - 0x1000) & 0xFFFFF000))
		{
			request->send_P(200, htmltype, "Error");
		}
	}
	if (!Update.hasError())
	{
		if (Update.write(data, len) != len)
		{
			request->send_P(200, htmltype, "Error");
		}
	}
	if (final)
	{
		if (Update.end(true))
		{
			request->send_P(200, htmltype, "Success");
		}
		else
		{
			request->send_P(200, htmltype, "Error");
		}
	}
}

void setLang(AsyncWebServerRequest *request)
{
	String lang = request->arg("lang");
	config.lang = lang.toInt();
	request->send_P(200, "text/html", "OK");
	saveConfig();
}

void webserver_begin()
{
	//obsluha captive portalu
	server.addHandler(new CaptiveRequestHandler()).setFilter(ON_AP_FILTER);

	//obsluha statickych stranek
	server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html").setCacheControl("no-cache, must-revalidate");

	server.onNotFound([](AsyncWebServerRequest *request) {
		request->send(404);
	});

	server.on("/upload", HTTP_GET, [](AsyncWebServerRequest *request) {
		AsyncWebServerResponse *response = request->beginResponse_P(200, htmltype, upload_html);
		request->send(response);
	});

	server.on("/upload", HTTP_POST, [](AsyncWebServerRequest *request) {
		request->send(200);
	},
			  onUpload);

	server.on("/delete", HTTP_GET,
			  [](AsyncWebServerRequest *request) {
				  AsyncResponseStream *response = request->beginResponseStream(htmltype);
				  response->print(F("<html><body>"));
				  response->print(F("<h1>Files deleting</h1>"));
				  response->print(F("<form  action=\"/delete\" method=\"POST\">"));
				  response->print(F("<select name=\"filename\">"));
				  Dir root = SPIFFS.openDir("/");
				  while (root.next())
				  {
					  File entry = root.openFile("r");
					  response->print(F("<option>"));
					  response->print(entry.name());
					  response->print(F("</option>"));
				  }
				  response->print(F("</select>"));
				  response->print(F("<input type=\"submit\" value=\"Delete\">"));
				  response->print(F("</form></body></html>"));
				  request->send(response);
			  });

	server.on("/delete", HTTP_POST,
			  [](AsyncWebServerRequest *request) {
				  if (request->hasArg("filename"))
				  {
					  String arg = request->arg("filename");
					  bool ok = SPIFFS.remove(arg);
					  if (ok)
					  {
						  request->send_P(200, htmltype, "File was successfully deleted");
					  }
					  else
					  {
						  request->send_P(200, htmltype, "File was not deleted");
					  }
				  }
				  else
				  {
					  request->send_P(200, htmltype, "Unknown parameter");
				  }
			  });

	server.on("/update", HTTP_GET, [](AsyncWebServerRequest *request) {
		request->send(200, htmltype, update_html);
	});

	server.on("/update", HTTP_POST,
			  [](AsyncWebServerRequest *request) {
				  bool res = Update.hasError();
				  if (!res)
					  changed = ch_RESET;
				  AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", !res ? "OK - Wait 30 sec for restart" : "FAIL");
				  response->addHeader("refresh", "30;url=/");
				  request->send(response);
			  },
			  onUpdate);

	server.on("/reset", HTTP_GET, [](AsyncWebServerRequest *request) {
		sendJsonResultResponse(request, true);
		changed = ch_RESET;
	});

	server.on("/list", HTTP_GET,
			  [](AsyncWebServerRequest *request) {
				  AsyncResponseStream *response = request->beginResponseStream(htmltype);
				  response->print(F("<html><body>"));
				  response->print(F("<h1>Files List</h1>\n"));
				  Dir root = SPIFFS.openDir(F("/"));
				  printDirectory(root, 0, response);
				  response->print(F("</body></html>"));
				  request->send(response);
			  });

	server.on("/meminfo", HTTP_GET,
			  [](AsyncWebServerRequest *request) {
				  AsyncJsonResponse *response = new AsyncJsonResponse();
				  JsonObject &root = response->getRoot();
				  FlashMode_t ideMode = ESP.getFlashChipMode();
				  root["heap"] = ESP.getFreeHeap();
				  root["flashid"] = ESP.getFlashChipId();
				  root["realSize"] = ESP.getFlashChipRealSize();
				  root["ideSize"] = ESP.getFlashChipSize();
				  root["byIdSize"] = ESP.getFlashChipSizeByChipId();
				  root["sketchSpace"] = ESP.getFreeSketchSpace();
				  root["ideSpeed"] = ESP.getFlashChipSpeed();
				  root["ideMode"] = (ideMode == FM_QIO ? "QIO" : ideMode == FM_QOUT ? "QOUT" : ideMode == FM_DIO ? "DIO" : ideMode == FM_DOUT ? "DOUT" : "UNKNOWN");
				  root["sdkVersion"] = ESP.getSdkVersion();
				  root["coreVersion"] = ESP.getCoreVersion();
				  root["cpuFreq"] = ESP.getCpuFreqMHz();
				  root["lastReset"] = ESP.getResetReason();
				  root["lastResetInfo"] = ESP.getResetInfo();
				  root["fwMD5"] = ESP.getSketchMD5();
				  response->setLength();
				  request->send(response);
			  });

	server.on("/getconfig.cgi", HTTP_GET, [](AsyncWebServerRequest *request) {
		AsyncJsonResponse *response = new AsyncJsonResponse();
		JsonObject &root = response->getRoot();
		root["ssid"] = config.ssid;
		root["hostname"] = config.hostname;
		root["wifimode"] = config.wifimode;
		root["wifidhcp"] = config.wifidhcp;
		root["wifiip"] = config.wifiip;
		root["wifimask"] = config.wifimask;
		root["wifigw"] = config.wifigw;
		root["wifidns1"] = config.wifidns1;
		root["wifidns2"] = config.wifidns2;
		root["apchannel"] = config.apchannel;
		root["apip"] = config.apip;
		root["apmask"] = config.apmask;
		root["apgw"] = config.apgw;
		root["lang"] = config.lang;
		root["dst"] = config.useDST;
		root["useNTP"] = config.useNtp;
		root["ntpServer"] = config.ntpServer.c_str();
		root["timeZone"] = config.tzRule.tzName.c_str();
		root["dtFormat"] = config.dtFormat;
		root["tmFormat"] = config.tmFormat;
		root["dstStartDay"] = config.tzRule.dstStart.day;
		root["dstStartWeek"] = config.tzRule.dstStart.week;
		root["dstStartMonth"] = config.tzRule.dstStart.month;
		root["dstStartHour"] = config.tzRule.dstStart.hour;
		root["dstStartOffset"] = config.tzRule.dstStart.offset;
		root["dstEndDay"] = config.tzRule.dstEnd.day;
		root["dstEndWeek"] = config.tzRule.dstEnd.week;
		root["dstEndMonth"] = config.tzRule.dstEnd.month;
		root["dstEndHour"] = config.tzRule.dstEnd.hour;
		root["dstEndOffset"] = config.tzRule.dstEnd.offset;
		root["lcdTimeout"] = config.lcdTimeout;
		root["menuTimeout"] = config.menuTimeout;
		response->setLength();
		request->send(response);
	});

	server.on("/wifistatus.cgi", HTTP_GET, [](AsyncWebServerRequest *request) {
		AsyncJsonResponse *response = new AsyncJsonResponse();
		JsonObject &root = response->getRoot();
		root["i18n_mode"] = (uint8_t)WiFi.getMode();
		root["chan"] = WiFi.channel();
		root["ssid"] = WiFi.SSID();
		root["i18n_status"] = (uint8_t)WiFi.status();
		root["localIp"] = WiFi.localIP().toString();
		root["localMask"] = WiFi.subnetMask().toString();
		root["localGw"] = WiFi.gatewayIP().toString();
		root["apIp"] = WiFi.softAPIP().toString();
		root["rssi"] = WiFi.RSSI();
		root["phy"] = WiFi.getPhyMode();
		root["mac"] = WiFi.macAddress();
		root["psk"] = WiFi.psk();
		root["bssid"] = WiFi.BSSIDstr();
		root["host"] = WiFi.getMode() ==  WIFI_STA?WiFi.hostname():config.hostname;
		response->setLength();
		request->send(response);
	});

	/*
	 *  WiFi scan handler
	 */
	server.on("/wifiscan.cgi", HTTP_GET, [](AsyncWebServerRequest *request) {
		int count = WiFi.scanComplete();
		AsyncJsonResponse *response = new AsyncJsonResponse();
		JsonObject &root = response->getRoot();
		root["inProgress"] = count >= 0 ? 0 : -1;
		JsonArray &aps = root.createNestedArray("APs");

		for (int i = 0; i < count; i++)
		{
			JsonObject &ap = aps.createNestedObject();
			ap["essid"] = WiFi.SSID(i);
			ap["rssi"] = WiFi.RSSI(i);
			ap["enc"] = WiFi.encryptionType(i);
			ap["ch"] = WiFi.channel(i);
		}
		response->setLength();
		request->send(response);

		if (WiFi.scanComplete() != WIFI_SCAN_RUNNING)
		{
			WiFi.scanDelete();
			WiFi.scanNetworks(true);
		}
	});

	server.on("/wificonnect.cgi", HTTP_POST,
			  [](AsyncWebServerRequest *request) {
				  TRACE(TRACE_DEBUG,"%s",request->arg("apmode").c_str());
				  config.wifimode = atoi(request->arg("apmode").c_str());

				  if (config.wifimode == WIFI_AP)
				  {
					  if ((request->arg("apname").length())!=0 ) {
						   request->arg("apname");
					  } else {
						  config.hostname = HOSTNAME;
					  }

					  if ((request->arg("appwd").length())!=0 ) {
						config.appwd = request->arg("appwd");
					  } else {
						config.appwd = AP_PWD;
					  }
					  
					  if ((request->arg("apchannel").length())!=0 ) {
						  config.apchannel = atoi(request->arg("apchannel").c_str());
					  }

					  if ((request->arg("apip").length())!=0 ) {
						config.apip = request->arg("apip");
					  }	else {
						 config.apip = AP_IP;
					  }

					  if ((request->arg("apgw").length())!=0 ) {
						config.apgw = request->arg("apgw");
					  }	else {
						  config.apgw = AP_IP;
					  }

					  if ((request->arg("apmask").length())!=0 ) {
						config.apmask = request->arg("apmask");
					  }	else {
						config.apmask = "255.255.255.0";
					  }
					  saveConfig();
				  }

				  if (config.wifimode == WIFI_STA)
				  {
					  if ((request->arg("ssid").length())!=0 ) {
						config.ssid = request->arg("ssid");
					  }		
					  config.pwd = request->arg("pwd");					  
					  config.wifidhcp = String(request->arg("dhcponoff")).equals("1");
					  
					  if (!config.wifidhcp)
					  {
					  	if ((request->arg("ip").length())!=0 ) {
							config.wifiip = request->arg("ip");
					  	} else {
							config.wifidhcp = true;  
						}

					  	if ((request->arg("wifimask").length())!=0 ) {
							config.wifimask = request->arg("wifimask");
					  	} else {
							config.wifimask = "255.255.255.0";  
						}								  

						config.wifigw = request->arg("wifigw");

						config.wifidns1 = request->arg("dns1");
						config.wifidns2 = request->arg("dns2");
					  }
				  }

				  AsyncJsonResponse *response = new AsyncJsonResponse();
				  JsonObject &root = response->getRoot();
				  if ( config.wifimode == WIFI_AP ) {
					root["url"] = String("http://") + config.apip;
				  } else {
					root["url"] = String("http://") + config.hostname + String(".local");
				  }				
				  response->setLength();
				  request->send(response);	
				  changed = config.wifimode == WIFI_AP?ch_RESET:ch_WIFI;
			  });

	server.on("/settime.cgi", HTTP_POST, [](AsyncWebServerRequest *request) {
		//setTimeCgi(request);
		//changed = ch_TIME;
	});

	server.on("/setlang.cgi", HTTP_POST, [](AsyncWebServerRequest *request) {
		setLang(request);
		//changed = ch_LANG;
	});

	server.on("/gettime.cgi", HTTP_GET, [](AsyncWebServerRequest *request) {
		time_t utc = now(); //current time from the Time Library
		AsyncResponseStream *response = request->beginResponseStream("text/json");
		DynamicJsonBuffer jsonBuffer;
		JsonObject &root = jsonBuffer.createObject();
		root["utc"] = utc;
		root.printTo(*response);
		request->send(response);
	});

	server.on("/showversions.cgi", HTTP_GET,
			  [](AsyncWebServerRequest *request) {
				  AsyncResponseStream *response = request->beginResponseStream("text/json");
				  DynamicJsonBuffer jsonBuffer;
				  JsonObject &root = jsonBuffer.createObject();
				  root["coreVersion"] = VERSION;
				  root["masterVersion"] = VERSION_HTML;
				  root.printTo(*response);
				  request->send(response);
			  });


	TRACE_ADDWEB(&ws);

#ifdef USE_TRACE	
	server.addHandler(&ws);
#endif	

/*
 * zde je mozne pridat dalsi obsluhu http requestu
 */ 


	server.begin();
}
