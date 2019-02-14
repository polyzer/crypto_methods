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