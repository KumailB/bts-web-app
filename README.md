# bts-web-app
A web-based bitcoin transaction system to help traders swiftly buy and sell bitcoin. 

## Quick Start
### Pre-requisties
 - ```node.js```
 - ```npm```
 - ```ts-node```

You can install ts-node using the following command:
```npm i -g ts-node```


### Setting up the server
In-order to run the server locally, you will have to create a file `.env` in `server` subfolder.
After creating the file, add the following fields with your MySQL username and password as well as hostname and port:
 - `SERVER_HOST='localhost'`
 - `SERVER_PORT='3001'`
 - `MYSQL_HOST='localhost'`
 - `MYSQL_PORT='3306'`
 - `MYSQL_USERNAME=''`
 - `MYSQL_PASSWORD=''`
 - `API_KEY = 'eShVmYq3t6w9yB&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+'`

If the server and/or MySQL are being hosted remotely, fill out HOST and PORT fields appropriately

### Running the server
 - `cd server`
 - `npm install`
 - `npm run dev`


### Setting up the client
In-order to run the app locally, you will have to create a file `.env` in `client` subfolder.
After creating the file, add the following hostname and port fields:
 - `CLIENT_HOST='localhost'`
 - `CLIENT_PORT='3000'`
 - `NEXT_PUBLIC_SERVER_HOST='localhost'`
 - `NEXT_PUBLIC_SERVER_PORT='3001'`
 - `NEXT_GRAPHQL_API_KEY = 'eShVmYq3t6w9yB&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+'`

If the client and/or server are being hosted remotely, fill out HOST and PORT fields appropriately


### Running the client
 - `cd client`
 - `npm install`
 - `npm run dev`
