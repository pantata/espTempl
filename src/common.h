/*
 * common.h
 *
 *  Created on: 15. 12. 2017
 *      Author: slouf
 */

#ifndef COMMON_H_
#define COMMON_H_

#include "config.h"

typedef enum {
	sos_NO_ERR,
    sos_GEN_ERR,
    sos_FS_ERR,
    sos_WIFI_ERR,
    sos_CONFIG_ERR
} sos_code_t;

typedef enum   { 
    ch_NONE, 
    ch_TIME, 
    ch_TIME_CONFIG, 
    ch_WIFI, 
    ch_IP, 
    ch_LANG,
    ch_RESETAVR,
    ch_UPDATEAVR,    
    ch_RESET
} changed_t;

extern Config config;
extern changed_t changed;

#endif /* COMMON_H_ */
