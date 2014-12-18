
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
            controller: 'SearchGlobalController',
        }).
        when('/testfile/details', {
            templateUrl: 'templates/testfile_details.html',
        }).
        when('/nav/testfiles', {
            templateUrl: 'templates/navigation_testfiles.html',
        }).
        when('/nav/beispiele', {
            templateUrl: 'templates/navigation_beispiele.html',
            controller: 'SearchGlobalController',
        }).		
        when('/user/profile', {
            templateUrl: 'templates/user_profile.html',
        }).
        when('/search/global', {
            templateUrl: 'templates/search_global.html',
        }).
        when('/login', {
            templateUrl: 'templates/login.html',
        }).
        otherwise({
            redirectTo: '/home'
        });
});