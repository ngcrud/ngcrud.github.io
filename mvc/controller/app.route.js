var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "mvc/view/home.html",
        controller  : 'UserController'
    })
    .when("/employee", {
        templateUrl : "mvc/view/employee.html",
        controller  : 'EmployeeController'
    })
    .when("/salary", {
        templateUrl : "mvc/view/salary.html",
        controller  : 'UserController'
    })
    .when("/user", {
        templateUrl : "mvc/view/user.html",
        controller  : 'UserController'
    })
    .otherwise({
        templateUrl : "mvc/view/pageNotFound.html",
        controller  : 'UserController'
    });
});