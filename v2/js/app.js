'use strict';

var app = angular.module('mainApp', ['ui.router']);
/*
Application's main module
Application made of "states"
*/
app.config(['$stateProvider',
function ($stateProvider) {

    $stateProvider
    .state('main', {
        url: '/',
        abstract: true,
        template: '<ui-view>'
    })
    .state('main.login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'pages/login.html'
    })
    .state('main.login.results', {
        url: '/results',
        controller: 'ResultsCtrl',
        templateUrl: 'pages/results.html'
    });

}]);
app.run([
    '$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.socket = io();
        console.log("app started");
        var timer = new Date().getTime();
        $rootScope.timer = timer;
        $rootScope.$state.go('main.login.results');
        // console.log("GO IN auth login");
        // var socket = io.connect('http://localhost:3000');
        // socket.on('news', function (data) {
        //     console.log(data);
        //     socket.emit('my other event', { my: 'data' });
        // });
    }
]);
