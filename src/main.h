//
//  main.h
//  RlcWebFw
//
//  Created by Ludek Slouf on 21.10.16.
//  Copyright © 2016 Ludek Slouf. All rights reserved.
//
//  @version v0.2-10-gf4a3c71

#ifndef main_h
#define main_h
#include "Arduino.h"

bool wifiConnect(bool force=false);
void wifiFailover(bool fromConfig=false);
void onStaConnected(const WiFiEventStationModeConnected &evt);
void onStaDisconnected(const WiFiEventStationModeDisconnected &evt);
void onStationConnected(const WiFiEventSoftAPModeStationConnected &evt);

#endif /* main_h */