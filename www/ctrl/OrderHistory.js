function OrderHistory($scope,$rootScope,$interval,$timeout,$window,srv)
{
    $scope.Init = async function()
    {
        $scope.searchText = "";
        $scope.TotalSell = 0;
        $scope.TotalBuy = 0;
        $scope.TotalAmount = 0;

        $scope.TradesList = [];
        $scope.PrincesList = [];

        $scope.TbMainClick();
        await GetPrices();
    }
    async function GetTrades(pParam) 
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.TradesList = await srv.SocketEmit('trades',pParam);

                if($scope.TradesList.length > 0)
                {
                    for (let i = 0; i < $scope.TradesList.length; i++) 
                    {
                        $scope.TradesList[i].clock = new Date($scope.TradesList[i].time).toLocaleTimeString("tr-TR")
                        $scope.TradesList[i].date = new Date($scope.TradesList[i].time).toLocaleDateString("tr-TR")

                        if($scope.TradesList[i].isBuyer)
                        {
                            $scope.TradesList[i].type = 'BUY';
                            $scope.TotalBuy += parseFloat($scope.TradesList[i].quoteQty);
                        }
                        else
                        {
                            $scope.TradesList[i].type = 'SELL';
                            $scope.TotalSell += parseFloat($scope.TradesList[i].quoteQty);
                        }
                    }
                }

                $scope.TotalAmount = ($scope.TotalSell - $scope.TotalBuy).toFixed(2);

                srv.SafeApply($scope,async function()
                {
                    $scope.TradesList = $scope.TradesList;
                });
            } 
            catch (error) 
            {
                console.log(error)
            }
        
            resolve();
        });
    }
    async function GetPrices()
    {
        return new Promise(async resolve => 
        {
            try 
            {
                $scope.PrincesList = await srv.SocketEmit('prices');

                srv.SafeApply($scope,async function()
                {
                    $scope.PrincesList = $scope.PrincesList;
                });
            } 
            catch (error) 
            {
                console.log(error)
            }
     
            resolve();
        });
    }
    $scope.CoinClick = async function(pData)
    {
        $scope.TotalSell = 0;
        $scope.TotalBuy = 0;
        $scope.TotalAmount = 0;
        await GetTrades(pData);

        if($scope.TradesList.length > 0)
        {
            $scope.TbDetailClick();
        }
        else
        {
            alert("Seçmiş Olduğunuz Coine Ait Geçmiş Emir Bulunamadı.")
        }
    }
    $scope.TbMainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbDetail").removeClass('active');
    }
    $scope.TbDetailClick = function() 
    {
        $("#TbDetail").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnSourceClear = function() 
    {
        $scope.searchText = "";
    }
};