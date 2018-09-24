var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller  : 'UserController'
    })
    .when("/employee", {
        templateUrl : "employee.html",
        controller  : 'EmployeeController'
    })
    .when("/salary", {
        templateUrl : "salary.html",
        controller  : 'UserController'
    })
    .when("/user", {
        templateUrl : "user.html",
        controller  : 'UserController'
    })
    .otherwise({
        templateUrl : "pageNotFound.html",
        controller  : 'UserController'
    });
});