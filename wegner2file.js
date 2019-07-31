/*
Captures data on port 5001 and saves it to a local file
USE: node wegner2file.js

Optional: Port argument can be added
USE: node wegner2file.js 8765

*/

//Requires & Default Settings 
const fs = require("fs");
const net = require('net');
const port = process.argv[2] || 5001;
const sngData = process.argv[3] || 'nowplaying.txt';
let data;


// ****************  Server  ****************

const server = net.createServer((c) => {
    console.log('Client connected');
    c.on('end', () => {
        console.log('Client disconnected');
    });
    c.on('data', function (chunk) {
        writeCaptureToFile(chunk.toString());
    });
});

server.on('error', (err) => {
    console.log(`Error: ${err}`);
    throw err;
});

server.listen(port, () => {
    console.log(getLogTime() + `: Server Online. Port: ${port}, Output File: ${sngData}`);

});

// ****************  Server  ****************


function getLogTime() {
    let logtime = new Date().toISOString();

    return logtime;
}

// Write output file
function writeCaptureToFile(data) {
    fs.writeFile(sngData, data, (err) => {
        if (err) console.log(err);
        console.log(getLogTime() + ": " + data);
    });
}
