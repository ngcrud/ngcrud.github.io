var app = angular.module("myApp", ["ngRoute"]);

app.run(['$rootScope','$templateCache',function($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function() {
       $templateCache.removeAll();
    });
 }]);
 /*app.run(['$rootScope','$templateCache', 'locationHistoryService', function($rootScope,$location, locationHistoryService){
    $rootScope.$on('$routeChangeStart', function() {
        $templateCache.removeAll();
     });
    $rootScope.$on('$locationChangeSuccess', function(e, newLocation, oldLocation){
        locationHistoryService.store(oldLocation);
    });
}]);*/
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
    .when("/contact", {
        templateUrl : "mvc/views/contact.html",
        controller  : 'ContactController'  
    })
    .when("/modal", {
        templateUrl : "mvc/views/modal.html",
        controller  : 'ModalController'  
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
