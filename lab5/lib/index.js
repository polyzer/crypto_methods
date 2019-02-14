var assert = require('assert');
var crypto = require('crypto');

function encryptWithKey(enc_key, enc_text){
    var algorithm = 'aes256';
    var inputEncoding = 'utf8';
    var outputEncoding = 'hex';

    var key = 'ciw7p02f70000ysjon7gztjn7';
    if(enc_key) key = enc_key;
    var text = '72721827b4b4ee493ac09c635827c15ce014c3c3';
    if(enc_text) text = enc_text;

    console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);

    var cipher = crypto.createCipher(algorithm, key);
    var ciphered = cipher.update(text, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);

    console.log('Result in %s is "%s"', outputEncoding, ciphered);

    return ciphered;
}
function decryptWithKey(dec_key, dec_text){
    var algorithm = 'aes256';
    var inputEncoding = 'utf8';
    var outputEncoding = 'hex';
    
    var key = 'ciw7p02f70000ysjon7gztjn7';
    if(dec_key) key = dec_key;
    var text = '72721827b4b4ee493ac09c635827c15ce014c3c3';
    if(dec_text) text = dec_text;

    console.log('Deciphering "%s" with key "%s" using %s', text, key, algorithm);

    var decipher = crypto.createDecipher(algorithm, key);
    var deciphered = decipher.update(text, outputEncoding, inputEncoding);
    deciphered += decipher.final(inputEncoding);
    console.log('Result in %s is "%s"', inputEncoding, deciphered);

    return deciphered;
}

module.exports = {
    encryptWithKey: encryptWithKey,
    decryptWithKey: decryptWithKey
}