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
    ons.notification.toast('Web socket is connected', { timeout: 2000, animation: 'fall' });
  }

  // 切断イベント
  onClose() {
    console.log("Socket close");
    this.connected = false;
    ons.notification.toast('Web socket is closed', { timeout: 2000, animation: 'fall' });
  }

  // エラーイベント
  onError(event) {
    console.log("エラーが発生しました");
    this.sock.close();
    ons.notification.toast('Web socket error is ' + event.data, { timeout: 2000, animation: 'fall' });
  }

  // メッセージ受信イベント
  onMessage(event) {
    if (event && event.data) {
      console.log(event.data);
      // ons.notification.toast('Web socket recv is ' + event.data, { timeout: 1000, animation: 'fall' });
    } else {
      console.log("eventが空");
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

  // ソケットクローズ
  closeSocket() {
    console.log("Close");
    this.sock.close();
  }
}
