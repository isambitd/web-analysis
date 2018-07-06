angular.module('www').factory('helpers',['$http',function($http) {

    var helpers = {};
    var serverPath = "http://localhost:7527";

    helpers.getCompleteAnalysisData = function(uri, callback) {
    	 $http({
            method: 'post',
            url: serverPath + '/api/analysis/all',
            dataType: 'json',
            contentType: "application/json",
            data: {uri: uri}
        }).success(function(response) {
        	callback(response);
        });
    }

    helpers.getAnalysisDataWithLinks = function(uri, callback) {
    	 $http({
            method: 'post',
            url: serverPath + '/api/analysis/links',
            dataType: 'json',
            contentType: "application/json",
            data: {uri: uri}
        }).success(function(response) {
        	callback(response);
        });
    }

    helpers.checkValidLink = function(uri, index, host, callback) {
    	 $http({
            method: 'post',
            url: serverPath + '/api/analysis/validation',
            dataType: 'json',
            contentType: "application/json",
            data: {uri: uri, index: index, host: host}
        }).success(function(response) {
        	callback(response);
        });
    }

    return helpers;
}]);