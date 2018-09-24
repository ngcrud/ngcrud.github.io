var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/home.html",
        controller  : 'UserController'
    })
    .when("/employee", {
        templateUrl : "pages/employee.html",
        controller  : 'EmployeeController'
    })
    .when("/salary", {
        templateUrl : "pages/salary.html",
        controller  : 'UserController'
    })
    .when("/user", {
        templateUrl : "pages/user.html",
        controller  : 'UserController'
    })
    .otherwise({
        templateUrl : "pages/pageNotFound.html",
        controller  : 'UserController'
    });
});