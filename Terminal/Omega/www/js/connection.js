class WebSocketConnection {

  constructor() {
    this.connected = false;
    this.sock = new WebSocket("ws://192.168.3.201/omega");
    this.sock.addEventListener("open", this.onOpen.bind(this));
    this.sock.addEventListener("close", this.onClose.bind(this));
    this.sock.addEventListener("error", this.onError.bind(this));
    this.sock.addEventListener("message", this.onMessage.bind(this));
  }

  // { "id": X, "angle": XX }
  static createServoObject(servoId, angle) {
    let obj = new Object();
    obj.id = servoId;
    obj.angle = angle;
    return obj;
  }

  // 接続イベント
  onOpen() {
    console.log("Socket open");
    this.connected = true;
    console.log("connected:" + this.connected);
  }

  // 切断イベント
  onClose() {
    console.log("Socket close");
    this.connected = false;
  }

  // エラーイベント
  onError(event) {
    console.log("エラーが発生しました。");
    this.sock.close();
  }

  // メッセージ受信イベント
  onMessage(event) {
    if (event && event.data) {
      console.log(event.data);
    } else {
      console.log("eventが空。");
    }
  }

  // ヘルスチェック送信タイマー処理
  sendPing() {
    console.log("Send ping");
    console.log("connected:" + this.connected);
    if (this.connected) this.sock.send("ping");
  }

  // 個別制御電文送信
  sendManualControl(speed, servoList) {
    console.log("Send manual control");
    console.log("connected:" + this.connected);
    // if (this.connected) {
      let data = new Object();
      data.action = "manual";
      data.speed = speed;
      data.servo = servoList;
      let jsonText = JSON.stringify(data);
      this.sock.send(jsonText);
      console.log("Sent !");
    // }
  }
}
