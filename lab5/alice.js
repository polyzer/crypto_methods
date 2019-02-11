var crypto = require('crypto');

let promises = [];

/**  1. First Step
  Для начала сеанса передачи сообщений Алиса шифрует конкатенацию метки времени, 
  идентификатора Боба и сгенерированного случайного сеансового ключа. 
  В качестве ключа шифрования используется ключ, 
  который известен Алисе и Тренту — промежуточному доверенному серверу. 
  После этого Алиса передает своё имя (в открытом виде) и зашифрованные данные Тренту.
 */
// Generating random session key;
let prime_length = 60;
let diffHell = crypto.createDiffieHellman(prime_length);
diffHell.generateKeys('base64');
let First_session_info = {
    random_session_key_for_bob: diffHell.getPrivateKey(),
    // Shared key for Trent
    Alice_Trent_cypher_key: 'Alice_Trent_cypher_key',
    // Getting timestamp
    time_stamp: new Date().getSeconds(),
    Bob_id:'Bob_id'
};
diffHell.setPrivateKey(Alice_Trent_cypher_key);
// Buffer that we need to encrypt with  key;
let first_session_data = First_session_info.time_stamp + 
First_session_info.Bob_id + First_session_info.random_session_key_for_bob;
// Ecnrypting
let encrypted_buffer = crypto.privateEncrypt(First_session_info.Alice_Trent_cypher_key, first_session_data);

process.on("message", (msg)=>{
    console.log("Child: %s", JSON.stringify(msg));
    console.log('Child: promises %s', JSON.stringify(promises));
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