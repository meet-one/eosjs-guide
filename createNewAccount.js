var Eos = require('eosjs');

// Default configuration
var config = {
  chainId: '7136e3e32a458bb99cf6973ab5055869d25830607b9e78593769e1be52fb6f20', // 32 byte (64 char) hex string
  keyProvider: '5KQhMkrKQCdRz3n5UVXB7PxUf5r6LBNwqvMQQHcyHgSMMPJ61z8', // Test only key and should never be used for the production blockchain.
  httpEndpoint: 'http://sidechain-test.meet.one:8888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

var eos = Eos(config);
var payer = 'testnetaaa.m';

var PrivateKey = Eos.modules.ecc.PrivateKey;
PrivateKey.randomKey().then(function (d) {
  var privkey = d.toWif();
  var publicKey = d.toPublic().toString();

  console.log('public key:' + publicKey);
  console.log('private key:' + privkey);

  var newAccountName = 'eosjsguide.m';

  eos.transaction(tr => {
    tr.newaccount({
      creator: payer,
      name: newAccountName,
      owner: publicKey,
      active: publicKey
    });
    tr.buyrambytes({
      payer: payer,
      receiver: newAccountName,
      bytes: 1024 * 3
    });
    tr.delegatebw({
      from: payer,
      receiver: newAccountName,
      stake_net_quantity: '1.0000 MEETONE',
      stake_cpu_quantity: '1.0000 MEETONE',
      transfer: 0
    });
  }).then(function (result) {
    console.log(result);
    // https://meetone-test.eosx.io/account/eosjsguide.m
  }).catch(function (error) {
    if (error) {
      console.log(JSON.parse(error));
    }
  });
});