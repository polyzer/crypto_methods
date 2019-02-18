// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
const assert = require('assert');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http');
 
//1. let Bob_Trent_cypher_key = 'Bob_Trent_cypher_key'; //Bob and Trent knows
let Info = {
    BobTrentCypherKey: 'Bob_Trent_cypher_key',
    TimeStamp: new Date().getSeconds(),
    BobID:'Bob_id',
    TrentID: 'Trent_id',
    AliceID: 'Alice_id',
    AliceBobCypherKey: 'randomSessionKeyForBob'
};
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/trent_to_bob', (req, res) =>{
    console.log("Bob recieved KEY FROM ALICE: %s", Info.AliceBobCypherKey);
    let body_data = req.body;
    if (body_data.Type === enc_funcs.MESSAGES.ALICE_TO_BOB){
        if(body_data.Data){
            let encrypted_data = body_data.Data;
            let decrypted_data = enc_funcs.decryptWithKey(Info.BobTrentCypherKey, encrypted_data);
            Info.AliceBobCypherKey = decrypted_data.split(".").pop();
        }
    }
    console.log("Bob recieved: %s", JSON.stringify(body_data));

});

app.post('/bob_to_alice', (req, res) =>{

});


//wait_message();
/////////////////////////************ */
// Buffer that we need to encrypt with  key;
// let first_session_data = Info.TimeStamp + '.' + Info.BobID +'.'+ Info.randomSessionKeyForBob;
// let encrypted_data = enc_funcs.encryptWithKey(Info.AliceTrentCypherKey, first_session_data);
// let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);

/**
 * 3. После этого Боб расшифровывает пакет данных общим с Трентом ключом и 
 * может использовать сгенерированный Алисой случайный сеансовый ключ для передачи данных.
 */
async function wait_message(){
    let func_ret = await new Promise((resolve) => {
        process.on("message", (msg)=>{
            console.log("Bob recieved KEY FROM ALICE: %s", Info.AliceBobCypherKey);
            if (msg.Type === enc_funcs.MESSAGES.ALICE_TO_BOB){
                if(msg.Data){
                    let encrypted_data = msg.Data;
                    let decrypted_data = enc_funcs.decryptWithKey(Info.BobTrentCypherKey, encrypted_data);
                    Info.AliceBobCypherKey = decrypted_data.split(".").pop();
                }
            }
            console.log("Bob recieved: %s", JSON.stringify(msg));
            resolve();
        });
    });
}
process.on('exit',()=>{
    console.log("Bob: exited ;)");
});
app.listen(3002, function () {
    console.log('Bob listening on port 3002!');
  });