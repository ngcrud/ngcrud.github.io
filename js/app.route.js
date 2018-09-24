var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/employee", {
        templateUrl : "employee.html"
    })
    .when("/salary", {
        templateUrl : "salary.html"
    })
    .when("/user", {
        templateUrl : "user.html"
    })
    .otherwise({
        templateUrl : "pageNotFound.html"
    });
});