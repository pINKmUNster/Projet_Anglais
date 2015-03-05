/* Main controller
 ================================================== */
angular.module('controllers', [])
    .controller('loginCtrl', ['$window', '$scope','$http','$location','sharedProperties','$translate',function ($window,$scope,$http,$location,sharedProperties,$translate) {
        if (sharedProperties.isConnected()) {
            $location.path('/home');
        }
        else {
            $scope.login = function () {
                $http({method: 'POST', url: '/login', data: {username: $scope.email, password: $scope.password}}).
                    success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        console.log("loginCtrl Success :" + status + "<-->" + JSON.stringify(data));
                        $location.path('/home');
                    }).
                    error(function (data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        console.log("loginCtrl error :" + status + "<-->" + JSON.stringify(data));
                        $('#error .modal-body').html($translate.instant(data.translateId))
                        $('#error').modal("show");
                        $location.path('/login');
                    });
            }
        }
    }])

    .controller("logoutCtrl", ['$window',"$scope",'$location','$http', 'sharedProperties','$translate', function ($window,$scope,$location,$http,sharedProperties,$translate) {
        $http({method: 'GET', url: '/logout'}).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("logoutCtrl Success :"+ status );
                sharedProperties.setConnected(false);
                sharedProperties.setVoiceService({});
                $location.path('/');
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("logoutCtrl error :"+ status + "<-->" + JSON.stringify(data));
                $('#error .modal-body').html($translate.instant('ERR003_LOGOUT'))
                $('#error').modal("show");
                sharedProperties.setConnected(false);
                $location.path('/');
            });
    }])

    .controller('homeCtrl', ['$rootScope','$scope','$window','$http','$location','sharedProperties','$translate','me','voiceService', function ($rootScope,$scope,$window,$http,$location,sharedProperties,$translate,me,voiceService) {
        console.log('homeCtrl me ='+me);
        console.log('homeCtrl voiceService ='+ JSON.stringify(voiceService));
        console.log('homeCtrl sharedProperties.isConnected ='+sharedProperties.isConnected());
        console.log('homeCtrl sharedProperties.getVoiceService ='+JSON.stringify(sharedProperties.getVoiceService()));

        if (sharedProperties.isConnected()) {

            $scope.voiceServiceExist = function () {
                if (sharedProperties.getVoiceService().id!== undefined){
                    return true;
                }
                else{
                    return false;
                }
            };
            $scope.noToken = function () {
                try {
                    console.log("sharedProperties.getVoiceService():")
                    console.log(sharedProperties.getVoiceService())
                    var tmp = sharedProperties.getVoiceService().data.message;
                    console.log("noToken true")
                    return true;
                } catch (e) {
                    console.log("noToken false")
                    return false;
                }
            };

            //for button tooltip on home page
            $('button').tooltip();

            $scope.deleteVoiceServices = function () {
                if (confirm($translate.instant('CONFIRM_DELETION'))) {
                    //for button tooltip on home page when delete voice service
                    $('button').tooltip('hide');
                    $rootScope.isRouteLoading=true
                    $http({method: 'DELETE', url: '/delVoiceServices'}).
                        success(function (data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            $('#info .modal-body').html($translate.instant('VOICE_SERVICE_DELETED'))
                            $('#info').modal("show")
                            console.log(data);
                            // array use in allvnumbers
                            $scope.vNumbers = "";
                            sharedProperties.setVoiceService({})
                            $rootScope.isRouteLoading=false
                        }).
                        error(function (data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            console.log("deleteVoiceServices error : " + status + "<-->" + data.message + "<-->" + data.description);
                            $('#error .modal-body').html($translate.instant('ERR' + data.code))
                            $('#error').modal("show");
                            $rootScope.isRouteLoading=false
                        });
                }
            };
            try {
                var tmpVSId = sharedProperties.getVoiceService().data.translateId;
                $('#error .modal-body').html($translate.instant(tmpVSId))
                $('#error').modal("show");
            } catch (e) {
            }
        }
        else {
            // no modal message, /home if not connected go to /login
            $location.path('/login');
        }
    }])

    .controller('poolNumbersCtrl', ['$rootScope','$scope','$window','$http','$location','sharedProperties','$translate',function ($rootScope,$scope,$window,$http,$location,sharedProperties,$translate) {
        if (sharedProperties.isConnected()) {
            $scope.voiceServiceExist = function () {
                if (sharedProperties.getVoiceService().id!== undefined){
                    return true;
                }
                else{
                    return false;
                }
            };
            if (sharedProperties.getVoiceService().id!== undefined){
                // initiate default values
                $scope.vNumType = "mobile";
//                $scope.vNumPref = "06";
                $scope.vNumSms = "SMS";
                $scope.saveNumbers = function () {
                    $rootScope.isRouteLoading=true
                    $http({method: 'POST', url: '/poolNumbers',
                        data: {vNumType:$scope.vNumType,
                            vNumPref:$scope.vNumPref,
                            vNumPoolSize:$scope.vNumPoolSize,
                            vNumCapacicites: $scope.vNumSms,
                            vNumDuration:$scope.vNumDuration,
                            voiceServiceId:Number(sharedProperties.getVoiceService().id)
                        }
                    }).
                        success(function (data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            console.log("saveNumbers success : " + JSON.stringify(data))
                            $('#info .modal-body').html(data.length + $translate.instant('ERR004_VNUMBER_ADDED'))
                            $('#info').modal("show")
                            $rootScope.isRouteLoading=false
                            $location.path('/home');
                        }).
                        error(function (data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            console.log("poolNumbersCtrl error : " + status + "<-->" + data.message + "<-->" + data.description);
                            $('#error .modal-body').html($translate.instant(data.translateId))
                            $('#error').modal("show");
                            $rootScope.isRouteLoading=false
                        });
                };
            }
            else{
                $('#error .modal-body').html($translate.instant('ERR005_NO_VOICE_SERVICE'));
                $('#error').modal("show");
                $location.path('/home');
            }
        }
        else {
            $('#error .modal-body').html($translate.instant('ERR002_NOT_AUTHORIZED'));
            $('#error').modal("show");
            $location.path('/login');
        }
    }])

    .controller('allvNumbersCtrl', ['$rootScope','$scope','$window','$http','$location', 'sharedProperties','$translate', function ($rootScope,$scope,$window, $http,$location, sharedProperties,$translate) {
        console.log("allvNumbersCtrl IN")
        if (sharedProperties.isConnected()) {

            if (sharedProperties.getVoiceService().id!== undefined){
                // sort
                $scope.sortField = null;
                $scope.sortDesc = false;
                $scope.sortvNumber = function(field){
                    if ($scope.sortField == field){
                        $scope.sortDesc = !$scope.sortDesc;
                    }
                    else{
                        $scope.sortField = field;
                        $scope.sortDesc=false;
                    }
                };
                $scope.sortIconCssText = function(field){
                    return { fa: $scope.sortField == field, 'fa-sort-alpha-asc': $scope.sortField == field && !$scope.sortDesc, 'fa-sort-alpha-desc': $scope.sortField == field && $scope.sortDesc  };
                };
                $scope.sortIconCssNumber = function(field){
                    return { fa: $scope.sortField == field, 'fa-sort-numeric-asc': $scope.sortField == field && !$scope.sortDesc, 'fa-sort-numeric-desc': $scope.sortField == field && $scope.sortDesc  };
                };
                try {
                    console.log("sharedProperties.getvNumbers():")
                    console.log(sharedProperties.getvNumbers())
                    var tmp = sharedProperties.getvNumbers().data.message;
                    $scope.vNumbers =[];
                    $('#error .modal-body').html($translate.instant('ERROR')  + " " + sharedProperties.getvNumbers().data.message + "<-->" + sharedProperties.getvNumbers().data.description)
                    $('#error').modal("show");
                } catch (e) {
                    if (sharedProperties.getvNumbers().length>0){
                        $scope.vNumbers =sharedProperties.getvNumbers();
                    }
                    else{
                        $scope.vNumbers =[];
                        $('#info .modal-body').html($translate.instant('ERR007_NO_BOOKED_ALIAS_NUMBER'))
                        $('#info').modal("show")
                    }
                }

            }
            else{
                $('#error .modal-body').html($translate.instant('ERR005_NO_VOICE_SERVICE'));
                $('#error').modal("show");
                console.log("allvNumbersCtrl  no voice ")
            }
        }
        else {
            $('#error .modal-body').html($translate.instant('ERR002_NOT_AUTHORIZED'));
            $('#error').modal("show");
            console.log("allvNumbersCtrl  no voice ")
            $location.path('/login');
        }
        console.log("allvNumbersCtrl OUT")
    }])

    .controller('allUsersCtrl', ['$scope','$window','$http','$location', 'sharedProperties', '$translate', function ($scope,$window,$http,$location, sharedProperties,$translate) {
        if (sharedProperties.isConnected()) {

            if (sharedProperties.getVoiceService().id!== undefined){

                    // sort
                $scope.sortField = null;
                $scope.sortDesc = false;
                $scope.sortUser = function(field){
                    console.log("sortUser field : " + field + "--" + $scope.sortDesc)
                    if ($scope.sortField == field){
                        $scope.sortDesc = !$scope.sortDesc;
                    }
                    else{
                        $scope.sortField = field;
                        $scope.sortDesc=false;
                    }
                };
                $scope.sortIconCssText = function(field){
                    return { fa: $scope.sortField == field, 'fa-sort-alpha-asc': $scope.sortField == field && !$scope.sortDesc, 'fa-sort-alpha-desc': $scope.sortField == field && $scope.sortDesc  };
                };
                $scope.sortIconCssNumber = function(field){
                    return { fa: $scope.sortField == field, 'fa-sort-numeric-asc': $scope.sortField == field && !$scope.sortDesc, 'fa-sort-numeric-desc': $scope.sortField == field && $scope.sortDesc  };
                };

                // search
                $scope.search = null;
                $scope.delSearch = function() {
                    $scope.search = null;
                }

                $http({method: 'GET', url: '/allusers'})
                    .success(function (data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        if(data.length > 0){
                            $scope.users = data;
                        }
                        else{
                            $('#info .modal-body').html($translate.instant('NO_EMPLOYEE_DECLARED'))
                            $('#info').modal("show")
                        }
                    })
            }
            else{
                $('#error .modal-body').html($translate.instant('ERR005_NO_VOICE_SERVICE'));
                $('#error').modal("show");
                $location.path('/home');
            }
        }
        else {
            $('#error .modal-body').html($translate.instant('ERR002_NOT_AUTHORIZED'));
            $('#error').modal("show");
            $location.path('/login');
        }
    }])

    .controller('newUserCtrl', ['$rootScope','$scope','$window','$http','$location','sharedProperties', '$translate',function ($rootScope,$scope,$window,$http,$location,sharedProperties,$translate) {
        if (sharedProperties.isConnected()) {

            $scope.voiceServiceExist = function () {
                if (sharedProperties.getVoiceService().id!== undefined){
                    return true;
                }
                else{
                    return false;
                }
            };
            if (sharedProperties.getVoiceService().id!== undefined){
                // initiate default values
                $scope.gender = "male";
                $scope.contract = "apprentice";
                $scope.SMS_IN = true;
                $scope.CALL_IN = true;
                //sauvegarde un utilisateur en base
                $scope.saveUser = function () {
                    $rootScope.isRouteLoading=true
                    $http({method: 'POST', url: '/addvNumber',
                        data: {firstname: $scope.firstname,
                            lastname: $scope.lastname,
                            gender: $scope.gender,
                            birthDate: $scope.birthDate,
                            contract: $scope.contract,
                            duration: $scope.duration,
                            privateNumber: $scope.privateNumber,
                            sms: $scope.SMS_IN,
                            call: $scope.CALL_IN,
                            pin: $scope.pin,
                            voiceServiceId: sharedProperties.getVoiceService().id
                        }}).
                        success(function (data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            $('#info .modal-body').html($translate.instant('EMPLOYEE_ADDED'))
                            $('#info').modal("show")
                            $rootScope.isRouteLoading=false
                            $location.path('/home');
                        }).
                        error(function (data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            console.log("newUserCtrl saveUser: " + JSON.stringify(data))
                            $('#error .modal-body').html($translate.instant('ERR' + data.code))
                            $('#error').modal("show");
                            $rootScope.isRouteLoading=false
                        });
                }
            }
            else{
                $('#error .modal-body').html($translate.instant('ERR005_NO_VOICE_SERVICE'));
                $('#error').modal("show");
                $location.path('/home');
            }
        }
        else {
            $('#error .modal-body').html($translate.instant('ERR002_NOT_AUTHORIZED'));
            $('#error').modal("show");
            $location.path('/login');
        }
    }])

    .controller("voiceServiceCtrl",['$rootScope','$scope','$window','$http','$location','sharedProperties', '$translate',function ($rootScope,$scope,$window,$http,$location,sharedProperties,$translate){
        if (sharedProperties.isConnected()) {

            $scope.voiceServiceContent={customMessages:{welcome:{speak:{}},wait:{speak:{}},warning:{speak:{}}}}
            $scope.voiceServiceExist = function () {
                if (sharedProperties.getVoiceService().id!== undefined){
                    return true;
                }
                else{
                    return false;
                }
            };
            $scope.saveVoiceService = function(data){
                $rootScope.isRouteLoading=true
                console.log("voiceServiceCtrl saveVoiceService : " + JSON.stringify(data))
                if(data.id === undefined || data.id === ''){
                    // create voice service
                    $http({method: 'POST', url: '/createVoiceService', data: data}).
                        success(function (data,status, headers, config) {
                            console.log('voiceServiceCtrl create: ' + JSON.stringify(data));
                            sharedProperties.setVoiceService(data)
                            $('#info .modal-body').html($translate.instant('VOICE_SERVICE_CREATED'))
                            $('#info').modal("show")
                            $rootScope.isRouteLoading=false
                            $location.path('/home');
                        }).
                        error(function (data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            $('#error .modal-body').html($translate.instant('ERR' + data.code))
                            $('#error').modal("show")
                            $rootScope.isRouteLoading=false
                        });
                }
                else{
                    // modify voice service
                    $http({method: 'PATCH', url: '/modifyVoiceService', data: data}).
                        success(function (data,status, headers, config) {
                            console.log('voiceServiceCtrl modify: ' + JSON.stringify(data));
                            sharedProperties.setVoiceService(data)
                            $('#info .modal-body').html($translate.instant('VOICE_SERVICE_MODIFIED'))
                            $('#info').modal("show")
                            $rootScope.isRouteLoading=false
                            $location.path('/home');
                        }).
                        error(function (data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            $('#error .modal-body').html($translate.instant('ERR' + data.code))
                            $('#error').modal("show")
                            $rootScope.isRouteLoading=false
                        });
                }

            }
            if (sharedProperties.getVoiceService().id!== undefined){
                $scope.voiceServiceContent = sharedProperties.getVoiceService();
            }
            else{
                // initiate default voice service attributs
                $scope.voiceServiceContent.type="second_number";
                $scope.voiceServiceContent.customMessages.welcome.speak.language="fr";
                $scope.voiceServiceContent.customMessages.welcome.speak.voice="Agnes"
                $scope.voiceServiceContent.customMessages.wait.speak.language="fr";
                $scope.voiceServiceContent.customMessages.wait.speak.voice="Agnes"
                $scope.voiceServiceContent.customMessages.warning.speak.language="fr";
                $scope.voiceServiceContent.customMessages.warning.speak.voice="Agnes"
            }
        }
        else {
            $('#error .modal-body').html($translate.instant('ERR002_NOT_AUTHORIZED'));
            $('#error').modal("show");
            $location.path('/login');
        }
    }])

    .controller('navCtrl', ['$scope','$window','sharedProperties','$http','sharedProperties','$translate', function ($scope,$window,sharedProperties,$http, sharedProperties,$translate) {

        $scope.isConnected = function() {
            return sharedProperties.isConnected();
        }

        $scope.toggleLanguage = function(){
            $translate.use() == 'fr_FR' ? $translate.use('en_EN') : $translate.use('fr_FR')
        };
    }]);

