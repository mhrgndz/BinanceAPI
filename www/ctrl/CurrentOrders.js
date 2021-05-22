function CurrentOrders($scope,$rootScope,$interval,$timeout,$window,srv)
{
    $scope.Init = async function()
    {
        $scope.OpenOrdersList = [];
        $scope.PrincesList = [];
        
        await GetOpenOrders();
    }
    async function GetOpenOrders()
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.OpenOrdersList = await srv.SocketEmit('openOrders');
                $scope.PrincesList = await srv.SocketEmit('prices');

                if($scope.OpenOrdersList.length > 0)
                {
                    for (let i = 0; i < $scope.OpenOrdersList.length; i++) 
                    {
                        $scope.OpenOrdersList[i].clock = new Date($scope.OpenOrdersList[i].time).toLocaleTimeString("tr-TR")
                        $scope.OpenOrdersList[i].date = new Date($scope.OpenOrdersList[i].time).toLocaleDateString("tr-TR")
                        $scope.OpenOrdersList[i].Amount = parseFloat($scope.OpenOrdersList[i].price * $scope.OpenOrdersList[i].origQty).toFixed(2);
                        $scope.OpenOrdersList[i].USDT = parseFloat(($scope.PrincesList.filter(x => x.symbol == $scope.OpenOrdersList[i].symbol)[0].price)).toFixed(4);
                    }
                }

                srv.SafeApply($scope,async function()
                {
                    $scope.OpenOrdersList = $scope.OpenOrdersList;
                });
            } 
            catch (error) 
            {
                console.log(error)
            }
     
            resolve();
        });
    }
};