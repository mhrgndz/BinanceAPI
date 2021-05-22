const Binance = require('node-binance-api');
const crypto = require( 'crypto' );
const request = require( 'request' );

let timestamp = new Date().getTime() + 0;
let query = "timestamp="+ timestamp +"&recvWindow=5000"
let signature = crypto.createHmac( 'sha256', 'vpTugMK6kvOxlKLKGxEw0CMe5qAQZuyG6YLZ0yV15j7p5N9FdJ5Rgswl1vJZrhfQ' ).update( query ).digest( 'hex' );

let rq = 
{
    url: 'https://api.binance.com/api/v3/myTrades?timestamp=' + timestamp +'&signature='+ signature,
    qs: { timestamp: timestamp, recvWindow: 5000 },
    method: 'GET',
    family: false,
    localAddress: false,
    timeout: 5000,
    forever: true,
    headers: 
    {
      'User-Agent': 'Mozilla/4.0 (compatible; Node Binance API)',
      'Content-type': 'application/x-www-form-urlencoded',
      'X-MBX-APIKEY': '7XXAeYornH4kKn47UUQsyaWWYzTpwlYoNXFx2EpbwdNzEtGqFcfXxeKg2qLZekm0'
    }
}


request(rq, function (error, response)
{ 
    console.log(response.body)
    
    // // for (let i = 0; i < response.toJSON().body.length; i++) 
    // // {
    // //     console.log(response.toJSON().body[i])        
    // // }
});