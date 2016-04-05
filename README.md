# ShapeshiftJS
A javascript wrapper for the Shapeshift API

## Installation

``` npm install shapeshiftjs ```

## Usage

```javascript
var shapeshiftJS = require('shapeshiftjs');

 var params = {
   amount: 1,
   withdrawal: '19bPFghugaE5Z1LPLegzgw95McdXoU3WKL',
   currencyPair: 'btc_eth'
 };

 return shapeshiftJS.postSendAmount(params)
 .then(function(res) {
   return console.log(res);
 })
 .catch(function(res) {
    throw new Error(err);
  });
```