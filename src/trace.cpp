
#include <interval.h>
#include <ESPAsyncWebServer.h>
#include "trace.h"

#define MAX_TRACE_LINES 15
#define MAX_LINE_LEN 50

static AsyncWebSocket *_ws = NULL; // webovy soket pro trasovani
static Interval _tint;             // interval pro casovani stopare

struct TraceLine
{
  char _text[MAX_LINE_LEN + 1];
  uint32_t _time;
  uint8_t _severity;

  TraceLine(uint8_t severity, const char *str, uint16_t len)
  {
    strncpy(_text, str, sizeof(_text));
    _text[MAX_LINE_LEN + 1] = 0;
    _time = millis();
    _severity = severity;
  }

  TraceLine(void) {}
};

static TraceLine _lines[MAX_TRACE_LINES];
static uint16_t _lines_index = 0;
static uint16_t _lines_count = 0;
static int _modified = 0;

static int modulo(int a, int b)
{
  int r = a % b;

  return ((r < 0) ? r + b : r);
}

static TraceLine &trace_line(uint16_t index)
{
  int start = _lines_index - _lines_count;
  int idx = modulo(start + index, _lines_count);

  return (_lines[idx]);
}

static void print(uint8_t severity, const char *buffer, int length)
{
  char lin[(MAX_LINE_LEN * 4) + 1];
  int lineptr = 0;

  while (0 != *buffer)
  {
    switch (*buffer) // uprava escape sekvenci pro JSON/HTML
    {
    case '"':
      lin[lineptr++] = '\\';
      lin[lineptr] = '"';
      break;

    case '\\':
      lin[lineptr++] = '\\';
      lin[lineptr] = '\\';
      break;

    case '/':
      lin[lineptr++] = '\\';
      lin[lineptr] = '/';
      break;

    case '<':
      strcpy(&lin[lineptr], "&lt;");
      lineptr += 3;
      break;

    case '>':
      strcpy(&lin[lineptr], "&gt;");
      lineptr += 3;
      break;

    default:
      if (*buffer > 0x1f)
        lin[lineptr] = *buffer;
      else
        lin[lineptr] = '?';
      break;
    }
    ++lineptr;
    ++buffer;
  }
  if (lineptr > MAX_LINE_LEN)
    lineptr = MAX_LINE_LEN;
  lin[lineptr] = 0; // ukoncime retezec

  TraceLine line(severity, lin, lineptr);

  _lines[_lines_index++] = line;
  _lines_index %= MAX_TRACE_LINES;
  if (_lines_count < MAX_TRACE_LINES)
  {
    ++_lines_count;
  }
  ++_modified;
}

void trace_print(uint8_t severity, const __FlashStringHelper *fmt, ...)
{
  char buffer[MAX_LINE_LEN + 1];
  va_list args;
  int length;

  va_start(args, fmt);
  length = vsnprintf_P(buffer, sizeof(buffer), (const char *)fmt, args);
  va_end(args);

  print(severity, buffer, length);
}

void trace_print(uint8_t severity, const char *fmt, ...)
{
  char buffer[MAX_LINE_LEN + 1];
  va_list args;
  int length;

  va_start(args, fmt);
  length = vsnprintf(buffer, sizeof(buffer), fmt, args);
  va_end(args);

  print(severity, buffer, length);
}

void trace_init(void)
{
  trace_print(TRACE_INFO, F("Trace: Starting..."));
}

static char hexascii(uint8_t n)
{

  n &= 0xf;
  if (n > 9)
    return n + ('A' - 10);
  else
    return n + '0';
}

void trace_dumpJSON(String &str)
{
  for (int i = 0; i < _lines_count; i++)
  {
    TraceLine line = trace_line(i);

    if (0 != i)
      str.concat(F(","));
    str.concat(F("{\"t\":"));
    str.concat(line._time);
    str.concat(F(",\"s\":"));
    str.concat(line._severity);
    str.concat(F(",\"d\":\""));
    str.concat(line._text);
    str.concat(F("\"}"));
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len)
{
  switch (type)
  {
  case WS_EVT_CONNECT:
  {
    String info;
    ++_modified;
    info.reserve(512);
    info = F("{\"type\":\"info\",\"reset\":\"");
    info += ESP.getResetReason();
    info += F("\",\"flash\":\"");
    info += String(ESP.getFlashChipRealSize());
    info += F("\",\"ram\":\"");
    info += String(ESP.getFreeHeap());
    info += F("\"}");
    _ws->textAll(info); // odesleme informace do klienta
  }
  break;

  case WS_EVT_DISCONNECT:
    break;

  case WS_EVT_ERROR:
    break;

  case WS_EVT_PONG:
    break;

  case WS_EVT_DATA:
  {
    AwsFrameInfo *info = (AwsFrameInfo *)arg;
    if (info->opcode == WS_TEXT)
    {
      data[len] = 0;
      if (!strncmp((const char *)data, "mem", len))
      {
        String info;

        info = F("{\"type\":\"mem\",\"ram\":\"");
        info += String(ESP.getFreeHeap());
        info += F("\"}");
        _ws->textAll(info); // odesleme informace do klienta
      }
    }
  }
  break;
  }
}

void trace_addweb(AsyncWebSocket *socket)
{
  _ws = socket;
  _ws->onEvent(onEvent);
}

void trace_poll()
{
  if (NULL != _ws)
  { // je definovany webovy soket
    if (_modified)
    { // mame nejakou zmenu
      if (_ws->count() != 0)
      { // mame klienty
        if (_tint.expired())
        { // .. a vyprsel timeout pro obcerstvovani
          String log;

          if (log.reserve((MAX_TRACE_LINES * MAX_LINE_LEN) + (MAX_TRACE_LINES * 50)))
          {
            log = F("{\"type\":\"trace\",\"data\":[");
            trace_dumpJSON(log);
            log.concat(F("]}"));
            _ws->textAll(log);
          }
          else
          {
            _ws->textAll(F("{\"type\":\"trace\",\"text\":\"Memory error\"}"));
          }
          _modified = 0; // rusime pozadavek na odeslani novych dat
          _tint.set(TRACE_CHECK_INTERVAL);
        }
      }
    }
  }
}
