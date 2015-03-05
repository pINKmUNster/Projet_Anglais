angular.module('vNumber', ['ngSanitize', 'ngRoute',  'controllers', 'services', 'factories','directives', 'filters','pascalprecht.translate','ui.bootstrap'])

    .config(['$routeProvider','$httpProvider', function ($routeProvider,$httpProvider) {
        $routeProvider
            .when('/',
            {controller: 'homeCtrl',
                templateUrl: 'home.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/login',
            {controller: 'loginCtrl',
                templateUrl: 'login.html',
                resolve: {'me': function (mymefactory) {
                    return mymefactory.myme();
                }}
            })
            .when('/home',
            {controller: 'homeCtrl',
                templateUrl: 'home.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    }
                    ,
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/allvnumbers',
            {controller: 'allvNumbersCtrl',
                templateUrl: 'allvnumbers.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    },
                    'vNumbers': function (mymefactory) {
                        return mymefactory.vNumbers();
                    }
                }
            })
            .when('/allusers',
            {controller: 'allUsersCtrl',
                templateUrl: 'allusers.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/poolnumbers',
            {controller: 'poolNumbersCtrl',
                templateUrl: 'poolnumbers.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/newuser',
            {controller: 'newUserCtrl',
                templateUrl: 'newuser.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/error', {templateUrl: 'error.html'})
            .when('/voiceservice',
            {controller: 'voiceServiceCtrl',
                templateUrl: 'voiceservice.html',
                resolve: {
                    'me': function (mymefactory) {
                        return mymefactory.myme();
                    },
                    'voiceService': function (mymefactory) {
                        return mymefactory.voiceService();
                    }
                }
            })
            .when('/logout', {controller: 'logoutCtrl',templateUrl: 'logout.html'})
            .otherwise({
                redirectTo: '/error'
            });
        // interceptors to manipulate http request and response
        $httpProvider.interceptors.push(function ($q, $window, $location) {
            return {
                request: function (config) {
                    return config;
                },
                'responseError': function (rejection) {
                    if (rejection.status === 401) {
//                        $location.path('/login')
                    }
                    return $q.reject(rejection);
                }
            }
        });
    }])

    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en_EN', {
            'VNUMBER_ADMIN': 'Alias Number Administration',
            'LOGIN': 'Login',
            'LOGOUT': 'Logout',
            'EMAIL': 'Email',
            'PASSWORD': 'Password',
            'ACCESS_FORBIDDEN': 'Access forbidden',
            'ERROR': 'Error',
            'AN_ERROR_HAS_OCCURRED': 'An error has occurred',
            'SUCCESS': 'Success',
            'THE_OPERATION_WAS_SUCCESSFUL': 'The operation was successful',
            'SERVICE_ID': 'Service id',
            'VNUMBER': 'Virtual number',
            'CAPACITIES': 'Capacities',
            'INVOICING_PLAN': 'Invoicing plan',
            'EXPIRATION_DATE': 'Expiration date',
            'HOME': 'Home',
            'SEARCH_USER': 'Search a user...',
            'LASTNAME': 'Last name',
            'PRIVATE_NUMBER': 'Private number',
            'PRIVATE_NUMBER_PLACEHOLDER': 'Private number +336...',
            'NUMBER_TYPE': 'Number type',
            'MOBILE': 'Mobile',
            'FIXED': 'Fixed',
            'PREFIX': 'Prefix',
            'SERVICES': 'Services',
            'BOOKING_PREFIX': 'Country code',
            'BOOKING_PREFIX_PLACEHOLDER': 'country code',
            'BOOKING_DURATION': 'Booking duration',
            'BOOKING_DURATION_PLACEHOLDER': 'Duration in minute',
            'POOL_SIZE': 'Number of virtual number',
            'POOL_SIZE_PLACEHOLDER': 'How many virtual number to book',
            'SAVE': 'Save',
            'CANCEL': 'Cancel',
            'FIRSTNAME': 'First name',
            'GENDER': 'Gender',
            'GENDER_MALE': 'Male',
            'GENDER_FEMALE': 'Female',
            'DATE_OF_BIRTH': 'Date of birth',
            'CONTRACT': 'Contract',
            'CONTRACT_APPRENTICE': 'Apprentice',
            'CONTRACT_TRAINEE': 'Trainee',
            'CONTRACT_FIXED_TERM': 'Fixed-term',
            'CONTRACT_INTERIM': 'Interim',
            'CONTRACT_FULL_TIME': 'Full-time',
            'VALIDITY_DURATION': 'Validity duration',
            'VALIDITY_DURATION_PLACEHOLDER': 'Duration in minute',
            'PIN': 'PIN',
            'PIN_PLACEHOLDER': 'PIN 4 digits',
            'BYE': 'Bye!!!',
            'CONFIRM_DELETION':'do you confirm the definitive deletion ?',
            'LOADING': 'Loading...',
            'VOICE_SERVICE_CREATED' : 'voice service created',
            'VOICE_SERVICE_MODIFIED' : 'voice service modified',
            'VOICE_SERVICE_DELETED' : 'all voice services have been deleted',
            'DELETE_VOICE_SERVICE_CONFIRMATION': 'Do you confirm the definitive deletion of all voice services?',
            'EMPLOYEE_ADDED' : 'employee added',
            'NO_EMPLOYEE_DECLARED' : 'no declared employee in the database',
            'BTN_LANGUAGE_LABEL': 'Français',
            'BTN_TOOLTIP_BOOK': 'Book Alias Numbers',
            'BTN_TOOLTIP_LIST_BOOK': 'List booked Alias Numbers',
            'BTN_TOOLTIP_EMPLOYEE': 'Declare employee',
            'BTN_TOOLTIP_LIST_EMPLOYEE': 'List declared employees',
            'BTN_TOOLTIP_REMOVE': 'Remove all Voice Services',
            'BTN_TOOLTIP_VOICE_SERVICE': 'Manage voice services',
            'LANGUAGE':"Language",
            'VOICE':"Voice",
            'MESSAGE':"Vocal message",
            'ERR001_INV_EMAIL_PASS':'invalid mail or password',
            'ERR002_NOT_AUTHORIZED':'not authorized',
            'ERR003_LOGOUT':'error while logout',
            'ERR004_VNUMBER_ADDED':' alias number(s) added',
            'ERR005_NO_VOICE_SERVICE':'no voice service !!!',
            'ERR006_NO_TOKEN':'unable to get a valid token. Check your Orange Partner access',
            'ERR007_NO_BOOKED_ALIAS_NUMBER':'no booked Alias Number !!!',
            'ERR008_DB_ERROR':'Number booked but not save in the database',
            'ERR24':'Invalid body field: Wrong values: [...]',
            'ERR1100':"The action can't be performed because the service is in use",
            'ERR1101':"The order can't be performed: No (or not enough) matching numbers have been found",
            'ERR1102':"A context already exists for this private number"
        });
        $translateProvider.translations('fr_FR', {
            'VNUMBER_ADMIN': 'Administration Alias Number',
            'LOGIN': 'Se connecter',
            'LOGOUT': 'Se déconnecter',
            'EMAIL': 'Email',
            'PASSWORD': 'Mot de passe',
            'ACCESS_FORBIDDEN': 'Accès interdit',
            'ERROR': 'Erreur',
            'AN_ERROR_HAS_OCCURRED': 'Une erreur s\'est produite',
            'SUCCESS': 'Succès',
            'THE_OPERATION_WAS_SUCCESSFUL': "L'opération s'est déroulée avec succès",
            'SERVICE_ID': 'Identifiant',
            'VNUMBER': 'Numéro virtuel',
            'CAPACITIES': 'Capacités',
            'INVOICING_PLAN': 'Facturation',
            'EXPIRATION_DATE': "Date d'expiration",
            'HOME': 'Accueil',
            'SEARCH_USER': 'Rechercher un utilsateur...',
            'LASTNAME': 'Nom',
            'PRIVATE_NUMBER': 'Numéro privé',
            'PRIVATE_NUMBER_PLACEHOLDER': 'Numéro privé +336...',
            'NUMBER_TYPE': 'Type de numéro',
            'MOBILE': 'Mobile',
            'FIXED': 'Fixe',
            'PREFIX': 'Préfixe',
            'SERVICES': 'Services',
            'BOOKING_PREFIX': 'Indicatif',
            'BOOKING_PREFIX_PLACEHOLDER': 'indicatif du pays',
            'BOOKING_DURATION': 'Durée de réservation',
            'BOOKING_DURATION_PLACEHOLDER': 'Durée en minute',
            'POOL_SIZE': 'Nombre de numéro virtuel',
            'POOL_SIZE_PLACEHOLDER': 'Combien de numéro virtuel',
            'SAVE': 'Enregistrer',
            'CANCEL': 'Annuler',
            'FIRSTNAME': 'Prénom',
            'GENDER': 'Genre',
            'GENDER_MALE': 'Homme',
            'GENDER_FEMALE': 'Femme',
            'DATE_OF_BIRTH': 'Date de naissance',
            'CONTRACT': 'Contrat',
            'CONTRACT_APPRENTICE': 'Apprenti',
            'CONTRACT_TRAINEE': 'Stagiaire',
            'CONTRACT_FIXED_TERM': 'CDD',
            'CONTRACT_INTERIM': 'Intérimaire',
            'CONTRACT_FULL_TIME': 'CDI',
            'VALIDITY_DURATION': 'Durée de validité',
            'VALIDITY_DURATION_PLACEHOLDER': 'Durée en minute',
            'PIN': 'Code PIN',
            'PIN_PLACEHOLDER': 'Code PIN 4 chiffres',
            'BYE': 'Au revoir!!!',
            'CONFIRM_DELETION':'confirmez-vous la suppression de tous les services vocaux ?',
            'LOADING': 'Chargement en cours...',
            'VOICE_SERVICE_CREATED' : 'service vocal créé',
            'VOICE_SERVICE_MODIFIED' : 'service vocal modifié',
            'VOICE_SERVICE_DELETED' : 'tous les services vocaux ont été supprimés',
            'DELETE_VOICE_SERVICE_CONFIRMATION': 'Confirmez-vous la suppression de tous les services ?',
            'EMPLOYEE_ADDED' : 'employé ajouté',
            'NO_EMPLOYEE_DECLARED' : 'Aucun employé enregistré dans la base de données',
            'BTN_LANGUAGE_LABEL': 'English',
            'BTN_TOOLTIP_BOOK': 'Réserve des Alias Numbers',
            'BTN_TOOLTIP_LIST_BOOK': 'Liste les Alias Numbers réservés',
            'BTN_TOOLTIP_EMPLOYEE': 'Déclare des employés',
            'BTN_TOOLTIP_LIST_EMPLOYEE': 'Liste les employés déclarés',
            'BTN_TOOLTIP_REMOVE': 'Supprime tous les services vocaux',
            'BTN_TOOLTIP_VOICE_SERVICE': "gestion des services vocaux",
            'LANGUAGE':"Langage",
            'VOICE':"Voie",
            'MESSAGE':"Message vocal",
            'ERR001_INV_EMAIL_PASS':'mauvais mail ou mot de passe',
            'ERR002_NOT_AUTHORIZED':'accès interdit',
            'ERR003_LOGOUT':'erreur lors de la déconnexion',
            'ERR004_VNUMBER_ADDED':' alias number(s) ajoutés',
            'ERR005_NO_VOICE_SERVICE':'aucun service vocal existant !!!',
            'ERR006_NO_TOKEN':'Jeton non valide, comtrôler votre accès Orange Partner',
            'ERR007_NO_BOOKED_ALIAS_NUMBER':'aucun Alias Number réservé !!!',
            'ERR008_DB_ERROR':'Contexte créé pour ce numéro mais pas enregistré en base de données',
            'ERR24':"Contenu d'un champ non valide: champs non valide: [...]",
            'ERR1100':"Le service vocal est en cours d'utilisation il ne peut être supprimé",
            'ERR1101':"Demande non satisfaite: Pas ou pas assez de numéros disponibles avec ces caractéristiques",
            'ERR1102':"Il existe déjà un contexte pour ce numéro privé"
        });
        $translateProvider.preferredLanguage('en_EN');
    }])

    .service('sharedProperties', ['$window', function ($window) {

        var _isConnected = false;

        var _voiceService = {};

        var _vNumbers = {};

        return {
            isConnected: function() {
                console.log('sharedProperties isConnected = '+_isConnected);
                return _isConnected;
            },
            setConnected: function(val) {
                console.log('sharedProperties setConnected '+val);
                _isConnected = val;
            },
            setVoiceService: function(val){
                console.log("setVoiceService" + JSON.stringify(val))
                _voiceService = val;
            },
            getVoiceService: function(){
                console.log("getVoiceService" + JSON.stringify(_voiceService))
                return _voiceService;
            },
            setvNumbers: function(val){
                console.log("setvNumbers" + JSON.stringify(val))
                _vNumbers = val;
            },
            getvNumbers: function(){
                console.log("getvNumbers" + JSON.stringify(_vNumbers))
                return _vNumbers;
            }
        };
    }])

    .filter("highlightSearch", function() {
        return function(input, search) {
            if (search) {
                return input.replace(new RegExp("(" + search + ")", "gi"), "<span class='highlightSearch'>$1</span>");
            }
            return input;
        }
    })

    .directive( 'goClick', function ( $location ) {
        return function ( scope, element, attrs ) {
            var path;

            attrs.$observe( 'goClick', function (val) {
                path = val;
            });

            element.bind( 'click', function () {
                scope.$apply( function () {
                    $location.path( path );
                });
            });
        };
    })

    .directive('routeLoadingIndicator', ['$rootScope','$translate', function($rootScope,$translate){
        return{
            restrict: 'E',
            template : "<div class='col-lg-12' ng-if='isRouteLoading'><h1>{{'LOADING' | translate}}<i class='fa fa-cog fa-spin'></i></h1></div>",
            link: function(scope,elem,attrs){
                scope.isRouteLoading = true;
                $rootScope.$on('$routeChangeStart', function(){
                    console.log('$routeChangeStart')
                    scope.isRouteLoading = true;
                });
                $rootScope.$on('$routeChangeSuccess', function(){
                    console.log('$routeChangeSuccess')
                    scope.isRouteLoading = false;
                });
            }
        }
    }])

    .factory('mymefactory', ['$http', 'sharedProperties', function($http,sharedProperties) {
            var sdo = {
                myme: function () {
                    if (!sharedProperties.isConnected()) {
                        return $http
                        .get('/me')
                        .then(
                            function success(response) {
                                sharedProperties.setConnected(true);
                                return true;
                            },
                            function error(reason) {
                                sharedProperties.setConnected(false);
                                return false;
                            }
                        );
                    } else {
                        return true;
                    }
                },
                voiceService: function(){
                    if (sharedProperties.getVoiceService().id === undefined) {
                        // no voice service in sharedProperties
                        return $http
                            .get('/checkSid')
                            .then(
                            function success(response) {
                                console.log("voiceService success : " + JSON.stringify(response))
                                if (response.data.length > 0) {
                                    sharedProperties.setVoiceService(response.data[0]);
                                    return response.data[0];
                                }
                                else{
                                    // no voice service
                                    return {};
                                }
                            },
                            function error(reason) {
                                console.log("voiceService error : " + JSON.stringify(reason))
                                sharedProperties.setVoiceService(reason);
                                return reason;
                            }
                        );
                    } else {
                        // voice service already  in sharedProperties
                        return sharedProperties.getVoiceService();
                    }
                },
                vNumbers: function(){
                    return $http
                        .get('/allvnumbers')
                        .then(
                        function success(response) {
                            console.log("vNumbers success : " + JSON.stringify(response))
                            sharedProperties.setvNumbers(response.data);
                            return response.data;
                        },
                        function error(reason) {
                            console.log("vNumbers error : " + JSON.stringify(reason))
                            sharedProperties.setvNumbers(reason);
                            return reason;
                        }
                    );
                }
            }
            return sdo;
    }])

/* Add extern modules */
angular.module('controllers', []);
angular.module('services', []);
angular.module('directives', []);
angular.module('factories', []);
angular.module('filters', []);
