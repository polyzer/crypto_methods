const crypto = require('crypto');

const redis = require("redis");
const { fork } = require('child_process');
const alice_child_process = fork('alice.js');
const bob_child_process = fork('bob.js');

// DATA
let Alice_Trent_cypher_key = 'Alice_Trent_cypher_key'; //Alice and Trent knows
let Bob_Trent_cypher_key = 'Bob_Trent_cypher_key'; //Alice and Trent knows

/**
 * 2. 
 * Трент расшифровывает совместным с Алисой ключом пакет, 
 * выбирает оттуда сгенерированный Алисой случайный сеансовый ключ и составляет 
 * конкатенацию из новой метки времени, идентификатора Алисы и сеансового ключа, 
 * после чего шифрует её общим с Бобом ключом и передаёт ему.
 */


// lineReader.on("line", function (line){
//     console.log("Parent process publish: ", line);
//     sub.publish("chat", line);
// });
