# Sequence diagram - Main Board

```plantuml
@startuml
!include inc/settings.pu

actor User as user
participant WebServer as api
queue "LegAction\nQueue" as leg_action_queue
participant "onReceiveLegAction\n(thread core0)" as on_receive_action
participant "manageLegMovement\n(thread core0)" as manage_leg_movement
participant LegManager as leg_manager
participant Leg as leg
participant LegJoint as leg_joint
participant SubController as sub_controller
actor SubController as sub
actor Servo as servo

== API ==
user -> api : GET:/legs
api -> leg_manager : getStatus
loop Leg
  leg_manager -> leg : getStatus
  loop Joint
    leg -> leg_joint : getStatus
    leg <-- leg_joint : jointStatus : JSON
  end
  leg_manager <-- leg : legStatus : JSON
end
api <-- leg_manager : status : JSON
user <-- api

user -> api : POST:/legs
api ->> leg_action_queue : request body
user <-- api

user -> api : POST:/movement
api ->> leg_action_queue : request body
user <-- api

== on receive leg action loop ==
loop
  on_receive_action -> leg_action_queue : get
  leg_action_queue --> on_receive_action
  alt movement
    on_receive_action ->> manage_leg_movement : [shared mem] action=movement
    ref over manage_leg_movement
      auto movement controll loop
    end ref
  else legs
    on_receive_action ->> manage_leg_movement : [shared mem] action=end
    on_receive_action -> leg_manager : action
    ref over leg_manager
      leg manager action
    end ref
    on_receive_action <-- leg_manager
  end
end

== auto movement controll loop ==
alt movement
  manage_leg_movement -> manage_leg_movement : <font color=red>TODO</font> next action
  manage_leg_movement -> leg_manager : action
  ref over leg_manager
    leg manager action
  end ref
  manage_leg_movement <-- leg_manager
end

== leg manager action ==
loop Leg
  leg_manager -> leg : moveJoint
  loop Joint
    leg -> leg_joint : move(angle)
    alt is SubJoint
      leg_joint -> sub_controller
      sub_controller ->> sub : Serial
      sub -> servo : write
      leg_joint <-- sub_controller
      leg <-- leg_joint
    else
      leg_joint -> servo : write
      leg <-- leg_joint
    end
  end
  leg_manager <-- leg
end

@enduml
```
