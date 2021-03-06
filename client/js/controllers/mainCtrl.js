/* Contrôleur principal
 ================================================== */
angular.module('controllers')
    .controller("MainCtrl", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.init = [];
        $scope.columns = [];
        $scope.columns2 = [];
        $scope.posts = [];
        $scope.numeroPhrase=-1;
        $scope.numeroNouvellePhrase=-1

        $http({method: 'GET', url: 'phrases.json'})
            .success(function (data) {
                $scope.posts = data;
                $scope.initialisation();
            });

        $scope.initialisation = function () {
            $scope.init = [];
            $scope.columns = [];
            $scope.columns2 = [];

            //choix de la phrase, différente de la précédente
            while($scope.numeroPhrase == $scope.numeroNouvellePhrase ) {
                $scope.numeroNouvellePhrase = Math.floor((Math.random() * $scope.posts.length));
            }
            $scope.numeroPhrase=$scope.numeroNouvellePhrase;
            $scope.init = $scope.posts[$scope.numeroPhrase]
           //mélange des mots de la phrase
            var ordre = [];
            while (ordre.length < $scope.init.length) {
                j = Math.floor((Math.random() * $scope.init.length));
                push = 'true'
                for (i = 0; i < ordre.length; i++) {
                    if (ordre[i] == j) {
                        push = 'false'
                    }
                }
                if (push == 'true') {
                    ordre.push(j);
                }
            }
            for (i = 0; i < ordre.length; i++) {
                $scope.columns.push($scope.init[ordre[i]])
                $scope.columns2.push({title: i + 1 })
            }
        }

        $rootScope.$on('dropEvent', function (evt, dragged, dropped) {
            var i, oldIndex1, oldIndex2, depart, destination;
            for (i = 0; i < $scope.columns.length; i++) {
                var c = $scope.columns[i];
                if (dragged.title === c.title && dragged.id===c.id) {
                    oldIndex1 = i;
                    depart = "c";
                }
                if (dropped.title === c.title && dropped.id=== c.id) {
                    oldIndex2 = i;
                    destination = "c"
                }
            }
            for (j = 0; j < $scope.columns.length; j++) {
                var d = $scope.columns2[j];
                if (dragged.title === d.title && dragged.id===d.id) {
                    oldIndex1 = j;
                    depart = "d";
                }
                if (dropped.title === d.title && dropped.id===d.id) {
                    oldIndex2 = j;
                    destination = "d"
                }
            }

            /*
             C1 C2 C3 C4
             D1 D2 D3 D4
             */
            //C4 to C2 --> C4=C2 et C2=temp
            if (depart == 'c' && destination == 'c') {
                var temp = $scope.columns[oldIndex1];
                $scope.columns[oldIndex1] = $scope.columns[oldIndex2];
                $scope.columns[oldIndex2] = temp;


            }
            //C4 to D2 --> C4=D2 et D2=temp
            if (depart == 'c' && destination == 'd') {
                var temp = $scope.columns[oldIndex1];
                $scope.columns[oldIndex1] = $scope.columns2[oldIndex2];
                $scope.columns2[oldIndex2] = temp;
                if($scope.columns[oldIndex1].id == null || $scope.columns[oldIndex1].id ==undefined  ){
                    $scope.columns[oldIndex1].id = $scope.columns[oldIndex1].title
                    $scope.columns[oldIndex1].title='_'
                }
            }
            //D4 to D2 --> D4=D2 et D2=temp
            if (depart == 'd' && destination == 'd') {
                var temp = $scope.columns2[oldIndex1];
                $scope.columns2[oldIndex1] = $scope.columns2[oldIndex2];
                $scope.columns2[oldIndex2] = temp;
            }
            //D2 to C4 --> D2=C4 et C4=temp
            if (depart == 'd' && destination == 'c') {
                var temp = $scope.columns2[oldIndex1];
                $scope.columns2[oldIndex1] = $scope.columns[oldIndex2];
                $scope.columns[oldIndex2] = temp;
            }
            $scope.$apply();
        })


        $scope.good = function (d, i) {
            if ($scope.init[i].title == d.title)
                return true
        }

        $scope.end = function () {
            var retour = true
            for (i = 0; i < $scope.init.length; i++) {
                if ($scope.init[i].title != $scope.columns2[i].title) {
                    retour = false;
                }
            }
            return retour
        }


    }])
    .controller("manageCtrl", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.posts = [];
        $scope.newPhrase = []
        for (i = 0; i < 15; i++) {
            $scope.newPhrase.push({id: i + 1, title: ''  }).json
        }
        $http({method: 'GET', url: 'phrases.json'})
            .success(function (data) {
                $scope.posts = data;
            });

        $scope.addPhrase = function () {
            var newPhraseLight = []
            for (i = 0; i < $scope.newPhrase.length; i++) {
                if ($scope.newPhrase[i].title != '' && $scope.newPhrase[i].title != null) {
                    newPhraseLight.push($scope.newPhrase[i])
                }
            }
            $scope.posts.push(newPhraseLight)
            save();

        }

        $scope.deletePhrase = function (index) {
            $scope.posts.splice(index, 1)
            save();
        }

        save = function () {
            $http({
                method: 'POST',
                url: 'json',         //this is the json file with all the information I use
                data: $scope.posts    //this contains the modified data
            }).success(function (response) {
                //réinitialisation du formulaire
                $scope.newPhrase = []
                for (i = 0; i < 15; i++) {
                    $scope.newPhrase.push({id: i + 1, title: ''  }).json
                }
                //console.log('success')
            }).error(function (response) {
                //addLog("Error message.");
                //console.log('error')
            })
        }
    }])

