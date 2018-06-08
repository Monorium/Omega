class WebSocketConnection {
  constructor() {
    this._timer = null;
    this._connected = false;
    this._sock = new WebSocket("ws://192.168.3.201/omega");
    this._sock.onopen = this.onOpen;
    this._sock.onclose = this.onClose;
    this._sock.onmessage = this.onMessage;
    this._sock.onerror = this.onError;
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
    this._connected = true;
    this._timer = setInterval(this.healthCheckTimer, 3000);
  }

  // メッセージ受信イベント
  onMessage(event) {
    if (event && event.data) {
      console.log(event.data);
    } else {
      console.log("eventが空。");
    }
  }

  // 切断イベント
  onClose() {
    console.log("Socket close");
  }

  // エラーイベント
  onError(event) {
    console.log("エラーが発生しました。");
  }

  // ヘルスチェック送信タイマー処理
  healthCheckTimer() {
    console.log("Do health check");
    if (this._connected) this._sock.send("ping");
  }

  // 個別制御電文送信
  sendManualControl(speed, servoList) {
    console.log("Send manual control:" + this._connected);
    // if (this._connected) {
      let data = new Object();
      data.action = "manual";
      data.speed = speed;
      data.servo = servoList;
      let jsonText = JSON.stringify(data);
      this._sock.send(jsonText);
      console.log("Sent !");
    // }
  }
}
