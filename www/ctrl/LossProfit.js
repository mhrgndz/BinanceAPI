function LossProfit($scope,$window,srv)
{
    $scope.Init = async function()
    {
        $scope.TradesList = [];

        await GetOpenOrders();
    }
    async function GetOpenOrders()
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.TradesList = await srv.SocketEmit('trades','ONTUSDT');

                console.log($scope.TradesList)
            } 
            catch (error) 
            {
                console.log(error)
            }
     
            resolve();
        });
    }
};