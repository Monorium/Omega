# Class diagram - Main Board

```plantuml
@startuml
!include inc/settings.pu

package LegManager {
  class LegManager {
    subConn : SubConnector
    legs : Leg[]
    init()
    action(ActionPlan[], planCount)
    getStatus() : JSON
  }

  class Leg {
    position : LegPosition
    joints : LegJoint[]
    init(LegPosition, SubConnector)
    moveJoint(JointPosition, angle)
    getStatus() : JSON
  }

  class LegJoint {
    pin : int
    angle : int
    isSub : boolean
    servo : Servo
    conn : SubConnector
    attach(jointPin, isSub, SubConnector)
    move(targetAngle)
    getStatus() : JSON
  }

  class ActionPlan {
    legPosition : String
    jointPosition : String
    angle : int
  }

  class SubConnector {
    connect()
    send(pin, angle)
  }

  enum LegPosition {
    ForeLeftLeg
    MiddleLeftLeg
    BackLeftLeg
    ForeRightLeg
    MiddleRightLeg
    BackRightLeg
  }

  enum JointPosition {
    FirstJoint
    SecondJoint
    ThirdJoint
  }

  LegManager "1" *-- "6" Leg
  LegManager -- SubConnector
  Leg "1" *-- "3" LegJoint
  Leg - LegPosition
  LegJoint - JointPosition

  note right of LegManager::getStatus
    [
      {
        "position": "ForeLeft",
        "joints": [
          {
            "position": "First",
            "is_sub": true,
            "pin": 13,
            "angle": 90
          },
          ...
        ]
      },
      ...
    ]
  end note
}

note as Configure
  Configure.h
  WIFI_SSID : char*
  WIFI_PASSWORD : char*
  LEG_PINS : int[][]
  IS_SUB_LEG : boolean[][]
end note

@enduml
```
