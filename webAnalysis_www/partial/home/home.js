angular.module('www').controller('HomeCtrl', ['$scope', 'helpers', function($scope, helpers) {
    $scope.searchText= '';
    $scope.viewCleanButton = false;
     $scope.error = 'Unable to fetch the url - Invalid URL';
     $scope.tableData ={
        uri: '', 
        title: '', 
        htmlVersion : '', 
        headings: {}, 
        links: [], 
        loginForm: false
     };
     $scope.cleanSearchText = function() {
        $scope.searchText = '';
        $scope.viewCleanButton = false;
     }
     $scope.$watch('searchText', function(n){
        if(n.length) {
            $scope.viewCleanButton = true;
        }
     });
    $scope.search = function() {
        if(!$scope.showLoader) {
            var searchText = $scope.searchText;    
            $scope.showLoader=true;
            $scope.errorCont=false;
            $scope.showTable=false;
            helpers.getCompleteAnalysisData(searchText, function(resp){
                if(resp.type == 'Error') {
                    $scope.showLoader=false;
                    $scope.errorCont=true;
                }
                else {
                    $scope.tableData = resp.response;
                    $scope.tableData.links.map(function(x){
                        x.accessible = 0;
                        x.notAccessible = 0;
                        return x;
                    });
                    var i= 0;
                    while(i < 2) {
                        $scope.tableData.links[i].accessible = $scope.tableData.links[0].links.filter(function(x){
                            if(x.accessible) {return true;}
                            return false;
                        }).length;
                        $scope.tableData.links[i].notAccessible = $scope.tableData.links[i].links.length - $scope.tableData.links[i].accessible;
                        i++;
                    }
                    $scope.showLoader=false;
                    $scope.showTable=true;

                }
             });
        }
    };
}]);