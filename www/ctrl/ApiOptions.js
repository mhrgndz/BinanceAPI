function ApiOptions($scope,$rootScope,$interval,$timeout,$window,srv)
{
    $scope.Init = async function()
    {
        $scope.APIKEY = "";
        $scope.APISECRET = "";

        $scope.Config = {};
    }
    $scope.BtnConfigSave = function()
    {
        let FilePath = "";

        $scope.Config.APIKEY = $scope.APIKEY;
        $scope.Config.APISECRET = $scope.APIKEY;

        if(typeof process.env.APP_DIR_PATH != 'undefined')
        {
            FilePath = process.env.APP_DIR_PATH + "/../";
        }

        fs.writeFile(FilePath + "../../config.json",JSON.stringify($scope.Config), function(err) 
        {
            console.log(err)
        }); 
    }
    // process.on('uncaughtException', function(err) {
    //     console.log(err.stack);
    // });
};