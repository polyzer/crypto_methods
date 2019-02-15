const enc_funcs = require('./lib');
const crypto = require('crypto');

const redis = require("redis");
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
process.on('exit',()=>{
    console.log("Trent: exited ;)");
});