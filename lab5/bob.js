var crypto = require('crypto');
var prime_length = 60;
var diffHell = crypto.createDiffieHellman(prime_length);
diffHell.generateKeys('base64');



let promises = [];
let counter = 0;

//1. let Bob_Trent_cypher_key = 'Bob_Trent_cypher_key'; //Bob and Trent knows
let Info = {
    BobTrentCypherKey: 'Bob_Trent_cypher_key',
    TimeStamp: new Date().getSeconds(),
    Bob_id: 'Bob_id'
};
diffHell.setPrivateKey(Info.BobTrentCypherKey);

/**
 * 3. После этого Боб расшифровывает пакет данных общим с Трентом ключом и 
 * может использовать сгенерированный Алисой случайный сеансовый ключ для передачи данных.
 */

process.on("message", (msg)=>{
    console.log("Bob: %s", JSON.stringify(msg));
    console.log('Bob: promises %s', JSON.stringify(promises));
    Promise.all(promises).then(()=>{
        if(msg.end === true){
            sub.quit();
            console.log("after sub quit");
            process.exit();
        }    
    });
});
process.on('exit',()=>{
    console.log("Bob: exited ;)");
});
