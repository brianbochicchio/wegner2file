# wegner2file
Ingests song metadata from a satellite receiver via tcp and dumps it to a file for TRE's ASCII File input to parse.

## Requirements
Node.JS - https://nodejs.org/en/   -- Created with 10.16.0 LTS and Last tested v12.15.0 LTS

TRE is a Windows application that manages broadcast audio metadata.

An app to connect to and send data to the server. For Windows, 
Hercules by HW-Group is free and fantastic https://www.hw-group.com/software/hercules-setup-utility

### Usage and Args
***Start Server***

node wegner2file.js

***Start Server with Custom Port***

node wegner2file.js 8765


***Add to Windows Start Up***
Add the included batch file to Windows startup if you want wegner2file to launch on Windows startup. 


## Testing
Default port is 5001

### Testing on Windows

* Open a terminal session in the folder with wegner2file.js
    * Start it with node wegner2file.js
    * Connect with Hercules TCP Client or another terminal app. 
    * Once connected you can send the test string: `` ^title~artist~1234~SONG~03:00| ``


### Testing on Mac

* Open a terminal session in the folder with wegner2file.js
    * Start it with node wegner2file.js
    * Open another terminal and connect with nc -v 127.0.0.1 {portnumber}
    * Once connected you can send the test string: `` ^title~artist~1234~SONG~03:00|``


### Thank you
Thank you to the Node.js team for the awesome product and riptutorial.com for the simple TCP server tutorial that got me kick started.    





