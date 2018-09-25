(function() {
	'use strict';
	angular.module('myApp').controller('ContactController',ContactController);

	ContactController.$inject = [ '$scope' ];

	function ContactController($scope) {
		$scope.welcomeMessage = 'Welcome to Contact Page';
    }
})();
