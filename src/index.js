'use strict';

var ShapeShiftJS = module.exports;
var request = require('request-promise');

function getBaseUrl () {
  var endpoint = 'shapeshift.io';
  return 'https://' + endpoint;
}

/**
 * getRate() Get the current rate offered by shapeshift for a currency pair
 *
 * url: shapeshift.io/rate/ [currencyPair]
 * method: GET
 *
 * @param { String } currencyPair btc_ltc
 *
 * @returns { Object } currencyPairInfo
 * @returns { String } currencyPairInfo.pair btc_ltc
 * @returns { String } currencyPairInfo.rate 70.1234
 */

ShapeShiftJS.getRate = function(currencyPair) {

  if (currencyPair.indexOf('_') === -1) { throw new Error('Invalid currency pair string.') }

  let options = {
    uri: getBaseUrl() + '/rate/' + currencyPair,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (currencyPairInfo) {
    return currencyPairInfo;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * getMarketInfo Gets market info of a currency pair
 *
 * url: shapeshift.io/marketinfo/[pair]
 * method: GET
 *
 * @param { String } currencyPair btc_ltc (OPTIONAL) 
 *
 * @returns { Object } marketInfo
 * @returns { String } marketInfo.pair btc_ltc
 * @returns { Number } marketInfo.rate 70.1234
 * @returns { Number } marketInfo.limit 130.12345678
 * @returns { Number } marketInfo.min 0.02621232
 * @returns { Number } marketInfo.minerFee 0.0001
 */

ShapeShiftJS.getMarketInfo = function(currencyPair) {

  if (currencyPair.indexOf('_') === -1) { throw new Error('Invalid currency pair string.') }

  let options = {
    uri: getBaseUrl() + '/marketinfo/' + currencyPair,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (marketInfo) {
    return marketInfo;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * recentTx() Get a list of the most recent transactions
 *
 * url: shapeshift.io/recenttx/[max]
 * method: GET
 *
 * @param { String } max is an optional number of transactions 
 *                   to return. Must be between 1 and 50, defaults 
 *                   to 5. (OPTIONAL)
 * @returns { Object } recentTx
 * @returns { String } recentTx.curIn btc
 * @returns { String } recentTx.curOut ltc
 * @returns { Number } recentTx.amount 10 (shown in seconds)
 */

ShapeShiftJS.recentTx = function(max) {

  let options = {
    uri: getBaseUrl() + '/recenttx/' + max,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (recentTx) {
    return recentTx;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * getTxStatus() Get the status of the most recent deposit transction to an address
 *
 * url: shapeshift.io/txStat/[address]
 * method: GET
 *
 * @param { String } Address
 * 
 * If no deposits received 
 * @returns { Object } txStatus
 * @returns { String } txStatus.status no_deposits
 * @returns { String } txStatus.address
 * 
 * If deposit received
 * @returns { Object } txStatus
 * @returns { String } txStatus.status receieved
 * @returns { String } txStatus.address
 *
 * If deposit marked as complete
 * @returns { Object } txStatus
 * @returns { String } txStatus.status complete
 * @returns { String } txStatus.address [ address ]
 * @returns { String } txStatus.withdraw [ withdrawal address ]
 * @returns { String } txStatus.incomingCoin [ amount deposited ]
 * @returns { String } txStatus.outgoingCoin [ coin type of deposit ]
 * @returns { String } txStatus.outgoingType [ coin type of withdrawal ]
 * @returns { String } txStatus.transaction [ transaction id of coin sent to withdrawal address ]
 *
 * If deposit failed
 * @returns { Object } txStatus
 * @returns { String } txStatus.status failed
 * @returns { String } txStatus.error
 */

ShapeShiftJS.getTxStatus = function(address) {

  let options = {
    uri: getBaseUrl() + '/txStat/' + address,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (txStatus) {
    return txStatus;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * getTimeRemaining() Get the time remaining on a fixed amount transaction
 *
 * url: shapeshift.io/timeremaining/[address]
 * method: GET
 *
 * @param { String } address
 *
 * @returns { Object } time
 * @returns { String } time.status pending or expired
 * @returns { Number } time.seconds_remaining 600
 */

ShapeShiftJS.getTimeRemaining = function(address) {

  let options = {
    uri: getBaseUrl() + '/timeremaining/' + address,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (time) {
    return time;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * getCoinInfo() Get a list of currencies that Shapeshift currently supports
 *
 * url: shapeshift.io/getcoins
 * method: GET
 *
 * @returns { Object } info
 * @returns { String } info['SYMBOL']
 * @returns { String } info['SYMBOL'].name Bitcoin
 * @returns { String } info['SYMBOL'].symbol BTC
 * @returns { String } info['SYMBOL'].status available
 */

ShapeShiftJS.getCoinInfo = function() {

  let options = {
    uri: getBaseUrl() + '/getcoins',
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (info) {
    return info;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * validateAddress() Validate an address given a currency symbol and address
 *
 * url: shapeshift.io/validateAddress/[address]/[coinSymbol]
 * method: GET
 *
 * @param { String } address
 * @param { String } coinSymbol
 *
 * @returns { Object } response
 * @returns { String } response.isValid true
 * @returns { String } response.error (if isValid is false)
 */

ShapeShiftJS.validateAddress = function(address, symbol) {

  let options = {
    uri: getBaseUrl() + '/validateAddress/' + address + '/' + symbol,
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (response) {
    return response;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * postShift() 
 *
 * url: shapeshift.io/shift
 * method: POST
 * dataType: JSON
 *
 * @param { String } withdrawTo
 * @param { String } currencyPair btc_ltc
 * @param { String } returnAddress (OPTIONAL)
 * @param { String } shapeshiftApiKey (OPTIONAL)
 *
 * @returns { Object } response
 * @returns { String } response.deposit [ deposit address]
 * @returns { String } response.withdrawal [ withdrawal address ]
 * @returns { String } response.withdrawalType [ output coin symbol ]
 *
 * If input coin is NXT
 * @returns { String } response.public [ NXT RS_Address pubkey] 
 *
 * If input coin is XRP
 * @returns { String } response.xrpDestTag [ xrpDestTag ]
 *
 * If API Key provided
 * @returns { String } response.apiPubKey 
 */

ShapeShiftJS.postShift = function(params) {

  let options = {
    method: 'POST',
    uri: getBaseUrl() + '/shift',
    body: {
      withdrawTo: params.withdrawTo,
      currencyPair: params.currencyPair,
      returnAddress: params.returnAddress || null,
      apiKey: config.shapeshiftApiKey || null
    },
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (response) {
    return response;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * postRequestEmail() Request that a receipt for a transaction be sent by email
 *
 * url: shapeshift.io/mail
 * method: POST
 * data type: JSON
 *
 * @param { String } email
 * @param { String } txid
 *
 * @returns { Object } response
 * @returns { String } response.status success
 * @returns { String } response.message Email receipt sent
 */

ShapeShiftJS.postRequestEmail = function(params) {

  let options = {
    method: 'POST',
    uri: getBaseUrl() + '/mail',
    body: {
      email: params.email,
      txid: params.txid
    },
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (response) {
    return response;
  })
  .catch(function(err) {
    return err;
  });
};

/**
 * postSendAmount() Request that a fixed amount be sent to the withdrawal address
 *
 * url: shapeshift.io/sendamount
 * method: POST
 * data type: JSON
 *
 * @param { String } amount
 * @param { String } withdrawal
 * @param { String } pair
 * @param { String } returnAddress (OPTIONAL)
 * @param { String } destTag (OPTIONAL)
 * @param { String } rsAddress (OPTIONAL)
 * @param { String } apiKey (OPTIONAL)
 *
 * @returns { Object } response
 * @returns { String } response.status success
 * @returns { String } response.message Email receipt sent
 */

ShapeShiftJS.postSendAmount = function(params) {
  
  let options = {
    method: 'POST',
    uri: getBaseUrl() + '/sendamount',
    body: {
      amount: params.amount,
      withdrawal: params.withdrawal,
      pair: params.currencyPair,
      returnAddress: params.returnAddress || '',
      apiKey: params.apiKey || ''
    },
    headers: {
      'User-Agent': 'ShapeShiftJS'
    },
    json: true
  }

  return request(options)
  .then(function (response) {
    return response;
  })
  .catch(function(err) {
    return err;
  });
};

