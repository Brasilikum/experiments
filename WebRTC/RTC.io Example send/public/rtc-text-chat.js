// Set RTC options.
var rtcOpts = {
    room: 'test-data',
    signaller: 'http://localhost:3000',
    capture: false
};
// call RTC module
var rtc = RTC(rtcOpts);




function erroo(img) { 
    alert('not found: ' + img.src);
}



// A contenteditable element to show our messages
var messages = document.getElementById('messages');

// Bind to events happening on the data channel
function bindDataChannelEvents(id, channel, attributes, connection) {

    // Receive message
    channel.onmessage = function (evt) {
        messages.innerHTML = evt.data;
    };

    // Send message
    messages.onkeyup = function () {
      var image = document.getElementById('image');
        // create an empty canvas element
      var canvas = document.createElement("canvas"),
          canvasContext = canvas.getContext("2d");


        
        //Set canvas size is same as the picture
        canvas.width = image.width;
        canvas.height = image.height;
     
        // draw image into canvas element
        canvasContext.drawImage(image, 0, 0, image.width, image.height);
     
        // get canvas contents as a data URL (returns png format by default)
        var dataURL = canvas.toDataURL();

        channel.send(dataURL);
        console.log(dataURL);
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