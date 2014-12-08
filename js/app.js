
var iid = angular.module('iidApp', [
    'ngRoute',
]);

iid.config(function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
        }).
        otherwise({
            redirectTo: '/home'
        });
});