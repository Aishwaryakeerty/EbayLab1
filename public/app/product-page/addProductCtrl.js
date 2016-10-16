(function () {

    angular.module('shopApp')
        .controller('addProductCtrl', ['$scope', 'Product', '$location','$localStorage','$rooScope', function ($scope, Product, $location,$localStorage,$rooScope) {
            $scope.orderData = {};
            if($localStorage.login){
                $localStorage.login = true;
              $rootScope.login = true;
            }else{
              $localStorage.login = false;
              $rootScope.login = false;
              $location.path('/users/login');
            }
        
            $scope.addProduct = function () {
                Product.addProduct($scope.newProduct);
                $location.path('/order/');

            };
        

        }]);
   
}());
