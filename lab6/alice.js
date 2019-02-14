const QuickEncrypt = require('quick-encrypt');
const fs = require('fs');

// --- RSA Keypair Generation ---
let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
console.log(JSON.stringify(keys)); // Generated Public Key and Private Key pair

let publicKey = keys.public;      // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "
let privateKey = keys.private;   // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "

fs.writeFile("./private_key.txt", privateKey, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
fs.writeFile("./public_key.txt", publicKey, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
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