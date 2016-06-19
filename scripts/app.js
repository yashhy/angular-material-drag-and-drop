angular.module('PersonalManager', ['ui.router',
							        'ngMaterial',
							        'ngAria',
							        'ngDragDrop'])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('landing', {
            url : '/landing',
            controller : 'LandingCtrl',
            templateUrl : '../views/landing.html'
        }).state('board', {
            url : '/{id}/board',
            controller : 'BoardCtrl',
            templateUrl : '../views/board.html'
        });

        $urlRouterProvider.otherwise('/landing');

    });


