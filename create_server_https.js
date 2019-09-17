//openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "chiave_privata.pem" -out "certificato.pem"
 
var express = require('express');
var app = express();
//const path = require('path');
var https = require('https');
var fs = require('fs');

const options = {
  key: fs.readFileSync('chiave_privata.pem'),
  cert: fs.readFileSync('certificato.pem')
};

https.createServer(options, app).listen(8000,'192.168.1.2' || 'localhost',function() {
  console.log('Application worker ' + process.pid + ' started...');
}
);

app.use(express.static('./'));

//app.get('/',function(req,res) {
//  res.sendFile(path.join(__dirname+'/index.html'));
//});