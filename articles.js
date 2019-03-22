var Eos = require('eosjs');

// We have deloyed contract articles.m to MEETONE sidechain testnet.
// Contract articles.m stores article on chain. It inclueds 3 actions, publish, edit, delete.
// Source code: https://github.com/meet-one/contracts/tree/master/articles.m

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

var sender = 'testnetaaa.m';
var permission = 'active';
var authorization = sender + '@' + permission;
var contractName = 'articles.m';

function query() {
  eos.getTableRows({
    'json': true,
    'code': contractName,
    'scope': contractName,
    'table': 'articles'
  }, (error, result) => {
    console.log(error, result);
  });
}

// publish article to contract table
function publish() {
  eos.contract(contractName).then(function (contract) {
    try {
      contract.publish('Hello World.', 'testnetaaa.m', 'Across the Great Wall, we can reach every corner in the world.', {'authorization': authorization}, (error, result)=> {
        console.log(error, result);
        query();
      });
    } catch (e) {
      console.log(e);
    }
  });
}

// edit article
function edit() {
  eos.contract(contractName).then(function (contract) {
    try {
      contract.edit(0, 'Hello World.', 'testnetaaa.m', 'Across the Great Wall, we can reach every corner in the world.', {'authorization': authorization}, (error, result)=> {
        console.log(error, result);
        query();
      });
    } catch (e) {
      console.log(e);
    }
  });
}

// delete article
function del() {
  eos.contract(contractName).then(function (contract) {
    try {
      contract.delarticle(0, {'authorization': authorization}, (error, result)=> {
        console.log(error, result);
        query();
      });
    } catch (e) {
      console.log(e);
    }
  });
}

query();