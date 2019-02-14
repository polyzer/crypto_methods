var crypto = require('crypto');
const QuickEncrypt = require('quick-encrypt')
let promises = [];

/**  1. First Step
  Для начала сеанса передачи сообщений Алиса шифрует конкатенацию метки времени, 
  идентификатора Боба и сгенерированного случайного сеансового ключа. 
  В качестве ключа шифрования используется ключ, 
  который известен Алисе и Тренту — промежуточному доверенному серверу. 
  После этого Алиса передает своё имя (в открытом виде) и зашифрованные данные Тренту.
 */
// Generating random session key;
let prime_length = 512;
let diffHell = crypto.createDiffieHellman(prime_length);
diffHell.generateKeys();
/////////////////////////************ */
let Info = {
    randomSessionKeyForBob: diffHell.getPrivateKey(),
    // Shared key for Trent
    AliceTrentCypherKey: 'Alice_Trent_cypher_key',
    // Getting timestamp
    timeStamp: new Date().getSeconds(),
    BobID:'Bob_id'
};
/////////////////////////************ */
// Buffer that we need to encrypt with  key;
let first_session_data = Info.timeStamp + Info.BobID + Info.randomSessionKeyForBob;
// Ecnrypting
console.log("Bob's key: " + Info.randomSessionKeyForBob);
console.log("first_session_data: " + first_session_data);

//let encrypted_buffer = crypto.privateEncrypt(Info.AliceTrentCipherKey, Info.randomSessionKeyForBob);
let encrypted_buffer = crypto.privateEncrypt(Info.randomSessionKeyForBob, new Buffer(first_session_data));
console.log(encrypted_buffer);

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