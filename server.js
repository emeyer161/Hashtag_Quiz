var express = require('express');
var babelify = require('express-babelify-middleware');
var http = require('http');

var app = express();

app.use('/app.js', babelify('assets/js/app.js', { cache: false })); //MAGIC LINE
app.use(express.static('client'));

app.get('/', function (req, res) {
    res.sendfile('views/index.html');
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});