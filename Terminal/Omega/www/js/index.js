var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('resume', this.onResume.bind(this), false);
  },

  onDeviceReady: function () {
    var recv = document.getElementById('recv_data');
    var open = false;
    var str = '';

    var sock = new WebSocket("ws://192.168.3.201/omega");
    // sock.onopen = onOpen;
    // sock.onmessage = onMessage;
    // sock.onclose = onClose;
    // sock.onerror = onError;

    // document.querySelector("#btnSendPing").onclick = function () {
    //   if (sock == null) {
    //     return;
    //   }
    //   sock.send("ping");
    // };

    var send = document.getElementById('send');
    send.onclick = function () {
      var manualData = new Object();
      manualData.action = "manual";
      manualData.speed = parseInt(document.getElementById('speed').value);
      manualData.servo = new Array();

      var servo1 = new Object();
      servo1.id = 1;
      servo1.angle = parseInt(document.getElementById('range.s1').value);
      var servo2 = new Object();
      servo2.id = 2;
      servo2.angle = parseInt(document.getElementById('range.s2').value);

      manualData.servo[0] = servo1;
      manualData.servo[1] = servo2;

      var memberfilter = new Array();
      memberfilter[0] = "action";
      memberfilter[1] = "speed";
      memberfilter[2] = "servo";

      var jsonText = JSON.stringify(manualData, memberfilter);
      sock.send(jsonText);

      // if (open) {
      //   var data = '';
      //   var speed = toHexFromInt(parseInt(document.getElementById('speed').value));
      //   data
      //     = 'FF0201' + toHexFromInt(parseInt(document.getElementById('range.s1').value)) + speed
      //     + 'FF0202' + toHexFromInt(parseInt(document.getElementById('range.s2').value)) + speed
      //     + 'FF0203' + toHexFromInt(parseInt(document.getElementById('range.s3').value)) + speed
      //     + 'FF0204' + toHexFromInt(parseInt(document.getElementById('range.s4').value)) + speed
      //     + 'FF0205' + toHexFromInt(parseInt(document.getElementById('range.s5').value)) + speed
      //     + 'FF0206' + toHexFromInt(parseInt(document.getElementById('range.s6').value)) + speed
      //     + 'FF0207' + toHexFromInt(parseInt(document.getElementById('range.s7').value)) + speed
      //     + 'FF0208' + toHexFromInt(parseInt(document.getElementById('range.s8').value)) + speed
      //     + 'FF0209' + toHexFromInt(parseInt(document.getElementById('range.s9').value)) + speed
      //     + 'FF020A' + toHexFromInt(parseInt(document.getElementById('range.s10').value)) + speed
      //     + 'FF020B' + toHexFromInt(parseInt(document.getElementById('range.s11').value)) + speed
      //     + 'FF020C' + toHexFromInt(parseInt(document.getElementById('range.s12').value)) + speed
      //     + 'FF020D' + toHexFromInt(parseInt(document.getElementById('range.s13').value)) + speed
      //     + 'FF020E' + toHexFromInt(parseInt(document.getElementById('range.s14').value)) + speed
      //     + 'FF020F' + toHexFromInt(parseInt(document.getElementById('range.s15').value)) + speed
      //     + 'FF0210' + toHexFromInt(parseInt(document.getElementById('range.s16').value)) + speed
      //     + 'FF0211' + toHexFromInt(parseInt(document.getElementById('range.s17').value)) + speed
      //     + 'FF0212' + toHexFromInt(parseInt(document.getElementById('range.s18').value)) + speed;
        console.log(jsonText);
        mylog(jsonText);
    };

    var forward = document.getElementById('forward');
    forward.onclick = function () {
      // if (open) {
      //   var data = '';
      //   var speed = toHexFromInt(parseInt(document.getElementById('speed').value));
      //   data = 'FF0101' + speed;
      //   console.log(data);
      //   mylog(data);
      //   serial.writeHex(data, function (success) {
      //     mylog(success);
      //   }, function (error) {
      //     mylog(error);
      //   });
      // }
    };
  },

  onPause: function () {
  },

  onResume: function () {
  },

  // Update DOM on a Received Event
  // receivedEvent: function(id) {
  //     var parentElement = document.getElementById(id);
  //     var listeningElement = parentElement.querySelector('.listening');
  //     var receivedElement = parentElement.querySelector('.received');

  //     listeningElement.setAttribute('style', 'display:none;');
  //     receivedElement.setAttribute('style', 'display:block;');

  //     console.log('Received Event: ' + id);
  // }
};

function mylog(message = "") {
  var log_area = document.getElementById('log_area');
  log_area.value += message + "\n";
}

function toHexFromInt(i = 0) {
  return ('0' + i.toString(16).toUpperCase()).substr(-2);
}

app.initialize();
