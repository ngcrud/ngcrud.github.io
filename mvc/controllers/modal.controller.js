(function() {
	'use strict';
	angular.module('myApp').controller('ModalController',ModalController);

	ModalController.$inject = [ '$scope' ];

	function ModalController($scope) {
		$scope.headerMessage = 'Welcome to NG CRUD';
		$scope.welcomeMessage = 'Welcome to AngularJS MVC';
    }
})();
/*
var app = angular.module('myApp', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);
app.controller('ModalController', function($scope) {});

'use strict';

angular.module('myApp').config(function($modalProvider) {
  angular.extend($modalProvider.defaults, {
    html: true
  });
}).controller('ModalController', function($scope, $modal) {
  $scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};

  // Controller usage example
  //
  function MyModalController($scope) {
    $scope.title = 'Some Title';
    $scope.content = 'Hello Modal<br />This is a multiline message from a controller!';
  }
  MyModalController.$inject = ['$scope'];
  var myModal = $modal({controller: MyModalController, templateUrl: 'modal/docs/modal.demo.tpl.html', show: false});
  $scope.showModal = function() {
    myModal.$promise.then(myModal.show);
  };
  $scope.hideModal = function() {
    myModal.$promise.then(myModal.hide);
  };

});
*/
