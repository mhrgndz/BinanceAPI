const Binance = require('node-binance-api');
const { CONNECTING } = require('ws');
const crypto = require( 'crypto' );
const request = require( 'request' );

const binance = new Binance().options({
  APIKEY: '7XXAeYornH4kKn47UUQsyaWWYzTpwlYoNXFx2EpbwdNzEtGqFcfXxeKg2qLZekm0',
  APISECRET: 'vpTugMK6kvOxlKLKGxEw0CMe5qAQZuyG6YLZ0yV15j7p5N9FdJ5Rgswl1vJZrhfQ'
});

let timestamp = new Date().getTime() + 0;
let query = "timestamp="+ timestamp +"&recvWindow=5000"
let signature = crypto.createHmac( 'sha256', 'vpTugMK6kvOxlKLKGxEw0CMe5qAQZuyG6YLZ0yV15j7p5N9FdJ5Rgswl1vJZrhfQ' ).update( query ).digest( 'hex' );

let rq = 
{
    //url: 'https://api.binance.com/sapi/v1/accountSnapshot?limit=5&type=SPOT&timestamp=' + timestamp +'&signature='+ signature,
    url: 'https://api.binance.com/api/v3/order?sembol=LTCBTC&timestamp=' + timestamp +'&signature='+ signature,
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

console.log(rq)

request(rq, function (error, response)
{ 
    console.log(response)
    
    // // for (let i = 0; i < response.toJSON().body.length; i++) 
    // // {
    // //     console.log(response.toJSON().body[i])        
    // // }
});

async function Deneme()
{
    //     let ticker = await binance.prices();
    //   //  console.info(`Price of BNB: ${ticker.BNBUSDT}`);

    //     binance.balance((error, balances) => {
    //     if ( error ) return console.error(error);
    //     console.info(balances);
    //    // console.info(balances.FRONT.available);
    // });

    // binance.trades("COTIUSDT", (error, trades, symbol) => 
    // {
    //     console.log(trades)
    //    // console.info(symbol+" trade history", trades);
    // });
    // binance.trades("COSUSDT", (error, trades, symbol) => 
    // {
    //     console.log(trades)
    //    // console.info(symbol+" trade history", trades);
    // });


    
    // binance.balance((error, balances) => 
    // {
    //     let deneme = "";
    //     for (let i = 0; i < CoinList.length; i++) 
    //     {
    //         console.log(balances)
    //    //     deneme = balances+CoinList[i]
    //     }

    //     //console.log(balances)

    //     // binance.bookTickers((error, ticker) => 
    //     // {
    //     //     console.info("bookTickers()", ticker);
    //     //     console.info("Price of BNB: ", ticker.BNBBTC);
    //     // });

    //     // console.log(balances.FRONT)
    //     // dizi.push(balances.FRONT + balances.FRONT.onOrder)
    //     // console.log(dizi)


    //     //console.info("balances()", balances);
    //    // console.info("ETH balance: ", balances.ETH.available);
    // });
    binance.balance((error, balances) => 
    {
        //console.log(balances)
    });

    // binance.orderStatus("COTIUSDT", "162621030", (error, orderStatus, symbol) => {
    // //console.info(symbol+" order status:", orderStatus);
    // });
    // binance.orderStatus("COTIUSDT", "162621799", (error, orderStatus, symbol) => {
    // console.info(symbol+" order status:", orderStatus);
    // });
    // binance.orderStatus("COTIUSDT", "163559783", (error, orderStatus, symbol) => {
    // console.info(symbol+" order status:", orderStatus);
    // });
}


function GetProductList(pCallBack)
{
    binance.balance((error, balances) => 
    {
        for (let i = 0; i < balances.length; i++) 
        {
            if(parseFloat(balances[i].free) > 0 || parseFloat(balances[i].locked) > 0)
            {
                pCallBack(balances[i])
            }
        }
    });
}
function RemainingInventories()
{
    GetProductList(function(pData)
    {
        pData.locked = parseFloat(pData.locked);
        pData.free = parseFloat(pData.free);

        if(pData.locked > 0)
        {
            console.log(pData.asset + " : " + pData.locked)
        }
        if(pData.free > 0)
        {
            console.log(pData.asset + " : " + pData.free)
        }
    });
}
Deneme();
//RemainingInventories();


let USDExhangeRate = 0;
async function GetUSDTTOTRY()
{
    return new Promise(async resolve => 
    {
        binance.prices('USDTTRY', (error, ticker) => 
        {
            USDExhangeRate = Object.values(ticker)[0];
        });
        resolve();
    });
}
async function GetProductUSD(pCoin,pAmount)
{
    return new Promise(async resolve => 
    {
        binance.prices(pCoin + 'USDT', (error, ticker) => 
        {
            if(typeof(ticker) != 'undefined')
            {
                resolve(Object.values(ticker)[0] * pAmount)
            }
            else
            {
                binance.prices(pCoin + 'BUSD', (error, ticker) => 
                {
                    if(typeof(ticker) !='undefined')
                    {
                        resolve(Object.values(ticker)[0] * pAmount)
                    }
                    else
                    {
                        resolve(pAmount)
                    }
                });
            }
        });
    });
}
function GetProductList()
{
    return new Promise(async resolve => 
    {
        binance.balance((error, balances) => 
        {
            resolve(balances);
        });
    });
}
async function RemainingInventories()
{
    return new Promise(async resolve => 
    {
        GetUSDTTOTRY()
        let Data = await GetProductList()
        let ProductList = []

        for (let i = 0; i < Data.length; i++) 
        {
            Data[i].locked = parseFloat(Data[i].locked);
            Data[i].free = parseFloat(Data[i].free);

            if(Data[i].free > 0 || Data[i].locked > 0)
            {
                let GetProductData = await GetProductUSD(Data[i].asset,(Data[i].locked + Data[i].free))

                if(typeof (GetProductData) !='undefined')
                {
                    ProductList.push(
                    {
                        "MEVCUTCOIN" :  Data[i].asset,
                        "MEVCUTMIKTAR" : (Data[i].locked + Data[i].free).toFixed(2),
                        "DOLARKARSILIGI" : GetProductData.toFixed(2),
                        "TLKARSILIGI" : (USDExhangeRate * GetProductData).toFixed(2)
                    });
                }
            }
        }
        resolve(ProductList);
    });
}