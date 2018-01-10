//
//  webserver.h
//  RlcWebFw
//
//  Created by Ludek Slouf on 14.11.16.
//  Copyright © 2016 Ludek Slouf. All rights reserved.
//
//  @version v0.2-10-gf4a3c71

#ifndef webserver_h
#define webserver_h

void webserver_begin();
void sendJsonResultResponse(AsyncWebServerRequest *request,bool cond = true,String okResultText = "OK",String errorResultText = "Error",uint32_t processedTime = 0);

const char htmltype[] = "text/html";

const char update_html[] = R"html(
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
<h1>Firmware updater</h1>
<form enctype="multipart/form-data" action="/update" method="POST">
<input name="fwupdate" type="hidden">
<input name="datafile" type="file">
<input value="Firmware Upload" type="submit">
</form>
</body></html>
)html";

const char upload_html[] PROGMEM = R"html(
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
<h1>File uploader</h1>
<form enctype="multipart/form-data" action="/upload" method="POST">
<input type="file" name="datafile" />
<input type="submit" value="Upload"/>
</form>
</body>
</html>
)html";



#endif /* webserver_h */
