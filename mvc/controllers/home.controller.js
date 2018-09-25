(function() {
	'use strict';
	angular.module('myApp').controller('HomeController',HomeController);

	HomeController.$inject = [ '$scope' ];

	function HomeController($scope) {
		$scope.welcomeMessage = 'Welcome to AngularJS MVC';
    }
})();
