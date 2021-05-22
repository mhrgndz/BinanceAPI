function HomePage($scope,$rootScope,$interval,$timeout,$window,srv)
{
    var promise;

    $scope.Init = async function()
    {
        $scope.AmountUSDT = 0;
        $scope.AmountTL = 0;
        $rootScope.deneme = 1;

        $scope.BalanceList = [];
        $scope.PrincesList = [];
        $scope.AvailableCoinList = [];

        $scope.StopInterval(); 
        promise = $interval(await GetPrincesList, 1000);
    }
    $scope.StopInterval = function() 
    {
        $interval.cancel(promise);
    };
    async function GetPrincesList() 
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.PrincesList = await srv.SocketEmit('prices',null);
                await GetCoinList();

                if($scope.AvailableCoinList.length > 0)
                {
                    for (let i = 0; i < $scope.AvailableCoinList.length; i++) 
                    {   
                        for (let x = 0; x < $scope.PrincesList.length; x++) 
                        {
                            if($scope.AvailableCoinList[i].asset + 'USDT' == $scope.PrincesList[x].symbol)
                            {
                                $scope.AvailableCoinList[i].USDTRETURN = $scope.PrincesList[x].price;
                                $scope.AvailableCoinList[i].USDTTOTAL = (parseFloat($scope.AvailableCoinList[i].total) * parseFloat($scope.PrincesList[x].price)).toFixed(2);
                            }
                            if($scope.AvailableCoinList[i].asset == 'USDT')
                            {
                                $scope.AvailableCoinList[i].USDTRETURN = 0;
                                $scope.AvailableCoinList[i].USDTTOTAL = (parseFloat($scope.AvailableCoinList[i].free) + parseFloat($scope.AvailableCoinList[i].locked)).toFixed(2)
                            }
                        }
                    }
                    $scope.AmountUSDT = 0;

                    for (let i = 0; i < $scope.AvailableCoinList.length; i++) 
                    {
                        $scope.AmountUSDT += parseFloat($scope.AvailableCoinList[i].USDTTOTAL);
                    }
                    $scope.AmountTL = parseFloat((await srv.SocketEmit('prices','USDTTRY')).price) * $scope.AmountUSDT
            
                    srv.SafeApply($scope,async function()
                    {
                        $scope.AvailableCoinList = $scope.AvailableCoinList;
                    });
                }
            } 
            catch (error) 
            {
                console.log(error)
            }
            resolve();
        });
    }
    async function GetCoinList()
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.BalanceList = await srv.SocketEmit('balance','');

                if($scope.BalanceList.length > 0)
                {
                    for (let i = 0; i < $scope.BalanceList.length; i++) 
                    {
                        $scope.BalanceList[i].total = (parseFloat($scope.BalanceList[i].free) + parseFloat($scope.BalanceList[i].locked)).toFixed(8);
                    }

                    $scope.AvailableCoinList = $scope.BalanceList.filter(x => parseFloat(x.total) > 0);
                }
            } 
            catch (error) 
            {
                console.log(error)
            }
     
            resolve();
        });
    }
    $scope.$on('$locationChangeStart', function( event ) 
    {
        $scope.StopInterval = function() 
        {
            $interval.cancel(promise);
        };
        $scope.$on('$destroy', function() 
        {
            $scope.StopInterval();
        });
    });
};