(function() {
	'use strict';
	angular.module('myApp').controller('MenuController',MenuController);

	MenuController.$inject = [ '$scope','$location' ];

	function MenuController($scope,$location) {
		$scope.selectMe = function (event){
			$(event.target).addClass('active');
			alert($(event.target));
		 }
		 $scope.isActive = function (viewLocation) {
			var active = (viewLocation === $location.path());
			return active;
	   };
    }
})();
