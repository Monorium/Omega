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

    var errorCallback = function (message) {
      alert('Error: ' + message);
    };

    // request permission first
    serial.requestPermission(function (successMessage) {
      // open serial port 
      serial.open({ baudRate: 115200 }, function (successMessage) {
        open = true;
        // register the read callback 
        serial.registerReadCallback(function success(data) {
          // decode the received message 
          var view = new Uint8Array(data);
          if (view.length >= 1) {
            for (var i = 0; i < view.length; i++) {
              // if we received a \n, the message is complete, display it 
              if (view[i] == 13) {
                // display the message 
                var value = parseInt(str);
                recv.textContent = value;
                str = '';
              } else {
                // if not, concatenate with the begening of the message 
                var temp_str = String.fromCharCode(view[i]);
                var str_esc = escape(temp_str);
                str += unescape(str_esc);
              }
            }
          }
        }, errorCallback);
      }, errorCallback);
    }, errorCallback);

    var send = document.getElementById('send');
    send.onclick = function () {
      if (open) {
        var data = '';
        var speed = toHexFromInt(parseInt(document.getElementById('speed').value));
        data
          = 'FF0201' + toHexFromInt(parseInt(document.getElementById('range.s1').value)) + speed
          + 'FF0202' + toHexFromInt(parseInt(document.getElementById('range.s2').value)) + speed
          + 'FF0203' + toHexFromInt(parseInt(document.getElementById('range.s3').value)) + speed
          + 'FF0204' + toHexFromInt(parseInt(document.getElementById('range.s4').value)) + speed
          + 'FF0205' + toHexFromInt(parseInt(document.getElementById('range.s5').value)) + speed
          + 'FF0206' + toHexFromInt(parseInt(document.getElementById('range.s6').value)) + speed
          + 'FF0207' + toHexFromInt(parseInt(document.getElementById('range.s7').value)) + speed
          + 'FF0208' + toHexFromInt(parseInt(document.getElementById('range.s8').value)) + speed
          + 'FF0209' + toHexFromInt(parseInt(document.getElementById('range.s9').value)) + speed
          + 'FF020A' + toHexFromInt(parseInt(document.getElementById('range.s10').value)) + speed
          + 'FF020B' + toHexFromInt(parseInt(document.getElementById('range.s11').value)) + speed
          + 'FF020C' + toHexFromInt(parseInt(document.getElementById('range.s12').value)) + speed
          + 'FF020D' + toHexFromInt(parseInt(document.getElementById('range.s13').value)) + speed
          + 'FF020E' + toHexFromInt(parseInt(document.getElementById('range.s14').value)) + speed
          + 'FF020F' + toHexFromInt(parseInt(document.getElementById('range.s15').value)) + speed
          + 'FF0210' + toHexFromInt(parseInt(document.getElementById('range.s16').value)) + speed
          + 'FF0211' + toHexFromInt(parseInt(document.getElementById('range.s17').value)) + speed
          + 'FF0212' + toHexFromInt(parseInt(document.getElementById('range.s18').value)) + speed;
        console.log(data);
        mylog(data);
        serial.writeHex(data, function (success) {
          mylog(success);
        }, function (error) {
          mylog(error);
        });
      }
    };

    var forward = document.getElementById('forward');
    forward.onclick = function () {
      if (open) {
        var data = '';
        var speed = toHexFromInt(parseInt(document.getElementById('speed').value));
        data = 'FF0101' + speed;
        console.log(data);
        mylog(data);
        serial.writeHex(data, function (success) {
          mylog(success);
        }, function (error) {
          mylog(error);
        });
      }
    };
  },

  onPause: function () {
    serial.close(function () {
      console.log('close');
      open = false;
    }, errorCallback);
  },

  onResume: function () {
    serial.requestPermission(
      // if user grants permission 
      function (successMessage) {
        // open serial port 
        serial.open(
          { baudRate: 115200 },
          // if port is succesfuly opened 
          function (successMessage) {
            open = true;
          },
          // error opening the port 
          errorCallback
        );
      },
      // user does not grant permission 
      errorCallback
    );
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
