
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
        when('/testfile/details', {
            templateUrl: 'templates/testfile_details.html',
        }).
        when('/nav/testfiles', {
            templateUrl: 'templates/navigation_testfiles.html',
        }).
        when('/user/profile', {
            templateUrl: 'templates/user_profile.html',
        }).
        otherwise({
            redirectTo: '/home'
        });
});