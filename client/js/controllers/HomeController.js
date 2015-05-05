/**
 * Created by Anthony on 05/05/2015.
 */
angular.module('controllers', [])
    .controller("homeController", ['$scope', function ($scope)
    {
        $scope.go = function ( path )
        {
            $location.path( path );
        };
    }])