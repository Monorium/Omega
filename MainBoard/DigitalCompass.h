#ifndef DigitalCompass_H
#define DigitalCompass_H

#include <QMC5883LCompass.h>

class DigitalCompass {
 public:
  DigitalCompass();
  void init();
  int getAzimuth();
  int getAzimuthAngle();

 private:
  QMC5883LCompass compass;
};

#endif
