
function BlogController($scope) {
	$scope.firstRow = 15;
	$scope.rowLimit = 15;
	$scope.sortColumn = '+headline';
	$scope.reverseSort = false;
	// $scope.getSortClass = 'arror-up';
	$scope.blogList = [ {
		headline : "A new blog.",
		blogDetails : "Hello World"
	}];
	var localStorageUsers = localStorage.getItem("ngCRUDblogList");
	if (localStorageUsers == null) {
		//localStorage.setItem("ngCRUDblogList", $scope.blogList);
		localStorage.setItem("ngCRUDblogList", JSON.stringify($scope.blogList));
	}else{
		console.log(localStorageUsers);
		var parsed = JSON.parse(localStorageUsers);
		//console.log(parsed);
		$scope.blogList = parsed;
	}
	

	// $scope.blogList = $scope.readCookie("blogList");

	// alert(inceptionNoteUser);
	$scope.addBlog = function() {
		$scope.blogList.push($scope.blog);
		$scope.blog = {
			headline : "",
			blogDetails : ""
		};
		$scope.createCookie("blogList", $scope.blogList, 340);
		localStorage.setItem("ngCRUDblogList", JSON.stringify($scope.blogList));
		
		var localStorageUsers = localStorage.getItem("ngCRUDblogList");		
		var parsed = JSON.parse(localStorageUsers);
		console.log(parsed);
		//$scope.blogList = parsed;
		
		var values = $scope.readCookie("blogList");
		// $scope.blogList.push(values);
		var stringify = JSON.stringify(values);
		// alert(values[0].headline);
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
	$scope.editBlog = function(user) {
		$scope.blog = {
			headline : user.headline,
			blogDetails : user.blogDetails
		};
		$scope.createCookie("blogList", $scope.blogList, 340);
		localStorage.setItem("ngCRUDblogList", JSON.stringify($scope.blogList));
	};
	$scope.deleteBlog = function(user) {
		if (confirm("Are you sure?")) {
			$scope.blogList.splice($scope.blogList.indexOf(user), 1);
		}
		$scope.createCookie("blogList", $scope.blogList, 340);
		localStorage.setItem("ngCRUDblogList", JSON.stringify($scope.blogList));
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

}
