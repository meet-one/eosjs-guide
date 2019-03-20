Eos = require('eosjs');

// {"msg": "succeeded", "keys": {"active_key": {"public": "EOS6MrMuwWT7oGMcy2C6YbdvBoCDb4QB9H5VBB5zJRtx7vUrXtwSe", "private": "5HscDoZQDCwmpLP4cYoRHigQAQwkk2cHiobT6eg23Tt25kmJ6Wg"}, "owner_key": {"public": "EOS5rbHvAEeSqZV9ePTfU342sKy8vd7EqdYC2tSUvpYgzb987JZGH", "private": "5JHjJjCJFb72cKGogVb7mGYrwh1QJu168aQXtPzddn1zF5CL7rE"}}, "account": "toeosjsguide"}

// Default configuration
var config = {
  chainId: null, // 32 byte (64 char) hex string
  keyProvider: '', //only key and should never be used for the production blockchain.
  httpEndpoint: 'https://fullnode.meet.one',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
};

var eos = Eos(config);

// return general network information
eos.getInfo((error, result) => {
  console.log(error, result)
});


// return a blockchain account
eos.getAccount('eosio', (error, result) => {
  console.log(error, result)
});


// return smart contract code hash
eos.getCodeHash('eosio', (error, result) => {
  console.log(error, result)
});


// return smart contract abi
eos.getAbi('eosio', (error, result) => {
  console.log(error, result)
});


// return smart contract raw of code and abi
eos.getRawCodeAndAbi('eosio', (error, result) => {
  console.log(error, result)
});


// return a block from the blockchain.
eos.getBlock("3833592", (error, result) => {
  console.log(error, result)
});


// return the minimum state necessary to validate transaction headers.
eos.getBlockHeaderState("3833592", (error, result) => {
  console.log(error, result)
});


// smart contract data from an account.
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


// return currency balance
eos.getCurrencyBalance('eosio.token', 'eosio', 'MEETONE', (error, result) => {
  console.log(error, result)
});


// return currency stats
eos.getCurrencyStats('eosio.token', 'MEETONE', (error, result) => {
  console.log(error, result)
});


// return producers list from system contract
eos.getProducers({
  'json': true,
  'lower_bound': 'meetone.m',
  'limit': 1
}, (error, result) => {
  console.log(error, result)
});


// return currently producer schedule
eos.getProducerSchedule((error, result) => {
  console.log(error, result)
});


// return transaction info
eos.getTransaction('98ff999d1395553ba9f3eb8acf59206aece4676b406cd6389911b42378c4ccdb', (error, result) => {
  console.log(error, result)
});


// return key accounts
eos.getKeyAccounts('EOS6ZtMCx7eCkNxkRcizJm7J5Fr13YKtaBEx6PtETnh1ihoHRZvWU', (error, result) => {
  console.log(error, result)
});


// return accounts controlled by eosio.prods
eos.getControlledAccounts('eosio.prods', (error, result) => {
  console.log(error, result)
});


// return account actions
eos.getActions({
  'account_name': 'meetone.m',
  'pos': '', // An absolute sequence positon -1 is the end/last action
  'offset': '20' //The number of actions relative to pos, negative numbers return [pos-offset,pos), positive numbers return [pos,pos+offset)
}, (error, result) => {
  console.log(error, result)
});