//TODO : changer le nom du module, même valeur que dans index.html
angular.module('clement', ['ngRoute', 'controllers', 'services', 'directives', 'filters'])
    .config(function ($routeProvider,$httpProvider) {
        $routeProvider.when('/', {templateUrl: 'home.html'})
            .when('/manage', {templateUrl: 'manage.html'})
            .when('/error', {templateUrl: 'error.html'})
            .when('/words', {controller: 'wordsController', templateUrl: 'words.html'})
            .when('/cv',{templateUrl:'cv.html'})
            .when('/clem',{templateUrl:'clement.html'})
            .otherwise({
                redirectTo: '/error'
            });
    })



/*Ajout des modules externes*/

angular.module('controllers', []);
angular.module('services', []);
angular.module('directives', []);
angular.module('filters', []);