var EOS = require('eosjs');
var ecc = require('eosjs-ecc');

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

var eos = EOS(config);

// generate new key pair

ecc.randomKey().then(privateKey => {
  console.log('Private Key:\t', privateKey);
  console.log('Public Key:\t', ecc.privateToPublic(privateKey));
});

// return general network information
eos.getInfo((error, result) => {
  console.log(error, result);
});


// return a blockchain account
eos.getAccount('eosio', (error, result) => {
  console.log(error, result);
});


// return smart contract code hash
eos.getCodeHash('eosio', (error, result) => {
  console.log(error, result);
});


// return smart contract abi
eos.getAbi('eosio', (error, result) => {
  console.log(error, result);
});


// return smart contract raw of code and abi
eos.getRawCodeAndAbi('eosio', (error, result) => {
  console.log(error, result);
});


// return a block from the blockchain.
eos.getBlock("3833592", (error, result) => {
  console.log(error, result);
});


// return the minimum state necessary to validate transaction headers.
eos.getBlockHeaderState("3833592", (error, result) => {
  console.log(error, result);
});


// return smart contract data from an account.
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
  console.log(error, result);
});


// return currency balance
eos.getCurrencyBalance('eosio.token', 'eosio', 'MEETONE', (error, result) => {
  console.log(error, result);
});


// return currency stats
eos.getCurrencyStats('eosio.token', 'MEETONE', (error, result) => {
  console.log(error, result);
});


// return producers list from system contract
eos.getProducers({
  'json': true,
  'lower_bound': 'meetone.m',
  'limit': 1
}, (error, result) => {
  console.log(error, result);
});


// return currently producer schedule
eos.getProducerSchedule((error, result) => {
  console.log(error, result);
});


// return transaction info
eos.getTransaction('98ff999d1395553ba9f3eb8acf59206aece4676b406cd6389911b42378c4ccdb', (error, result) => {
  console.log(error, result);
});


// return key accounts
eos.getKeyAccounts('EOS6ZtMCx7eCkNxkRcizJm7J5Fr13YKtaBEx6PtETnh1ihoHRZvWU', (error, result) => {
  console.log(error, result);
});


// return accounts controlled by eosio.prods
eos.getControlledAccounts('eosio.prods', (error, result) => {
  console.log(error, result);
});


// return account actions
eos.getActions({
  'account_name': 'meetone.m',
  'pos': '', // An absolute sequence positon -1 is the end/last action
  'offset': '20' //The number of actions relative to pos, negative numbers return [pos-offset,pos), positive numbers return [pos,pos+offset)
}, (error, result) => {
  console.log(error, result);
});


// return rammarket data and RAM price
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


// return CPU/NET price
eos.getAccount('meetone.m', (error, result) => {
  console.log(error, result);

  var netWeight = result.total_resources.net_weight.split(' ')[0];
  var netLimit = result.net_limit.max;
  console.log('current price of NET (EOS/KB/Day): ' + netWeight / (netLimit / 1024) / 3);

  var cpuWeight = result.total_resources.cpu_weight.split(' ')[0];
  var cpuLimit = result.cpu_limit.max;
  console.log('current price of CPU (EOS/KB/Day): ' + cpuWeight / (cpuLimit / 1000) / 3);
});


// return producer info
eos.getTableRows({
  'json': true,
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'producers',
  'lower_bound': 'meetone.m', // default = 0
  'limit': 1
}, (error, result) => {
  console.log(error, result);

  // convert vote_weight to token amount
  // staked = voteWeight / Math.pow(2, seconds_since_year_2000 / seconds_per_year ) / 10000

  var voteWeight = result.rows[0].total_votes;
  var staked = voteWeight / Math.pow(2, Math.floor(((new Date()).getTime() - 946684800000) / 1000 / (86400 * 7 )) / 52) / 10000;
  console.log(staked);
});


// return blockchain global data
eos.getTableRows({
  'json': true,
  'code': 'eosio',
  'scope': 'eosio',
  'table': 'global'
}, (error, result) => {
  console.log(error, result);
});
