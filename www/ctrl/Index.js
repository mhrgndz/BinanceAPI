function Index($scope,$window,srv)
{
    $scope.Init = async function()
    {
        await srv.Connection();
    }
};