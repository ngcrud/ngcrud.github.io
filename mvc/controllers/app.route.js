var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "mvc/views/home.html",
        controller  : 'TestController'
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
    .otherwise({
        templateUrl : "mvc/views/pageNotFound.html",
        controller  : 'UserController'
    });
});