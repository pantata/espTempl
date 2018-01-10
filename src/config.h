/*
 * config.h
 *
 *  Created on: 15. 12. 2017
 *      Author: slouf
 */

#include "configuration.h"
#include "tz.h"

#ifndef CONFIG_H_
#define CONFIG_H_

struct Config {
    //zakladni konfiguracni struktura
    String ssid;     
    String pwd;  
    String hostname;
    uint8_t wifimode;
    String ntpServer;
    unsigned int localPort;
    bool useNtp;
    String profileFileName;
    bool wifidhcp;
    String wifiip;
    String wifimask;
    String wifigw;
    String wifidns1;
    String wifidns2;
    String appwd;
    uint8_t apchannel;
    String apip;
    String apmask;
    String apgw;
    bool useDST;
    TzRule tzRule;
    uint8_t dtFormat;
    uint8_t tmFormat;
    uint8_t lcdTimeout;
    uint8_t menuTimeout;
    uint8_t lang;  

    //uzivatelsky definovane prvky struktury
    bool manual;    
    uint16_t manualValues[MAX_MODULES][7];
};

bool loadConfig();
void normalizeConfig(void);
bool saveConfig(void);

#endif /* CONFIG_H_ */
