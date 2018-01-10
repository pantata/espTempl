
#ifndef _TRACE_H_
#define _TRACE_H_

#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include "configuration.h"

// Definice jednotlivych typu hlaseni do trasovani
#define TRACE_ERROR   0 // chybova zprava = cervena
#define TRACE_WARNING 1 // varovani - zluta
#define TRACE_INFO    2 // informacni zprava - zelena
#define TRACE_DEBUG   3 // ladici zprava - cerna
#define TRACE_DEBUGMORE 4 // mene zajimava ladici zprava - take cerna

#define TRACE_CHECK_INTERVAL 200 // interval [ms], po kterem je testovano odesilani stopare

#ifdef USE_TRACE
#define TRACE_INIT           trace_init()
#define TRACE(severity, ...) trace_print(severity, __VA_ARGS__)
#define TRACE_POLL           trace_poll()
#define TRACE_ADDWEB(srv)    trace_addweb(srv)
#else
#define TRACE_INIT           ((void)0)
#define TRACE(severity, ...) ((void)0)
#define TRACE_POLL           ((void)0)
#define TRACE_ADDWEB(srv)      ((void)0)
#endif

void trace_poll();
void trace_addweb(AsyncWebSocket *socket);
void trace_init(void);
void trace_print(uint8_t severity, const __FlashStringHelper *fmt, ...);
void trace_print(uint8_t severity, const char *fmt, ...);

#endif // _TRACE_H_
