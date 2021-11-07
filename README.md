# bts-web-app
A web-based bitcoin transaction system to help traders swiftly buy and sell bitcoin. 

## Quick Start

### Setting up the environment
In-order to run the server locally, you will have to create a file `.env` in `server` subfolder.
After creating the file, add the following fields with your MySQL username and password as well as hostname and port:
 - `MYSQL_HOST='localhost'`
 - `MYSQL_PORT='3306'`
 - `MYSQL_USERNAME=''`
 - `MYSQL_PASSWORD=''`

### Running the server
 - `cd server`
 - `npm install`
 - `npm run dev`
