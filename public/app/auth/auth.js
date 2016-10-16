(function () {

    angular.module('shopApp')
        .controller('auth', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
            $scope.orderData = {};

            $scope.login = function () {
                Auth.auth($scope.auth);
                $location.path('/');

            };
           $scope.create = function () {
                Auth.create($scope.auth);
                $location.path('/');

            };
         

        }]);
}());
