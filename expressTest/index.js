var express = require('express');
var app = express();
var api = require('./api')();
var exported = false;

app.get('/main', function users (req, res) {
  res.send('/main');
});

app.use('/api', api);

app.use(function errorHandler (req, res) {
  res.send('No such route');
});


if(exported){
  console.log('exported');
}else{
  console.log('stand alone');
  app.listen(3000);
}

module.exports = function(){
  console.log('exported');
  exported = true;
}