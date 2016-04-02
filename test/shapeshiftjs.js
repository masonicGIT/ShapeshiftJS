var shapeshiftJS = require('../src/index.js');
var should = require('should');
describe('ShapeshiftJS Tests', function () {

  it('Checks if the major coins are available', function () {
    return shapeshiftJS.getCoinInfo()
    .then(function(res) {
      res['BTC'].should.exist;
      res['BTC'].status.should.equal('available');
      res['ETH'].should.exist;
      res['ETH'].status.should.equal('available');
      res['LTC'].should.exist;
      res['LTC'].status.should.equal('available');
    });
  });

  it('Checks if currency pair rates are available - btc_eth', function() {
    return shapeshiftJS.getRate('btc_eth')
    .then(function(res) {
      res.pair.should.exist;
      res.rate.should.exist;
      res.pair.should.equal('btc_eth');
      res.rate.should.be.above(0);
    });
  });

  it('Checks if currency pair rates are available - eth_btc', function() {
    return shapeshiftJS.getRate('eth_btc')
    .then(function(res) {
      res.pair.should.exist;
      res.rate.should.exist;
      res.pair.should.equal('eth_btc');
      res.rate.should.be.above(0);
    });
  });	     

  it('Check if market rate information is available - btc_eth', function() {
    return shapeshiftJS.getMarketInfo('btc_eth')
    .then(function(res) {
      res.pair.should.exist;
      res.pair.should.equal('btc_eth');
      res.rate.should.exist;
      res.rate.should.be.above(0);
      res.minerFee.should.exist;
      res.minerFee.should.be.above(0);
      res.limit.should.exist;
      res.limit.should.be.above(0);
      res.minimum.should.exist;
      res.minimum.should.be.above(0);
    });
  });

  it('Check if market rate information is available - btc_eth', function() {
    return shapeshiftJS.getMarketInfo('eth_btc')
    .then(function(res) {
      res.pair.should.exist;
      res.pair.should.equal('eth_btc');
      res.rate.should.exist;
      res.rate.should.be.above(0);
      res.minerFee.should.exist;
      res.minerFee.should.be.above(0);
      res.limit.should.exist;
      res.limit.should.be.above(0);
      res.minimum.should.exist;
      res.minimum.should.be.above(0);
    });
  });

  it('Checks if a list of the most recent transactions is available', function () {
    return shapeshiftJS.recentTx('btc_eth')
    .then(function(res) {
      res.should.exist;
      res.should.be.an.instanceOf(Array);
      res.length.should.be.above(0);
    });
  });

  it('Get the status of a live transaction', function () {
    return console.log('\tWarning: This endpoint is currently not tested');
  });

  it('Get the time remaining for a live transaction', function () {
    return console.log('\tWarning: This endpoint is currently not tested');
  });

  it('Validate an address', function () {
    var address = '19bPFghugaE5Z1LPLegzgw95McdXoU3WKL';
    var currency = 'btc';
    return shapeshiftJS.validateAddress(address, currency)
    .then(function(res) {
      res.isvalid.should.exist;
      res.isvalid.should.be.equal(true);
    });
  });

  it('Post an amount to send out', function() {
    var params = {
      amount: 1,
      withdrawal: '19bPFghugaE5Z1LPLegzgw95McdXoU3WKL',
      currencyPair: 'btc_eth'
    };

    return shapeshiftJS.postSendAmount(params)
    .then(function(res) {
      res.success.should.exist;
      res.success.pair.should.exist;
      res.success.pair.should.equal('btc_eth');
      res.success.withdrawalAmount.should.exist;
      res.success.withdrawalAmount.should.equal('1');
      res.success.depositAmount.should.exist;
      res.success.depositAmount.should.be.above(0);
      res.success.expiration.should.exist;
      res.success.quotedRate.should.be.above(0);
      res.success.maxLimit.should.exist;
      res.success.maxLimit.should.be.above(0);
      res.success.minerFee.should.exist;
      res.success.minerFee.should.be.above(0);
    });
  });
  
});