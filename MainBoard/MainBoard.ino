#include <ArduinoQueue.h>
#define ESP32DEBUGGING
#include <ESP32Logger.h>
#include <ESPmDNS.h>
#include <WiFi.h>
#include <WiFiClient.h>

#include "Configure.h"
#include "DigitalCompass.h"
#include "LegManager.h"

LegManager legManager;
ArduinoQueue<ActionPlan> actionQueue(32);
DigitalCompass digitalCompass;

void setup(void) {
  Serial.begin(115200);
  delay(10);

  DBGINI(&Serial, ESP32Timestamp::TimestampSinceStart);
  DBGLEV(Debug);
  DBGSTA;

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  DBGLOG(Info, F("connect to %s(%s)"), WIFI_SSID, WIFI_PASSWORD);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(F("."));
  }
  Serial.println("");

  DBGLOG(Info, F("connected to %s, IP address: %d.%d.%d.%d"),
         WIFI_SSID, WiFi.localIP()[0], WiFi.localIP()[1], WiFi.localIP()[2], WiFi.localIP()[3]);

  if (MDNS.begin("esp32")) {
    DBGLOG(Info, F("MDNS responder started"));
  }

  legManager.init();
  digitalCompass.init();
  startApiServer();

  xTaskCreatePinnedToCore(onReceiveLegAction, "onReceiveLegAction", 4096, NULL, 1, NULL, 0);
  //xTaskCreatePinnedToCore(synchronizeDigitalCompass, "synchronizeDigitalCompass", 4096, NULL, 1, NULL, 1);
}

void loop(void) {
  handleWebClient();
  delay(2);
}

void onReceiveLegAction(void* params) {
  DBGLOG(Info, F("start loop"));
  while (true) {
    int planCount = -1;
    ActionPlan plans[16];

    while (!actionQueue.isEmpty()) {
      planCount++;
      if (planCount >= 16) {
        break;
      }
      plans[planCount] = actionQueue.dequeue();
    }
    if (planCount >= 0) {
      DBGLOG(Info, F("queue data count:%d"), planCount + 1);
      legManager.action(plans, planCount + 1);
    }

    delay(10);
  }
}

void synchronizeDigitalCompass(void* params) {
  DBGLOG(Info, F("start loop"));
  int beforeAngle = 0;
  while (true) {
    int jointAngle = digitalCompass.getAzimuthAngle();
    if (beforeAngle != jointAngle) {
      DBGLOG(Debug, F("angle:%u"), jointAngle);
      ActionPlan plan;
      plan.legPosition = "MiddleLeft";
      plan.jointPosition = "Third";
      plan.angle = jointAngle;
      actionQueue.enqueue(plan);
      beforeAngle = jointAngle;
    }
    delay(1000);
  }
}
