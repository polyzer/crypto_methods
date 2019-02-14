// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
const enc_funcs = require('./lib');
var assert = require('assert');
let Info = {
    randomSessionKeyForBob: 'randomSessionKeyForBob',
    // Shared key for Trent
    AliceTrentCypherKey: 'Alice_Trent_cypher_key',
    // Getting timestamp
    timeStamp: new Date().getSeconds(),
    BobID:'Bob_id'
};
/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.timeStamp +'.'+ Info.BobID +'.'+ Info.randomSessionKeyForBob;
let encrypted_data = enc_funcs.encryptWithKey(Info.AliceTrentCypherKey, first_session_data);
let decrypted_data = enc_funcs.decryptWithKey(Info.AliceTrentCypherKey, encrypted_data);

process.on("message", (msg)=>{
    console.log("Alice: %s", JSON.stringify(msg));
    console.log('Alice: promises %s', JSON.stringify(promises));
    Promise.all(promises).then(()=>{
        if(msg.end === true){
            sub.quit();
            console.log("after sub quit");
            process.exit();
        }    
    });
});
process.on('exit',()=>{
    console.log("Alice: exited ;)");
});