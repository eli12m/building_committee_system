var app = angular.module( "homeSystemApp", ["ngRoute"] );

app.config(function($routeProvider) {
    $routeProvider
    .when("/", { templateUrl : "main.html" })
    .when("/messages", { templateUrl : "/app/messages/messages.html", controller : "messagesCtrl" })
    .when("/tenants", { templateUrl : "/app/Tenants/tenants.html", controller : "tenantsCtrl" })
    .otherwise({redirectTo : "/"});
});