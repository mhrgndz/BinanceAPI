var app = angular.module("app", 
[
    'ngRoute',
    'app.controller',
    'app.srv'
]);
app.config(function($routeProvider) 
{
    $routeProvider
    .when("/", {
        templateUrl : "view/homepage.html"
    })
    .when("/loss-profit", 
    {
        templateUrl : "view/loss-profit.html"
    })
    .when("/HomePage", 
    {
        templateUrl : "view/homepage.html"
    })
    .when("/CurrentOrders", 
    {
        templateUrl : "view/CurrentOrders.html"
    })
    .when("/OrderHistory", 
    {
        templateUrl : "view/OrderHistory.html"
    })
    .when("/ApiOptions", 
    {
        templateUrl : "view/ApiOptions.html"
    })
});