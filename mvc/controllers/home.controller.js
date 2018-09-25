(function() {
	'use strict';
	angular.module('myApp').controller('HomeController',HomeController);

	HomeController.$inject = [ '$scope' ];

	function HomeController($scope) {
		$scope.headerMessage = 'Welcome to NG CRUD';
		$scope.welcomeMessage = 'Welcome to AngularJS MVC';
    }
})();
