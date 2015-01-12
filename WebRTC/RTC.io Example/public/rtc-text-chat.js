// Set RTC options.
var rtcOpts = {
    room: 'test-data',
    signaller: 'http://localhost:3000',
    capture: false
};

// call RTC module
var rtc = RTC(rtcOpts);

// A contenteditable element to show our messages
var messages = document.getElementById('messages');

// Bind to events happening on the data channel
function bindDataChannelEvents(id, channel, attributes, connection) {

    // Receive message
    channel.onmessage = function (evt) {
        var myCanvas = document.getElementById('my_canvas_id');
        var ctx = myCanvas.getContext('2d');
        var img = new Image;
        img.onload = function(){
          myCanvas.width = img.width;
          myCanvas.height = img.height;
          ctx.drawImage(img,0,0); // Or at whatever offset you like
        };
        img.src = evt.data;
    };

    // Send message
    messages.onkeyup = function () {
        channel.send(this.innerHTML);
    };
}

// Start working with the established session
function init(session) {
    session.createDataChannel('chat', {
          ordered: true,
          maxRetransmits: 12
     });
      session.on('channel:opened:chat', bindDataChannelEvents);
}

// Detect when RTC has established a session
rtc.on('ready', init);