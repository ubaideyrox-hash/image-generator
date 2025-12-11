//change player ID
const playerId = '000000007071f41d';
const installation = 'timotech';

const fs = require('fs')
const crypto = require('crypto'),
    algorithm = 'aes-192-cbc';

const { dirname } = require('path');
const rootFolder = dirname(require.main.filename);

function getHashedSecret(playerId){
    const secret = 'pisignageLangford';
    return crypto.createHmac('sha1', secret)
                    .update(playerId)    
                    .digest('hex');
}

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function createFile(content){
    try {
        var filename = rootFolder + '/licenses/license_' + playerId + '.txt';
        fs.writeFileSync(filename, content)
        console.log('File created successfully: ' + filename);
      } catch (err) {
        console.error(err)
      }
}

var password = getHashedSecret(playerId);
var encrypted = encrypt('{"enabled":true,"generatedOn":"' + new Date().toISOString() + '","validity":0,"installation":"' + installation + '"}')
console.log('encrypted: ' + encrypted + '\n\n\n');
console.log('decrypted: ' + decrypt(encrypted) + '\n\n\n');

createFile(encrypted);