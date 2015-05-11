//TODO : changer le nom du module, même valeur que dans index.html
angular.module('clement', ['ngRoute', 'controllers', 'services', 'directives', 'filters'])
    .config(function ($routeProvider,$httpProvider) {
        $routeProvider.when('/', {controller:'homeController',templateUrl: 'home.html'})
            .when('/manage', {controller:'manageCtrl',templateUrl: 'manage.html'})
            .when('/words', {controller:'wordsController',templateUrl: 'words.html'})
            .when('/cv',{controller:'CvCtrl',templateUrl:'cv.html'})
            .when('/clem',{controller:'MainCtrl',templateUrl:'clement.html'})
            .when('/research',{controller:'ReCtrl',templateUrl:'research.html'})
            .when('/toeic', {controller:'toeicController', templateUrl:'toeic.html'})
            .when('/about',{templateUrl:'about.html'})
            .when('/error',{templateUrl:'error.html'})

            .otherwise({
                redirectTo: '/error'
            });
    })



/*Ajout des modules externes*/

angular.module('controllers', []);
angular.module('services', []);
angular.module('directives', []);
angular.module('filters', []);