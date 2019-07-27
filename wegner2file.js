/*
Listens for connections on port 5001.
Captures the data and saves it to a local file for TRE to read. 
*/

//Requires & Default Settings 
var fs = require("fs");
const Net = require('net');
const port = 5001;
const errLog = 'errorlog.txt';
const sngData = 'nowplaying.txt';

var data;

// ****************  Server  ****************
// need to add attribution for the starter code
// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
const server = new Net.Server();

server.listen(port, function() {
    console.log(`Listening on localhost:${port}`);
    console.log("Press CTRL+C to stop server");
});

server.on('connection', function(socket) {
    console.log('Client Connected');
    socket.write('Hello, client.\n');

    socket.on('data', function(chunk) {
        writeCaptureToFile(chunk.toString());
        //console.log(`Data received from client: ${chunk.toString()}`);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log('Error: ${err}');
    });
});

// ****************  Server  ****************



//Returns local time for console and error log
function getLogTime(){   
    var today = new Date();
    //need to add leading zero
    var logtime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return logtime; 
}



function writeCaptureToFile(data){
    fs.writeFile(sngData, data, (err) => {
    if (err) console.log(err);
    console.log(getLogTime() + ":" + data);
    });
}
