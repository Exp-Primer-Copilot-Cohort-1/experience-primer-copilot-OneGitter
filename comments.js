// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var https = require('https');
var http = require('http');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', function (err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.post('/comments', function (req, res) {
  fs.readFile(__dirname + '/comments.json', function (err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function (err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

var httpServer = http.createServer(app);
httpServer.listen(80);
console.log('Server is running on https://localhost:443/ and http://localhost:80/');