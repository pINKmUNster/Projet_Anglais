/**
 * Created by Anthony on 10/05/2015.
 */
/**
 * Created by Anthony on 05/05/2015.
 */

angular.module('controllers')
    .controller("toeicController", ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http)
    {

        //retrieve the json file
        $http({method: 'GET', url: 'toeic.json'})
            .success(function (data)
            {
                $scope.exercices = data;
                $scope.initialisation();
            });

        //picking up different sentence
        $scope.initialisation = function ()
        {
            $scope.caption = false;
            var tmp = shuffle($scope.exercices);
            var size = $scope.exercices.length -1
            $scope.posts = tmp[Math.floor((Math.random() * size) + 0)]
            //console.log($scope.posts)

        }


        $scope.validate = function ()
        {
            //console.log("on teste : ", $scope.sol)
            $scope.caption = true;
            if ($scope.sol == 'true')
                console.log("Gagné")
                return true;
        }



        function shuffle(o)
        {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

    }])