(function() {
	'use strict';
	angular.module('myApp').controller('BlogController',BlogController);

	BlogController.$inject = [ '$scope','$http' ];

	function BlogController($scope,$http) {
		$http.get('mvc/models/blogs.json').then(function(response) {
			$scope.headerMessage = response.data.headerMessage;
			$scope.welcomeMessage = response.data.welcomeMessage;
			$scope.authors = response.data.authors;
			$scope.categories = response.data.categories;
			$scope.blogs = response.data.blogs;
		});
    }
})();
