#ifndef SubConnector_H
#define SubConnector_H

#include <Arduino_JSON.h>

class SubConnector {
 public:
  SubConnector();
  void connect();
  void send(int pin, int angle);

 private:
  byte STX = 0x02;
  byte ETX = 0x03;
};

#endif
