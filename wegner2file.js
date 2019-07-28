/*
Captures data on port 5001 and saves it to a local file
USE: node wegner2file.js

Optional: Port argument can be added
USE: node wegner2file.js 8765

*/

//Requires & Default Settings 
const fs = require("fs");
const net = require('net');
let port = 5001;
const sngData = 'nowplaying.txt';
let data;

if (process.argv[2]) {
    port = process.argv[2];
} else {
    console.log("Using default port")
}


// ****************  Server  ****************

const server = net.createServer((c) => {
      console.log('Client connected');
    c.on('end', () => {
        console.log('Client disconnected');
    });

    c.on('data', function(chunk) {
        writeCaptureToFile(chunk.toString());
    });

    c.write('Hello World\r\n');

});

server.on('error', (err) => {
    console.log('Error: ${err}');
    throw err;
});

server.listen(port, () => {
    console.log(`Server Online: ${port}`);
});

// ****************  Server  ****************


//Returns current time for use with logging
function getLogTime(){   
    let today = new Date();
    let hour = (today.getHours() < 10) ? '0' + today.getHours() : today.getHours();
    let minutes = (today.getMinutes() < 10) ? '0' + today.getMinutes() : today.getMinutes();
    let seconds = (today.getSeconds() < 10) ? '0' + today.getSeconds() : today.getSeconds();
    var logtime = hour + ':' + minutes + ':' + seconds;

    return logtime; 
}

// Write output file
function writeCaptureToFile(data){
    fs.writeFile(sngData, data, (err) => {
    if (err) console.log(err);
    console.log(getLogTime() + ":" + data);
    });
}
