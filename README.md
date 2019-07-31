## eosjs-guide
Step-by-step guide to learning eosjs API for integration with EOSIO-based blockchains. (EOS, MEETONE, BOS)

[Sourcecode of Guide](index.js)

[History API Documentation](https://documenter.getpostman.com/view/3895747/S11Ey1cw)

[Click me if you would like to know how to push action to custom contract](articles.js)

[Private Key to Public Key](https://github.com/meet-one/private-to-public)

### Install

```
npm install eosjs@16.0.9
```

### Basic config
```
var Eos = require('eosjs');

// Default configuration
var config = {
  chainId: 'cfe6486a83bad4962f232d48003b1824ab5665c36778141034d75e57b956e422', // 32 byte (64 char) hex string
  keyProvider: '',
  httpEndpoint: 'https://fullnode.meet.one',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};
var eos = Eos(config);
```

### Basic Usage

Generate new key pair 

```
ecc.randomKey().then(privateKey => {
  console.log('Private Key:\t', privateKey);
  console.log('Public Key:\t', ecc.privateToPublic(privateKey));
});
```

Return general network information

```
eos.getInfo((error, result) => {
  console.log(error, result)
});
```

Return a blockchain account
```
eos.getAccount('eosio', (error, result) => {
  console.log(error, result)
});
```

Return smart contract code hash
```
eos.getCodeHash('eosio', (error, result) => {
  console.log(error, result)
});
```

Return smart contract abi
```
eos.getAbi('eosio', (error, result) => {
  console.log(error, result)
});
```

Return smart contract raw of code and abi
```
eos.getRawCodeAndAbi('eosio', (error, result) => {
  console.log(error, result)
});
```

Return a block from the blockchain.
```
eos.getBlock("3833592", (error, result) => {
  console.log(error, result)
});
```

Return the minimum state necessary to validate transaction headers.
```
eos.getBlockHeaderState("3833592", (error, result) => {
  console.log(error, result)
});
```

smart contract data from an account.
```
eos.getTableRows({
  'json': true, // default = false
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'voters',
  'lower_bound': 'meetone.m', // default = 0
  'upper_bound': '', // default = -1
  'limit': 5,  // default = 10
  'key_type': '', // The key type of --index, primary only supports (i64), all others support (i64, i128, i256, float64, float128). Special type 'name' indicates an account name.
  'index_position': '', // 1 - primary (first), 2 - secondary index (in order defined by multi_index), 3 - third index, etc
}, (error, result) => {
  console.log(error, result)
});
```

Return currency balance
```
eos.getCurrencyBalance('eosio.token', 'eosio', 'MEETONE', (error, result) => {
  console.log(error, result)
});
```

Return currency stats
```
eos.getCurrencyStats('eosio.token', 'MEETONE', (error, result) => {
  console.log(error, result)
});
```

Return producers list from system contract
```
eos.getProducers({
  'json': true,
  'lower_bound': 'meetone.m',
  'limit': 1
}, (error, result) => {
  console.log(error, result)
});
```

Return currently producer schedule
```
eos.getProducerSchedule((error, result) => {
  console.log(error, result)
});
```

Return transaction info
```
eos.getTransaction('98ff999d1395553ba9f3eb8acf59206aece4676b406cd6389911b42378c4ccdb', (error, result) => {
  console.log(error, result)
});
```

Return key accounts
```
eos.getKeyAccounts('EOS6ZtMCx7eCkNxkRcizJm7J5Fr13YKtaBEx6PtETnh1ihoHRZvWU', (error, result) => {
  console.log(error, result)
});
```

Return accounts controlled by eosio.prods
```
eos.getControlledAccounts('eosio.prods', (error, result) => {
  console.log(error, result)
});
```

Return account actions
```
eos.getActions({
  'account_name': 'meetone.m',
  'pos': '', // An absolute sequence positon -1 is the end/last action
  'offset': '20' // The number of actions relative to pos, negative numbers return [pos-offset,pos), positive numbers return [pos,pos+offset)
}, (error, result) => {
  console.log(error, result)
});
```

Return rammarket data and RAM price
```
eos.getTableRows({
  'json': true,
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'rammarket',
}, (error, result) => {
  console.log(error, result);
  var data = result.rows[0];
  var quoteBalance = data.quote.balance.split(' ')[0];
  var baseBalance = data.base.balance.split(' ')[0];
  console.log('current RAM price of per KB: ' + quoteBalance / baseBalance * 1024);
});
```

Return CPU/NET price
```
eos.getAccount('meetone.m', (error, result) => {
  console.log(error, result);

  var netWeight = result.total_resources.net_weight.split(' ')[0];
  var netLimit = result.net_limit.max;
  console.log('current price of NET (EOS/KB/Day): ' + netWeight / (netLimit / 1024) / 3);

  var cpuWeight = result.total_resources.cpu_weight.split(' ')[0];
  var cpuLimit = result.cpu_limit.max;
  console.log('current price of CPU (EOS/KB/Day): ' + cpuWeight / (cpuLimit / 1000) / 3);
});
```

Return block producer info
```
eos.getTableRows({
  'json': true,
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'producers',
  'lower_bound': 'meetone.m',
  'limit': 1
}, (error, result) => {
  console.log(error, result);

  // convert vote_weight to token amount
  // staked = voteWeight / Math.pow(2, seconds_since_year_2000 / seconds_per_year ) / 10000

  var voteWeight = result.rows[0].total_votes;
  var staked = voteWeight / Math.pow(2, ((new Date()).getTime() - 946684800000) / 1000 / (52 * 7 * 24 * 3600)) / 10000;
  var staked = voteWeight / Math.pow(2, Math.floor(((new Date()).getTime() - 946684800000) / 1000 / (86400 * 7 )) / 52) / 10000;
  console.log(staked);
});
```

Return blockchain global data
```
eos.getTableRows({
  'json': true,
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'global'
}, (error, result) => {
  console.log(error, result);
});
```

Create new account [source code](createNewAccount.js)
```
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
}).catch(function (error) {
  if (error) {
    console.log(JSON.parse(error));
  }
});
```

Tables of system contract eosio

```
// record of each voter
// cleos -u http://fullnode.meet.one get table eosio eosio voters
voters

// record of each producer
// cleos -u http://fullnode.meet.one get table eosio eosio producers
producers

// votepay_share record of each producer
// cleos -u http://fullnode.meet.one get table eosio eosio producers2
producers2

// info of system rammarket
// cleos -u http://fullnode.meet.one get table eosio eosio rammarket -l 1
rammarket

// record of each account
// cleos -u http://fullnode.meet.one get table eosio meetone.m userres -l 1
userres

// record of each account's delegate bandwith
// cleos -u http://fullnode.meet.one get table eosio meetone.m delband -l 1
delband

// record of each account's refunding token amount
// cleos -u http://fullnode.meet.one get table eosio m refunds -l 1
refunds

// record of each namebids
// MEETONE sidechain doesn't support bid name
namebids

// record of each refunding namebids
// MEETONE sidechain doesn't support bid name
bidrefunds
```
