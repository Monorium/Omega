var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('resume', this.onResume.bind(this), false);
  },

  onDeviceReady: function () {
    var str = '';
    var sock = new WebSocketConnection();

    var send = document.getElementById('send');
    send.onclick = function () {
      servoList = new Array();
      servoList[0] = WebSocketConnection.createServoObject(1, parseInt(document.getElementById('range.s1').value));
      servoList[1] = WebSocketConnection.createServoObject(2, parseInt(document.getElementById('range.s2').value));
      sock.sendManualControl(parseInt(document.getElementById('range.speed').value), servoList);
    };
  },

  onPause: function () {
  },

  onResume: function () {
  },

};

app.initialize();
