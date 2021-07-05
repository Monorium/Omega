#include <QMC5883LCompass.h>

DigitalCompass::DigitalCompass() {
}
void DigitalCompass::init() {
  compass.init();
  compass.setCalibration(-1760, 1341, -1640, 1431, -1468, 1388);
  DBGLOG(Info, F("finished"));
}
int DigitalCompass::getAzimuth() {
  compass.read();
  int compassAngle = compass.getAzimuth();
  return compassAngle;
}

int DigitalCompass::getAzimuthAngle() {
  int compassAngle = getAzimuth();
  int jointAngle = (compassAngle - 90) / 10 * 10;
  if (jointAngle < 10) jointAngle = 10;
  if (jointAngle > 170) jointAngle = 170;
  return jointAngle;
}
