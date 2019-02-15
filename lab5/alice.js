// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
var assert = require('assert');

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
/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.TimeStamp +'.'+ Info.BobID +'.'+ Info.AliceBobCypherKey;
let encrypted_data = enc_funcs.encryptWithKey(Info.AliceTrentCypherKey, first_session_data);
process.send({"Data": encrypted_data, "Type": enc_funcs.MESSAGES.ALICE_TO_BOB});
// let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);

process.on("message", (msg)=>{
    console.log("Alice: %s", JSON.stringify(msg));

});
process.on('exit',()=>{
    console.log("Alice: exited ;)");
});