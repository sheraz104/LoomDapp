# LoomDapp

## Run Loom DappChain
Run the following commands in the root folder of project
```
./loom init
```
```
./loom run
```

## Deploy contracts on Loom DappChain
Run the following command in the root folder of project
```
truffle migrate --network loom_dapp_chain
```

## Start the Node.js server
```
node server.js
```
The server starts on port ``3000``


## The following Endpoints exist on the server 
  - `GET` /generateAddress
  - `POST` /createItem/:toAddress  (`privateKey` in the body)
  - `GET` /tokenCount
  - `GET` /tokensByAddress/:address
  - `POST` /transfer/:toAddress/:tokenID (`privateKey` in the body)
