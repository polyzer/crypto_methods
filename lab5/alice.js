var crypto = require('crypto');

let redis = require("redis");
let sub = redis.createClient();
let pub = redis.createClient();
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
// Getting random session key, that would be used for chatting with Bob.
let random_session_key_for_bob = diffHell.getPrivateKey();
// Shared key for Trent
let Alice_Trent_cypher_key = 'Alice_Trent_cypher_key'; //Alice and Trent knows
// Getting timestamp
let time_stamp = new Date().getSeconds();
// Getting Bob_id
let Bob_id = 'Bob_id';
diffHell.setPrivateKey(Alice_Trent_cypher_key);


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
    console.log("Child: exited ;)");
});