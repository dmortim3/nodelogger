//Lets require/import the HTTP module
var http = require('http');
var fs = require('fs');

//Lets define a port we want to listen to
const PORT=8081; 

var log = fs.createWriteStream("logs/logfile");
var diagramlog = fs.createWriteStream("logs/diagramlog");

function handleRequest(request, res){
    request.on('data', function(data) {
        var logMessage = getDateTime() + "," + data + "\n";
	    log.write(logMessage);
        var diagramMessage = data + "\n";
        diagramlog.write(diagramMessage);
    });

    res.end('It Lives! ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}