var PushBullet = require('pushbullet');
var Q = require('q');
var pusher = new PushBullet('WPqoEtdmUyD6ViJD3uqc7WfQXpnVhTiC');

fetchDevices()
  .then(findDevice)
  .then(sendNote)
  .then(console.log)
  .fail(console.error);

function fetchDevices(){
  var prFetched = Q.defer();
  pusher.devices(function(err, res){
    if(err) prFetched.reject();
    prFetched.resolve(res.devices);
  });
  return prFetched.promise;
}

function findDevice (devices) {
  var prFound = Q.defer();
  devices.forEach(function (device){
    if(device.nickname === 'Chrome Ubuntu Lad'){
      prFound.resolve(device, 'buh');
    }
  });
  prFound.reject();
  return prFound.promise;
}

function sendNote (device) {
  var prSent = Q.defer();
  pusher.note(device.iden, 'Hallo', 'Ja, es funktioniert ', function(err, res){
    if (err) prSent.reject(err);
    prSent.resolve(res);
  });
  return prSent.promise;
}