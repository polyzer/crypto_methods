// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
const assert = require('assert');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http');

let Info = {
    AliceBobCypherKey: 'randomSessionKeyForBob',
    // Shared key for Trent
    AliceTrentCypherKey: 'Alice_Trent_cypher_key',
    // Getting TimeStamp
    TimeStamp: new Date().getSeconds(),
    BobID:'Bob_id',
    TrentID: 'Trent_id',
    AliceID: 'Alice_id'
};
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/trent_to_alice', (req, res) =>{
    console.log("Alice get from trent: %s", JSON.stringify(msg));

});

app.post('/bob_to_alice', (req, res) =>{
    console.log("Alice get from Bob: %s", JSON.stringify(msg));
});


/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.TimeStamp +'.'+ Info.BobID +'.'+ Info.AliceBobCypherKey;
let encrypted_data = enc_funcs.encryptWithKey(Info.AliceTrentCypherKey, first_session_data);
console.log("alice encryption");

let init_req_to_trent = http.request({
            hostname: 'localhost',
            port: 3000,
            method: 'POST',
            path: '/alice_to_bob',
            headers: {
                "Content-Type": "application/json"
            },
            agent: false  // create a new agent just for this one request
          }, (res) => {
              console.log(JSON.stringify(res.body));
          });

init_req_to_trent.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

init_req_to_trent.write(JSON.stringify({"Data": encrypted_data}));
init_req_to_trent.end();
//process.send({"Data": encrypted_data, "Type": enc_funcs.MESSAGES.ALICE_TO_BOB});
// let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);

process.on("message", (msg)=>{
    console.log("Alice: %s", JSON.stringify(msg));

});
process.on('exit',()=>{
    console.log("Alice: exited ;)");
});

app.listen(3001, function () {
    console.log('Alice listening on port 3001!');
  });