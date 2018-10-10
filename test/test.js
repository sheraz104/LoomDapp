const assert = require("assert");
const axios = require("axios");
let private_key_sender;
let public_key_sender;

describe("Test Creation of Account", async function() {
  it("Should Generate an Address", async function() {
    let result = await axios.get("http://localhost:3000/generateAddress");
    if (result.data) {
      assert(true);
    }

    //   });

    //   it("Should Create an Item", async function() {
    const generateAddress1 = await axios.get(
      "http://localhost:3000/generateAddress"
    );
    let toAddress = generateAddress1.data.address;
    private_key_sender = generateAddress1.data.privateKey;
    public_key_sender = generateAddress1.data.address;

    const generateAddress2 = await axios.get(
      "http://localhost:3000/generateAddress"
    );
    const sender_private_key = generateAddress2.data.privateKey;

    await axios.post(`http://localhost:3000/createItem/${toAddress}`, {
      privateKey: sender_private_key
    });
    setTimeout(async() => {
        result = await axios.get("http://localhost:3000/tokenCount");
        console.log(result.data.count);
        assert.equal(result.data.count, 1);
    
        result = await axios.get("http://localhost:3000/generateAddress");
        toAddress = result.data.address;
    
        await axios.post(`http://localhost:3000/transfer/${toAddress}/0`, {
          privateKey: private_key_sender
        });
    }, 5000);
 
    //
  });
});
