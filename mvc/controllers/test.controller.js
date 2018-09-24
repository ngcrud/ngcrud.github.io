(function() {
	'use strict';
	angular.module('myApp').controller('TestController',
    TestController);

	TestController.$inject = [ '$http' ];

	function TestController($http, $resource, $scope, fileUpload) {
		var http = $http;
		var vm = this;
		alert();
    }
})();
