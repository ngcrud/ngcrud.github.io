var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "mvc/views/home.html",
        controller : 'HomeController'
    })
    .when("/blog", {
        templateUrl : "mvc/views/blog.html",
        controller  : 'BlogController'
    })
    .when("/employee", {
        templateUrl : "mvc/views/employee.html",
        controller  : 'EmployeeController'
    })
    .when("/salary", {
        templateUrl : "mvc/views/salary.html",
        controller  : 'UserController'
    })
    .when("/user", {
        templateUrl : "mvc/views/user.html",
        controller  : 'UserController'  
    })
    .when("/about", {
        templateUrl : "mvc/views/about.html",
        controller  : 'AboutController'  
    })
    .otherwise({
        templateUrl : "mvc/views/pageNotFound.html",
        controller  : 'HomeController'  
    });
});
/*
.otherwise({
        templateUrl : "mvc/views/pageNotFound.html",
        controller  : 'UserController'
    });
*/
