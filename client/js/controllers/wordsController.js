/**
 * Created by Anthony on 05/05/2015.
 */

angular.module('controllers')
    .controller("wordsController", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http)
    {

        //retrieve the json file
        $http({method: 'GET', url: 'words.json'})
            .success(function (data)
            {
                $scope.posts = data[0].phrase;
                $scope.posts2 = data[1].missing;
                $scope.initialisation();
            });

        //picking up different sentence
        $scope.initialisation = function ()
        {
            $scope.posts = shuffle($scope.posts);
            $scope.posts2 = shuffle($scope.posts2);
        }

        $rootScope.$on('dropEvent', function(evt, dragged, dropped)
        {
            var i, oldIndex1, oldIndex2;
            for(i=0; i<$scope.posts2.length; i++)
            {
                var c = $scope.posts2[i];
                if(dragged.text === c.text)
                {
                    oldIndex1 = i;
                    depart = "c";
                }
                if(dropped.text=== c.text)
                {
                    oldIndex2 = i;
                    destination = "c"
                }
            }

            for (j = 0; j < $scope.posts.length; j++)
            {
                var d = $scope.posts[j];
                if (dragged.title === d.text )
                {
                    oldIndex1 = j;
                    depart = "c";
                }
                if (dropped.title === d.text)
                {
                    oldIndex2 = j;
                    destination = "c"
                }
            }


            //C4 to D2 --> C4=D2 et D2=temp
            if (depart == 'c' && destination == 'd')
            {
                var temp = $scope.posts[oldIndex1];
                $scope.posts[oldIndex1] = $scope.posts2[oldIndex2];
                $scope.posts2[oldIndex2] = temp;
               /* if($scope.posts[oldIndex1].id == null || $scope.posts[oldIndex1].id ==undefined  )
                {
                    $scope.posts[oldIndex1].id = $scope.posts[oldIndex1].title
                    $scope.posts[oldIndex1].title='_'
                }*/
            }
            //D4 to D2 --> D4=D2 et D2=temp
            if (depart == 'd' && destination == 'd')
            {
                var temp = $scope.posts2[oldIndex1];
                $scope.posts2[oldIndex1] = $scope.posts2[oldIndex2];
                $scope.posts2[oldIndex2] = temp;
            }
            //D2 to C4 --> D2=C4 et C4=temp
            if (depart == 'd' && destination == 'c')
            {
                var temp = $scope.posts2[oldIndex1];
                $scope.posts2[oldIndex1] = $scope.posts[oldIndex2];
                $scope.posts[oldIndex2] = temp;
            }
            $scope.$apply();



            $scope.$apply();


        });

        $scope.good = function (d, i)
        {
            if ($scope.init[i].text == d.title)
                return true
        }

        $scope.end = function () {
            var retour = true
            for (i = 0; i < $scope.init.length; i++) {
                if ($scope.init[i].title != $scope.posts2[i].title) {
                    retour = false;
                }
            }
            return retour
        }

        function shuffle(o)
        {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

    }])