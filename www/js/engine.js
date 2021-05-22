let fs = require('fs');
var express = require('express');
const Binance = require('node-binance-api');
var config = require('../../config.json');
const binance = new Binance().options({APIKEY: config.APIKEY,APISECRET: config.APISECRET});

function engine(io)
{    
    io.on('connection', function(socket) 
    {
        socket.on('balance',async function(pParam,pFn)
        {
            binance.balance((error, balances) => 
            {
                pFn(balances);
            });
        });
        socket.on('prices',async function(pParam,pFn)
        {
            binance.prices(pParam, (error, ticker) => 
            {
                pFn(ticker);
            });
        });
        socket.on('futuresPrices',async function(pParam,pFn)
        {
            pFn(await binance.futuresPrices());
        });
        socket.on('openOrders',async function(pParam,pFn) //Tüm açık siparişlerin listesini alın
        {
            binance.openOrders(false, (error, openOrders) => 
            {
                pFn(openOrders);
            });
        });
        socket.on('trades',async function(pParam,pFn) //Ticaret Geçmişinizi alın
        {
            binance.trades(pParam, (error, trades, symbol) => 
            {
                pFn(trades);
            });
        });
        socket.on('allOrders',async function(pParam,pFn) //Tüm hesap siparişlerini alın; aktif, iptal edilmiş veya doldurulmuş.
        {
            binance.allOrders(pParam, (error, orders, symbol) => 
            {
                pFn(orders);
            });
        });
        socket.on('depositAddress',async function(pParam,pFn) //Para Yatırma Adresi Al
        {
            binance.depositAddress(pParam, (error, response) => 
            {
                pFn(response);
            });
        });
        socket.on('depositHistory',async function(pParam,pFn) //Tüm Para Yatırma Geçmişini Alın
        {
            binance.depositHistory((error, response) => 
            {
                pFn(response);
            });
        });
        socket.on('withdrawHistory',async function(pParam,pFn) //Tüm Para Çekme Geçmişini Alın
        {
            binance.withdrawHistory((error, response) => 
            {
                pFn(response);
            });
        });
    });
}

module.exports = engine;