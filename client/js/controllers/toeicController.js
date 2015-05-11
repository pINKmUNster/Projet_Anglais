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
            $scope.retry = false;
            $scope.messageShow = false;
            var tmp = shuffle($scope.exercices);
            var size = $scope.exercices.length -1
            $scope.posts = tmp[Math.floor((Math.random() * size) + 0)]
            //console.log($scope.posts)

        }


        $scope.validate = function ()
        {
            //console.log("on teste : ", $scope.sol)
            $scope.caption = true;
            $scope.retry = true;
            if ($scope.sol == 'true')
            {
                $scope.message = "Well done, it's the corect answer";

                return true;
            }
            else
            {
                $scope.message = "You're wrong, feel free to glance at rule to further information";
                return false;
            }
            $scope.messageShow = true;
            show();
        }

        var show = function()
        {
            $('#Modal2').modal('show');

        }

        var shuffle = function(o)
        {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

    }])