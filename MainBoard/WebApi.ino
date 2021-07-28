#include <Arduino_JSON.h>
#include <ESP32Logger.h>
#include <WebServer.h>

#include "Configure.h"
#include "LegManager.h"

int HTTP_CODE_OK = 200;
int HTTP_CODE_BAD_REQUEST = 400;
int HTTP_CODE_NOT_FOUND = 404;

WebServer server(80);

void handleWebClient() { server.handleClient(); }

void startApiServer() {
  server.on("/", handleRoot);
  server.on("/health", handleHealth);
  server.on("/legs", HTTP_GET, handleLegStatus);
  server.on("/legs", HTTP_POST, handleLegControl);
  server.onNotFound(handleNotFound);
  server.begin();
  DBGLOG(Info, F("HTTP server started"));
}

void handleRoot() {
  DBGLOG(Info, F("receive"));
  server.send(HTTP_CODE_OK, "text/plain", "hello from esp32!");
}

void handleHealth() {
  DBGLOG(Info, F("receive"));
  server.send(HTTP_CODE_OK, "application/json", createResponseMessage("ok"));
}

void handleLegStatus() {
  DBGLOG(Info, F("receive"));
  String status = getLegStatus();
  server.send(HTTP_CODE_OK, "application/json", status);
}

void handleLegControl() {
  DBGLOG(Info, F("receive"));
  String error = moveLeg();
  if (error.length() > 0) {
    DBGLOG(Error, F("control error. reason:%s"), error);
    server.send(HTTP_CODE_BAD_REQUEST, "application/json", createResponseMessage(error));
  } else {
    DBGLOG(Debug, F("control success"));
    String status = getLegStatus();
    server.send(HTTP_CODE_OK, "application/json", status);
  }
}

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(HTTP_CODE_NOT_FOUND, "text/plain", message);
}

String createResponseMessage(String message) {
  JSONVar res;
  res["result"] = message;
  return JSON.stringify(res);
}

String getLegStatus() {
  JSONVar status = legManager.getStatus();
  return JSON.stringify(status);
}

String moveLeg() {
  // check request body
  String body = server.arg("plain");
  if (body.length() == 0) {
    return "Required body";
  }
  JSONVar jsonBody = JSON.parse(body);
  if (JSON.typeof(jsonBody) == "undefined") {
    return "Body parsing error";
  }

  for (int index = 0; index < jsonBody.length(); index++) {
    String position = (const char*)jsonBody[index]["position"];
    JSONVar joints = jsonBody[index]["joints"];
    for (int jointIndex = 0; jointIndex < joints.length(); jointIndex++) {
      String joint = (const char*)joints[jointIndex]["position"];
      int angle = (int)joints[jointIndex]["angle"];
      if (angle < 0) {
        angle = 0;
      } else if (angle > 180) {
        angle = 180;
      }

      ActionPlan plan;
      plan.legPosition = position;
      plan.jointPosition = joint;
      plan.angle = angle;
      actionQueue.enqueue(plan);
    }
  }

  return "";
}
