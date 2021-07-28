#include <Arduino_JSON.h>
#include <ESP32Logger.h>
#include <ESP32Servo.h>

#include "Configure.h"
#include "LegManager.h"
#include "SubConnector.h"

// ActionPlan
ActionPlan::ActionPlan() {}
void ActionPlan::load(String planJson) {}

// LegJoint
LegJoint::LegJoint() {}
LegJoint::~LegJoint() { servo.detach(); }
void LegJoint::attach(int jointPin, boolean isSubConn, SubConnector subConn) {
  pin = jointPin;
  isSub = isSubConn;
  if (isSubConn) {
    conn = subConn;
  } else {
    servo.setPeriodHertz(50);
    servo.attach(pin, MIN_US, MAX_US);
  }
}
void LegJoint::move(int targetAngle) {
  angle = targetAngle;
  if (isSub) {
    DBGLOG(Debug, F("SubJoint(%d):%d"), pin, angle);
    conn.send(pin, angle);
  } else {
    DBGLOG(Debug, F("LegJoint(%d):%d"), pin, angle);
    servo.write(angle);
  }
}
JSONVar LegJoint::getStatus() {
  JSONVar status;
  status["is_sub"] = isSub;
  status["pin"] = pin;
  status["angle"] = angle;
  return status;
}

// Leg
Leg::Leg() {}
void Leg::init(LegPosition legPos, SubConnector conn) {
  position = legPos;
  for (JointPosition jointPos : {FirstJoint, SecondJoint, ThirdJoint}) {
    DBGLOG(Debug, F("leg:%d,joint:%d,pin:%d(%d)"),
           position, jointPos, LEG_PINS[position][jointPos], IS_SUB_LEG[position][jointPos]);
    joints[jointPos].attach(
        LEG_PINS[position][jointPos],
        IS_SUB_LEG[position][jointPos],
        conn);
  }
}
void Leg::moveJoint(JointPosition jointPos, int angle) {
  joints[jointPos].move(angle);
}
JSONVar Leg::getStatus() {
  JSONVar status;
  JSONVar joint_status;
  status["position"] = LEG_POSITION_NAME[position];

  int joint_index = 0;
  for (JointPosition jointPos : {FirstJoint, SecondJoint, ThirdJoint}) {
    JSONVar joint = joints[jointPos].getStatus();
    joint["position"] = JOINT_POSITION_NAME[jointPos];
    joint_status[joint_index] = joint;
    joint_index++;
  }
  status["joints"] = joint_status;

  return status;
}

// LegManager
LegManager::LegManager() {}
void LegManager::init() {
  subConn.connect();
  for (LegPosition position : {ForeLeftLeg, MiddleLeftLeg, BackLeftLeg,
                               ForeRightLeg, MiddleRightLeg, BackRightLeg}) {
    legs[position].init(position, subConn);
  }
}
void LegManager::action(ActionPlan plans[], int planCount) {
  for (int planNo = 0; planNo < planCount; planNo++) {
    DBGLOG(Debug, F("leg:%s(%d),joint:%s(%d),angle:%d"),
           plans[planNo].legPosition, toLegPosition(plans[planNo].legPosition),
           plans[planNo].jointPosition, toJointPosition(plans[planNo].jointPosition),
           plans[planNo].angle);
    legs[toLegPosition(plans[planNo].legPosition)].moveJoint(
        toJointPosition(plans[planNo].jointPosition),
        plans[planNo].angle);
  }
}
void LegManager::moveDefaultPose() {
  ActionPlan plans[LEG_COUNT * JOINT_COUNT];
  int planIndex = 0;
  for (LegPosition legPos : {ForeLeftLeg, MiddleLeftLeg, BackLeftLeg,
                             ForeRightLeg, MiddleRightLeg, BackRightLeg}) {
    for (JointPosition jointPos : {FirstJoint, SecondJoint, ThirdJoint}) {
      plans[planIndex].legPosition = LEG_POSITION_NAME[legPos];
      plans[planIndex].jointPosition = JOINT_POSITION_NAME[jointPos];
      plans[planIndex].angle = DEFAULT_POSE_ANGLES[legPos][jointPos];
      planIndex += 1;
    }
  }
  action(plans, LEG_COUNT * JOINT_COUNT);
}
JSONVar LegManager::getStatus() {
  JSONVar status;

  int leg_index = 0;
  for (LegPosition position : {ForeLeftLeg, MiddleLeftLeg, BackLeftLeg,
                               ForeRightLeg, MiddleRightLeg, BackRightLeg}) {
    JSONVar leg_status = legs[position].getStatus();
    status[leg_index] = leg_status;
    leg_index++;
  }

  DBGLOG(Debug, JSON.stringify(status));
  return status;
}
