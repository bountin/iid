
var iid = angular.module('iidApp', [
    'ngRoute',

    'iidControllers'
]);

iid.config(function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
        }).
        when('/testfile/add', {
            templateUrl: 'templates/testfile_add.html',
            controller: 'TestfileAddController',
        }).
        otherwise({
            redirectTo: '/home'
        });
});