// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(req, res) {
    var urlPath = url.parse(req.url).pathname;
    var filePath = path.join(__dirname, urlPath);
    if (urlPath === '/') {
        filePath = path.join(__dirname, 'index.html');
    }
    console.log('Request for ' + urlPath + ' received.');
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(err, data) {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error!');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        } else {
            res.writeHead(404);
            res.end('Page Not Found!');
        }
    });
});

server.listen(8080);
console.log('Server is running at http:///localhost:8080/');