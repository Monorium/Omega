let sock;

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('resume', this.onResume.bind(this), false);
  },

  onDeviceReady: function () {
    sock = new WebSocketConnection();
  },

  onPause: function () {
  },

  onResume: function () {
  },

};

app.initialize();

let healthTimer = setInterval(sendPing, 3000);
function sendPing() {
  sock.sendPing();
}

document.getElementById('send').onclick = function () {
  servoList = new Array();
  servoList[0] = WebSocketConnection.createServoObject(1, parseInt(document.getElementById('range.s1').value));
  servoList[1] = WebSocketConnection.createServoObject(2, parseInt(document.getElementById('range.s2').value));
  servoList[2] = WebSocketConnection.createServoObject(3, parseInt(document.getElementById('range.s3').value));
  servoList[3] = WebSocketConnection.createServoObject(4, parseInt(document.getElementById('range.s4').value));
  servoList[4] = WebSocketConnection.createServoObject(5, parseInt(document.getElementById('range.s5').value));
  servoList[5] = WebSocketConnection.createServoObject(6, parseInt(document.getElementById('range.s6').value));
  servoList[6] = WebSocketConnection.createServoObject(7, parseInt(document.getElementById('range.s7').value));
  servoList[7] = WebSocketConnection.createServoObject(8, parseInt(document.getElementById('range.s8').value));
  servoList[8] = WebSocketConnection.createServoObject(9, parseInt(document.getElementById('range.s9').value));
  servoList[9] = WebSocketConnection.createServoObject(10, parseInt(document.getElementById('range.s10').value));
  servoList[10] = WebSocketConnection.createServoObject(11, parseInt(document.getElementById('range.s11').value));
  servoList[11] = WebSocketConnection.createServoObject(12, parseInt(document.getElementById('range.s12').value));
  servoList[12] = WebSocketConnection.createServoObject(13, parseInt(document.getElementById('range.s13').value));
  servoList[13] = WebSocketConnection.createServoObject(14, parseInt(document.getElementById('range.s14').value));
  servoList[14] = WebSocketConnection.createServoObject(15, parseInt(document.getElementById('range.s15').value));
  servoList[15] = WebSocketConnection.createServoObject(16, parseInt(document.getElementById('range.s16').value));
  servoList[16] = WebSocketConnection.createServoObject(17, parseInt(document.getElementById('range.s17').value));
  servoList[17] = WebSocketConnection.createServoObject(18, parseInt(document.getElementById('range.s18').value));
  sock.sendManualControl(parseInt(document.getElementById('range.speed').value), servoList);
};

function changeRange(rangeObj) {
  console.log("change :" + rangeObj.name + ":" + rangeObj.value);
  servoList = new Array();
  if (rangeObj.name == "s1")
    servoList[0] = WebSocketConnection.createServoObject(1, parseInt(document.getElementById('range.s1').value));
  else if (rangeObj.name == "s2")
    servoList[0] = WebSocketConnection.createServoObject(2, parseInt(document.getElementById('range.s2').value));
  else if (rangeObj.name == "s3")
    servoList[0] = WebSocketConnection.createServoObject(3, parseInt(document.getElementById('range.s3').value));
  else if (rangeObj.name == "s4")
    servoList[0] = WebSocketConnection.createServoObject(4, parseInt(document.getElementById('range.s4').value));
  else if (rangeObj.name == "s5")
    servoList[0] = WebSocketConnection.createServoObject(5, parseInt(document.getElementById('range.s5').value));
  else if (rangeObj.name == "s6")
    servoList[0] = WebSocketConnection.createServoObject(6, parseInt(document.getElementById('range.s6').value));
  else if (rangeObj.name == "s7")
    servoList[0] = WebSocketConnection.createServoObject(7, parseInt(document.getElementById('range.s7').value));
  else if (rangeObj.name == "s8")
    servoList[0] = WebSocketConnection.createServoObject(8, parseInt(document.getElementById('range.s8').value));
  else if (rangeObj.name == "s9")
    servoList[0] = WebSocketConnection.createServoObject(9, parseInt(document.getElementById('range.s9').value));
  else if (rangeObj.name == "s10")
    servoList[0] = WebSocketConnection.createServoObject(10, parseInt(document.getElementById('range.s10').value));
  else if (rangeObj.name == "s11")
    servoList[0] = WebSocketConnection.createServoObject(11, parseInt(document.getElementById('range.s11').value));
  else if (rangeObj.name == "s12")
    servoList[0] = WebSocketConnection.createServoObject(12, parseInt(document.getElementById('range.s12').value));
  else if (rangeObj.name == "s13")
    servoList[0] = WebSocketConnection.createServoObject(13, parseInt(document.getElementById('range.s13').value));
  else if (rangeObj.name == "s14")
    servoList[0] = WebSocketConnection.createServoObject(14, parseInt(document.getElementById('range.s14').value));
  else if (rangeObj.name == "s15")
    servoList[0] = WebSocketConnection.createServoObject(15, parseInt(document.getElementById('range.s15').value));
  else if (rangeObj.name == "s16")
    servoList[0] = WebSocketConnection.createServoObject(16, parseInt(document.getElementById('range.s16').value));
  else if (rangeObj.name == "s17")
    servoList[0] = WebSocketConnection.createServoObject(17, parseInt(document.getElementById('range.s17').value));
  else if (rangeObj.name == "s18")
    servoList[0] = WebSocketConnection.createServoObject(18, parseInt(document.getElementById('range.s18').value));

  sock.sendManualControl(parseInt(document.getElementById('range.speed.mainte').value), servoList);
}
