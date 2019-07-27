# wegner2file
Ingests song metadata from a satellite receiver via tcp and dumps it to a file for TRE's ASCII File input to parse.

## Requirements
Node.JS - https://nodejs.org/en/   -- Tested with 10.16.0 LTS

TRE is a Windows application that manages broadcast audio metadata.

An app to connect to and send data to the server. For Windows, 
Hercules by HW-Group is free and fantastic https://www.hw-group.com/software/hercules-setup-utility




## Testing


### Testing on Windows
Open a terminal session in the folder with wegner2file.js
Start it with node wegner2file.js

Connect with Hercules TCP Client or another terminal app. 

Once connected you can send the test string:  ^title~artist~1234~SONG~03:00|


### Testing on Mac

Open a terminal session in the folder with wegner2file.js
Start it with node wegner2file.js

Open another terminal and connect with nc -v 127.0.0.1 5001

Once connected you can send the test string:  ^title~artist~1234~SONG~03:00|





