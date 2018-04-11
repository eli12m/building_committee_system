var app = angular.module( "homeSystemApp", ["ngRoute"] );

app.config(function($routeProvider) {
    $routeProvider
    .when("/", { templateUrl : "landingPage.html" })
    .when("/messages", { templateUrl : "/app/messages/messages.html", controller : "messagesCtrl" })
    .when("/tenants", { templateUrl : "/app/Tenants/tenants.html", controller : "tenantsCtrl" })
    .when("/login", { templateUrl : "/app/login/login.html", controller : "loginCtrl" })
    .otherwise({redirectTo : "/"});
});