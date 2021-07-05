#ifndef LegManager_H
#define LegManager_H

#include <Arduino_JSON.h>
#include <ESP32Servo.h>

#include "SubConnector.h"

const int LEG_COUNT = 6;
const int JOINT_COUNT = 3;

enum LegPosition {
  ForeLeftLeg = 0,
  MiddleLeftLeg = 1,
  BackLeftLeg = 2,
  ForeRightLeg = 3,
  MiddleRightLeg = 4,
  BackRightLeg = 5,
  UnknownLeg
};

LegPosition toLegPosition(String positionName) {
  if (String("ForeLeft").equals(positionName)) return ForeLeftLeg;
  if (String("MiddleLeft").equals(positionName)) return MiddleLeftLeg;
  if (String("BackLeft").equals(positionName)) return BackLeftLeg;
  if (String("ForeRight").equals(positionName)) return ForeRightLeg;
  if (String("MiddleRight").equals(positionName)) return MiddleRightLeg;
  if (String("BackRight").equals(positionName)) return BackRightLeg;
  return UnknownLeg;
}

const String LEG_POSITION_NAME[] = {[ForeLeftLeg] = "ForeLeft",
                                    [MiddleLeftLeg] = "MiddleLeft",
                                    [BackLeftLeg] = "BackLeft",
                                    [ForeRightLeg] = "ForeRight",
                                    [MiddleRightLeg] = "MiddleRight",
                                    [BackRightLeg] = "BackRight",
                                    [UnknownLeg] = "Unknown"};

enum JointPosition {
  FirstJoint = 0,
  SecondJoint = 1,
  ThirdJoint = 2,
  UnknownJoint
};

JointPosition toJointPosition(String positionName) {
  if (String("First").equals(positionName)) return FirstJoint;
  if (String("Second").equals(positionName)) return SecondJoint;
  if (String("Third").equals(positionName)) return ThirdJoint;
  return UnknownJoint;
}

const String JOINT_POSITION_NAME[] = {[FirstJoint] = "First",
                                      [SecondJoint] = "Second",
                                      [ThirdJoint] = "Third",
                                      [UnknownJoint] = "Unknown"};

class ActionPlan {
 public:
  ActionPlan();
  void load(String planJson);
  String legPosition;
  String jointPosition;
  int angle;
};

class LegJoint {
 public:
  LegJoint();
  ~LegJoint();
  void attach(int jointPin, boolean isSub, SubConnector subConn);
  void move(int targetAngle);
  JSONVar getStatus();

 private:
  const int MIN_US = 540;
  const int MAX_US = 2400;
  int pin;
  int angle;
  boolean isSub;
  Servo servo;
  SubConnector conn;
};

class Leg {
 public:
  Leg();
  void init(LegPosition legPos, SubConnector conn);
  void moveJoint(JointPosition jointPos, int angle);
  JSONVar getStatus();

 private:
  LegPosition position;
  LegJoint joints[JOINT_COUNT];
};

class LegManager {
 public:
  LegManager();
  void init();
  void action(ActionPlan plans[], int planCount);
  JSONVar getStatus();

 private:
  SubConnector subConn;
  Leg legs[LEG_COUNT];
  void moveDefaultPose();
};

#endif
