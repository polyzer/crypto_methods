// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
var assert = require('assert');

//1. let Bob_Trent_cypher_key = 'Bob_Trent_cypher_key'; //Bob and Trent knows
let Info = {
    BobTrentCypherKey: 'Bob_Trent_cypher_key',
    TimeStamp: new Date().getSeconds(),
    BobID:'Bob_id',
    TrentID: 'Trent_id',
    AliceID: 'Alice_id',
    AliceBobCypherKey: 'randomSessionKeyForBob'
};

/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.TimeStamp + '.' + Info.BobID +'.'+ Info.randomSessionKeyForBob;
let encrypted_data = enc_funcs.encryptWithKey(Info.AliceTrentCypherKey, first_session_data);
let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);

/**
 * 3. После этого Боб расшифровывает пакет данных общим с Трентом ключом и 
 * может использовать сгенерированный Алисой случайный сеансовый ключ для передачи данных.
 */

process.on("message", (msg)=>{
    if (msg.Type === enc_funcs.MESSAGES.ALICE_TO_BOB){
        if(msg.Data){
            let encrypted_data = msg.Data;
            let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);
            Info.AliceBobCypherKey = decrypted_data.split(".").pop();
            console.log("Bob recieved KEY FROM ALICE: %s", Info.AliceBobCypherKey);
        }
    }
    console.log("Bob recieved: %s", JSON.stringify(msg));

});
process.on('exit',()=>{
    console.log("Bob: exited ;)");
});
