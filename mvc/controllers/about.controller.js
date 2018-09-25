(function() {
	'use strict';
	angular.module('myApp').controller('AboutController',AboutController);

	AboutController.$inject = [ '$scope','$http' ];

	function AboutController($scope,$http) {
		$http.get('mvc/models/about.json').then(function(response) {
			console.log(response.data);
			$scope.stuff = response.data.array;
			$scope.welcomeMessage = response.data.welcomeMessage;
			$scope.headerMessage = response.data.headerMessage;
		});
    }
})();
