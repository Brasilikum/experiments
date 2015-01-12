var express = require('express');
var app = express();
var exported = false;

app.get('/users', function users (req, res) {
  res.send('/users');
});

app.use(function errorHandler (req, res) {
  res.send('No such route in api');
});


if(exported){
  console.log('exported');
}else{
  console.log('stand alone');
  //app.listen(3000);
}

module.exports = function(){
  console.log('exported');
  exported = true;
  return app;
}