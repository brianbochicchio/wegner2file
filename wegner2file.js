/*
Copyright 2023 by Brian Bochicchio for BE DIGITAL MEDIA LLC

Listens on TCP port 5001 (default) for input TITLE;ARTIST\r\n
from Wegner StorQ2 reciever. Then ouputs a TRE-friendly
with a static cut id, category and duration

Optional: Port argument can be added
USE: node wegner2file.js 8765

*/

//Requires & Default Settings
const fs = require("fs");
const net = require("net");
const port = process.argv[2] || 5001;
const sngData = process.argv[3] || "nowplaying.txt";
let data;

// ****************  Server  ****************

const server = net.createServer((c) => {
  console.log("Client connected");
  c.on("end", () => {
    console.log("Client disconnected");
  });
  c.on("data", function (chunk) {
    createOutputString(chunk.toString());
  });
});

server.on("error", (err) => {
  console.log(`Error: ${err}`);
  throw err;
});

server.listen(port, () => {
  console.log(
    getLogTime() + `: Server Online. Port: ${port}, Output File: ${sngData}`
  );
});

// ****************  Server  ****************

function getLogTime() {
  let logtime = new Date().toISOString();

  return logtime;
}

function createOutputString(data) {
  const regex = new RegExp("\\w*;\\w*");
  data = data.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // strip control characters

  if (regex.test(data)) {
    let input_details = data.split(";");
    let song_info = `^${input_details[0].trim()}~${input_details[1].trim()}~100~SONG~03:30|`;
    writeCaptureToFile(song_info);
  } else {
    console.log(`Invalid Input: ${data}`);
  }
}

// Write output file
function writeCaptureToFile(song_info) {
  fs.writeFile(sngData, song_info, (err) => {
    if (err) console.log(err);
    console.log(getLogTime() + ": " + song_info);
  });
}
