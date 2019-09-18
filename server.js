//openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout "chiave_privata.pem" -out "certificato.pem"
 
var express = require('express');
var app = express();
const path = require('path');
var https = require('https');
var fs = require('fs');

const options = {
  key: fs.readFileSync('chiave_privata.pem'),
  cert: fs.readFileSync('certificato.pem')
};

//app.get('/', function(req, res) {
//  res.sendFile(path.join(__dirname, 'index.html'));
//});

app.use(express.static('./'));

https.createServer(options, app).listen(process.env.PORT || 4000, function(){
  console.log('Your node js server is running');
}
);