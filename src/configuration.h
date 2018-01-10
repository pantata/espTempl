
/*
 * common.h
 *
 *  Created on: 15. 12. 2017
 *      Author: slouf
 */

#ifndef CONFIGURATION_H_
#define CONFIGURATION_H_

//jmeno aplikace
#define APP_NAME  "MojeApp"

// debug sekce
#define USE_TRACE
#define DEBUG
#define OTA

// informace o verzi
#define VERSION         String("v.1")
#define VERSION_HTML    String("v.1")

//adresa captive portalu
#define CAPTIVE_URL    "/?page=wifi"

//na kterem pinu je pripojena debug led
#define SOS_LED         2

//nastaveni defaultu site, nazev AP, heslo, http port
#define HOSTNAME        String(APP_NAME) + String(ESP.getChipId(), HEX)
#define AP_IP           String("192.168.4.1")
#define AP_MASK         String("255.255.255.0")
#define AP_PWD          String("heslo1234")
#define TIMESERVER      String("pool.ntp.org")
#define NTPSYNCINTERVAL 3600
#define HTTP_PORT       80
#define DNS_PORT        53

//nastaveni parametru wifi
#define WAIT_FOR_WIFI      10000 //cekaci doba na pripojeni wifi (ms)

/*
 * Uzivatelske konstanty
 */ 
#define MAX_MODULES 16
#define BAUD_RATE   230400     //baud rate pro meziprocesorovou komunikaci
#define BAUD_RATE_A 115200     //baud rate pro upgrade fw na druhem procesoru



#endif /* COMMON_H_ */