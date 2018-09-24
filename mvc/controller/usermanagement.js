
var app = angular.module('myApp', []);
app.controller('UserController', function ($scope) {
	$scope.firstRow = 15;
	$scope.rowLimit = 15;
	$scope.sortColumn = '+firstName';
	$scope.reverseSort = false;
	// $scope.getSortClass = 'arror-up';
	$scope.users = [ {
		firstName : "Jakir",
		lastName : "Hossain"
	}, {
		firstName : "Sharif",
		lastName : "Rahman"
	}, {
		firstName : "Jewel",
		lastName : "Hosen"
	} ];
	var localStorageUsers = localStorage.getItem("ngCRUDusers");
	if (localStorageUsers == null) {
		//localStorage.setItem("ngCRUDusers", $scope.users);
		localStorage.setItem("ngCRUDusers", JSON.stringify($scope.users));
	}else{
		console.log(localStorageUsers);
		var parsed = JSON.parse(localStorageUsers);
		//console.log(parsed);
		$scope.users = parsed;
	}
	

	// $scope.users = $scope.readCookie("users");

	// alert(inceptionNoteUser);
	$scope.addUser = function() {
		$scope.users.push($scope.user);
		$scope.user = {
			firstName : "",
			lastName : ""
		};
		$scope.createCookie("users", $scope.users, 340);
		localStorage.setItem("ngCRUDusers", JSON.stringify($scope.users));
		
		var localStorageUsers = localStorage.getItem("ngCRUDusers");		
		var parsed = JSON.parse(localStorageUsers);
		console.log(parsed);
		//$scope.users = parsed;
		
		var values = $scope.readCookie("users");
		// $scope.users.push(values);
		var stringify = JSON.stringify(values);
		// alert(values[0].firstName);
	};
	$scope.sortData = function(column) {
		$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort
				: false;
		$scope.sortColumn = column;
	};
	$scope.getSortClass = function(column) {
		if (($scope.sortColumn == column)) {
			return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
		}
		return '';
	};
	$scope.editUser = function(user) {
		$scope.user = {
			firstName : user.firstName,
			lastName : user.lastName
		};
		$scope.createCookie("users", $scope.users, 340);
		localStorage.setItem("ngCRUDusers", JSON.stringify($scope.users));
	};
	$scope.deleteUser = function(user) {
		if (confirm("Are you sure?")) {
			$scope.users.splice($scope.users.indexOf(user), 1);
		}
		$scope.createCookie("users", $scope.users, 340);
		localStorage.setItem("ngCRUDusers", JSON.stringify($scope.users));
	};
	$scope.createCookie = function(name, value, days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	};
	$scope.readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length, c.length);
		}
		return null;
	};
	$scope.eraseCookie = function(name) {
		createCookie(name, "", -1);
	};

});
