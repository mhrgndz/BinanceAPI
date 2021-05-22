const Binance = require('node-binance-api');
const crypto = require( 'crypto' );
const request = require( 'request' );

const binance = new Binance().options({
  APIKEY: '7XXAeYornH4kKn47UUQsyaWWYzTpwlYoNXFx2EpbwdNzEtGqFcfXxeKg2qLZekm0',
  APISECRET: 'vpTugMK6kvOxlKLKGxEw0CMe5qAQZuyG6YLZ0yV15j7p5N9FdJ5Rgswl1vJZrhfQ'
});

async function Deneme()
{
  binance.prices(pParam, (error, ticker) => 
    {
        console.log(ticker);
    });
}



Deneme();
