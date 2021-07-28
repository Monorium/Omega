#include <Arduino_JSON.h>
#include <ESP32Logger.h>

#include "SubConnector.h"

// SubConnector
SubConnector::SubConnector() {}
void SubConnector::connect() {
  Serial2.begin(115200);
  DBGLOG(Debug, F("connected"));
}
void SubConnector::send(int pin, int angle) {
  Serial2.write(STX);
  Serial2.write(pin);
  Serial2.write(angle);
  Serial2.write(ETX);
  DBGLOG(Debug, F("send pin:%d, angle:%d"), pin, angle);
}
