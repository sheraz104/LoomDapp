const express = require("express");
const Web3 = require("web3");
const bodyParser = require('body-parser')

const exec = require("child_process").exec;

const {
  NonceTxMiddleware,
  SignedTxMiddleware,
  Client,
  Contract,
  Address,
  LocalAddress,
  CryptoUtils,
  LoomProvider
} = require("loom-js");

const ABI = require("./build/contracts/Test.json").abi;
const contract_address = require("./build/contracts/Test.json").networks.default
  .address;

const app = express();
app.use(bodyParser.json());

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


app.get("/generateAddress", (req, res) => {
  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);
  const from = LocalAddress.fromPublicKey(publicKey).toString();  
  
  // console.log(toHexString(privateKey));

  // console.log(fromHexString(toHexString(privateKey)))

  res.send({
    address: from,
    publicKey: toHexString(publicKey),
    privateKey: toHexString(privateKey)
  });
});

app.post("/createItem/:toAddress", async (req, res) => {
  
  const privateKey = fromHexString(req.body.privateKey);
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

  const toAddress = req.params.toAddress;
  const client = new Client(
    "default",
    "ws://127.0.0.1:46658/websocket",
    "ws://127.0.0.1:46658/queryws"
  );

  const from = LocalAddress.fromPublicKey(publicKey).toString();
  const web3 = new Web3(new LoomProvider(client, privateKey));
  const contractAddress = contract_address;
  const contract = new web3.eth.Contract(ABI, contractAddress, { from });

  res.send({ success: true });

  await contract.methods
    .mint(toAddress)
    .send();
});

app.get("/tokenCount", async (req, res) => {
  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

  const client = new Client(
    "default",
    "ws://127.0.0.1:46658/websocket",
    "ws://127.0.0.1:46658/queryws"
  );

  const from = LocalAddress.fromPublicKey(publicKey).toString();
  const web3 = new Web3(new LoomProvider(client, privateKey));
  const contractAddress = contract_address;
  const contract = new web3.eth.Contract(ABI, contractAddress, { from });

  const tokenCount = await contract.methods.totalSupply().call();
  console.log(tokenCount);

  res.send({ count: tokenCount });
});

app.get("/tokensByAddress/:address", async (req, res) => {
  const privateKey = CryptoUtils.generatePrivateKey();
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

  const client = new Client(
    "default",
    "ws://127.0.0.1:46658/websocket",
    "ws://127.0.0.1:46658/queryws"
  );

  const from = LocalAddress.fromPublicKey(publicKey).toString();
  const web3 = new Web3(new LoomProvider(client, privateKey));
  const contractAddress = contract_address;
  const contract = new web3.eth.Contract(ABI, contractAddress, { from });

  const tokens = await contract.methods.tokensOfOwner(req.params.address).call();
  res.send({tokens});

});


app.post("/transfer/:toAddress/:tokenID", async (req, res) => {
  
  const privateKey = fromHexString(req.body.privateKey);
  const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey);

  const toAddress = req.params.toAddress;
  const tokenID = req.params.tokenID;
  console.log(toAddress, tokenID)
  const client = new Client(
    "default",
    "ws://127.0.0.1:46658/websocket",
    "ws://127.0.0.1:46658/queryws"
  );

  const from = LocalAddress.fromPublicKey(publicKey).toString();
  const web3 = new Web3(new LoomProvider(client, privateKey));
  const contractAddress = contract_address;
  const contract = new web3.eth.Contract(ABI, contractAddress, { from });

  res.send({ success: true });

  await contract.methods
    .transfer(toAddress, tokenID)
    .send();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

