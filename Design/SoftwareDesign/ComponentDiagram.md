# Component diagram

```plantuml
@startuml
!include inc/settings.pu

node "Main Board\n{hardware = WROOM-ESP-32}" as MainBoard {
  component "Web Server" as WebServer
  interface "HTTP" as HTTP
  HTTP - WebServer

  component "Leg Manager" as LegManager
  interface "Queue" as Queue
  Queue - LegManager

  component "Servo Controller" as ServoControllerE
  interface "Queue" as ServoQueue
  ServoQueue - ServoControllerE

  WebServer .> Queue
  LegManager .> ServoQueue
  WebServer -[hidden]- Queue
}

node "Servo Controller Board\n{hardware = Arduino Due}" as SubBoard {
  component "Communication" as Comm
  interface "Serial" as SerialA
  SerialA - Comm

  component "Servo Controller" as ServoControllerA
  Comm .> ServoControllerA
}

node "Controller\n{OS = Android}" as Controller {
  component "Controller App" as ControllerApp
  interface "Application GUI" as AppGui
  AppGui - ControllerApp
  note left of AppGui : for User
}

rectangle {
  node "Servo_1~10" as Servo_1
  node "Servo_11~18" as Servo_11
}

node "Battery\n{type = Le-Fe, capacity = 6.6v}" as Battery

Controller -- MainBoard : tcp/ip
MainBoard -- SubBoard : Serial
SubBoard --- Servo_1 : Line x 10
MainBoard --- Servo_11 : Line x 8
Battery -- SubBoard  : Line
Battery -- MainBoard : Line

ControllerApp ..> HTTP : HTTP
LegManager ..> SerialA : UART\n{baudrate=115200}
ServoControllerA ..> Servo_1
ServoControllerE ..> Servo_11

@enduml
```
