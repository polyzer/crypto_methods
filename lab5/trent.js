const crypto = require('crypto');

const redis = require("redis");
const { fork } = require('child_process');
const alice_child_process = fork('alice.js');
const bob_child_process = fork('bob.js');
var path = require('path'); 
path.exists('./bob_trent_public.txt', function(exists) { 
  if (exists) { 
    // do something 
  } 
}); 
// DATA
let Info = {
    AliceTrentCypherKey: 'Alice_Trent_cypher_key', //Alice and Trent knows
    BobTrentCypherKey: 'Bob_Trent_cypher_key' //Alice and Trent knows    
};

/**
 * 2. 
 * Трент расшифровывает совместным с Алисой ключом пакет, 
 * выбирает оттуда сгенерированный Алисой случайный сеансовый ключ и составляет 
 * конкатенацию из новой метки времени, идентификатора Алисы и сеансового ключа, 
 * после чего шифрует её общим с Бобом ключом и передаёт ему.
 */
