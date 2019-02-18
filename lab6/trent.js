// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
const assert = require('assert');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http');
const { fork } = require('child_process');


const alice_child_process = fork('alice.js');
const bob_child_process = fork('bob.js');
var path = require('path');
// DATA
let Info = {
    randomSessionKeyForBob: 'randomSessionKeyForBob',
    // Shared key for Trent
    AliceTrentCypherKey: 'Alice_Trent_cypher_key',
    BobTrentCypherKey: 'Bob_Trent_cypher_key',
    // Getting timestamp
    TimeStamp: new Date().getSeconds(),
    BobID:'Bob_id',
    TrentID: 'Trent_id',
    AliceID: 'Alice_id'
};
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.post('/alice_to_bob',  (req, res) =>{
    let body_data = req.body;
    if(body_data.Data){
        let encrypted_data = body_data.Data;
        let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);
        let AliceToBobCypherkey = decrypted_data.split(".").pop();
        let dataforencryption = new Date().getSeconds() + '.' + Info.BobID + '.' + AliceToBobCypherkey;
        let encrypt_for_Bob = enc_funcs.encryptWithKey(Info.BobTrentCypherKey, dataforencryption);
        // make request to Bob
        let trent_to_bob_req = http.request({
            hostname: 'localhost',
            port: 3002,
            method: 'POST',
            path: '/trent_to_bob',
            headers: {
                "Content-Type": "application/json"
            },
            agent: false  // create a new agent just for this one request
          }, (res) => {

          });
        trent_to_bob_req.write(JSON.stringify({Data: encrypt_for_Bob}));
        trent_to_bob_req.end();
    }
    console.log("Trent recieved: %s", JSON.stringify(body_data));
    
});



/**
 * 2. 
 * Трент расшифровывает совместным с Алисой ключом пакет, 
 * выбирает оттуда сгенерированный Алисой случайный сеансовый ключ и составляет 
 * конкатенацию из новой метки времени, идентификатора Алисы и сеансового ключа, 
 * после чего шифрует её общим с Бобом ключом и передаёт ему.
 */
alice_child_process.on("message", (msg)=>{
    if (msg.Type === enc_funcs.MESSAGES.ALICE_TO_BOB){
        if(msg.Data){
            let encrypted_data = msg.Data;
            let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);
            let AliceToBobCypherkey = decrypted_data.split(".").pop();
            let dataforencryption = new Date().getSeconds() + '.' + Info.BobID + '.' + AliceToBobCypherkey;
            let encrypt_for_Bob = enc_funcs.encryptWithKey(Info.BobTrentCypherKey, dataforencryption);
            bob_child_process.send({"Data": encrypt_for_Bob, "Type": enc_funcs.MESSAGES.ALICE_TO_BOB});
        }
    }
    console.log("Trent recieved: %s", JSON.stringify(msg));

});

bob_child_process.on("message", (msg)=>{
    if (msg.Type === enc_funcs.MESSAGES.BOB_TO_ALICE){
        if(msg.Data){
            let encrypted_data = msg.Data;
            let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);
            let AliceToBobCypherkey = decrypted_data.split(".").pop();
            let dataforencryption = new Date().getSeconds() + '.' + Info.BobID + '.' + AliceToBobCypherkey;
            let encrypt_for_Bob = enc_funcs.encryptWithKey(Info.BobTrentCypherKey, dataforencryption);
            bob_child_process.send({"Data": encrypt_for_Bob, "Type": enc_funcs.MESSAGES.ALICE_TO_BOB});
        }
    }
    console.log("Trent recieved: %s", JSON.stringify(msg));

});

bob_child_process.on('close', function(code) {
    console.log('Bob`s closing code: ' + code);
});

process.on('exit',()=>{
    console.log("Trent: exited ;)");
});
app.listen(3000, function () {
    console.log('Trent listening on port 3000!');
  });