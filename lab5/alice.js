// https://github.com/nodejs/node-v0.x-archive/issues/6386#issuecomment-31817919
var assert = require('assert');
var crypto = require('crypto');

var algorithm = 'aes256';
var inputEncoding = 'utf8';
var outputEncoding = 'hex';

var key = 'ciw7p02f70000ysjon7gztjn7';
var text = '72721827b4b4ee493ac09c635827c15ce014c3c3';

console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);

var cipher = crypto.createCipher(algorithm, key);
var ciphered = cipher.update(text, inputEncoding, outputEncoding);
ciphered += cipher.final(outputEncoding);

console.log('Result in %s is "%s"', outputEncoding, ciphered);

var decipher = crypto.createDecipher(algorithm, key);
var deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
deciphered += decipher.final(inputEncoding);

console.log(deciphered);
assert.equal(deciphered, text, 'Deciphered text does not match!');

const fs = require('fs');


console.log("Private Key: " + privateKey.toString());
let Info = {
    randomSessionKeyForBob: privateKey.toString(),
    // Shared key for Trent
    AliceTrentCypherKey: 'Alice_Trent_cypher_key',
    // Getting timestamp
    timeStamp: new Date().getSeconds(),
    BobID:'Bob_id'
};
/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.timeStamp +'.'+ Info.BobID +'.'+ Info.randomSessionKeyForBob;

// --- Encrypt using public key ---
let encryptedText = QuickEncrypt.encrypt( first_session_data, publicKey )
console.log(encryptedText) // This will print out the ENCRYPTED text, for example : " 01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c...... "
 
// --- Decrypt using private key ---
let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
console.log(decryptedText) // This will print out the DECRYPTED text, which is " This is some super top secret text! "
/////////////////////////************ */

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