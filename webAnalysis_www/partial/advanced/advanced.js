angular.module('www').controller('AdvancedCtrl',['$scope','helpers',function($scope, helpers){
	$scope.searchText= '';
    $scope.viewCleanButton = false;
     $scope.error = 'Unable to fetch the url - Invalid URL';
     $scope.tableData ={
        uri: '', 
        title: '', 
        htmlVersion : '', 
        headings: {}, 
        links: [], 
        linksWithStatus: [],
        loginForm: false,
        host: ''
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
     $scope.linksLenth = 0;
     updateTable = function(err, resp){
     	var linkType = '', index = null;
     	if(err) {
     		index = err.index;
     		link = $scope.tableData.links[index];
     		linkType = link.type;
     		link.accessible = false;
     	}
     	else{
     		index = resp.index;
     		link = $scope.tableData.links[index];
     		linkType = resp.type;
     		link.accessible = true;
     	}
        var linkTypeIndex = 1;
 		if(linkType === 'external') {
            linkTypeIndex = 0;
        }
        $scope.tableData.linksWithStatus[linkTypeIndex].links.push(link);
        if(link.accessible) {
            $scope.tableData.linksWithStatus[linkTypeIndex].accessible ++;
        }
        else {
            $scope.tableData.linksWithStatus[linkTypeIndex].notAccessible ++;
        }
 		$scope.tableData.links[index] = null;
 		$scope.linksLenth --;
     }
    $scope.search = function() {
    	if(!$scope.showLoader) {
	        var searchText = $scope.searchText;    
	        $scope.showLoader=true;
	        $scope.errorCont=false;
	        $scope.showTable=false;
	        helpers.getAnalysisDataWithLinks(searchText, function(resp){
	            if(resp.type == 'Error') {
	                $scope.showLoader=false;
	                $scope.errorCont=true;
	            }
	            else {
	                $scope.tableData = resp.response;
	                $scope.tableData.linksWithStatus = [{type: 'External', accessible: 0, notAccessible:0, links: []},{type: 'Internal', accessible:0, notAccessible:0, links: []}];
	                $scope.linksLenth = $scope.tableData.links.length;
	                $scope.tableData.links = $scope.tableData.links.map(function(link, index){
	                	helpers.checkValidLink(link.link, index, $scope.tableData.host, function(resp){
	                		if(resp.type === 'Error') {
	                			updateTable(resp);
	                		}
	                		else {
	                			updateTable(null, resp.response);
	                		}
	                	});
	                	link.index = index;
	            		return link;	
	                });
	                $scope.showLoader=false;
	                $scope.showTable=true;

	            }
	         });
	    }
    };

}]);