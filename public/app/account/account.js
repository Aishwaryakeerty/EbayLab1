(function () {

    angular.module('shopApp')
        .controller('accountCtrl', ['$scope','$http', '$location','$localStorage', 'Catalog','$rootScope',function ($scope,$http, $location,$localStorage,Catalog,$rootScope) {
            $scope.orderData = {};
            $rootScope.login = $localStorage.login;
            if($localStorage.login){
                $localStorage.login = true;
              $rootScope.login = true;
            }else{
              $localStorage.login = false;
              $rootScope.login = false;
              $location.path('/users/login');
            }
          
         $http.post('http://ec2-54-67-90-171.us-west-1.compute.amazonaws.com:3000/api/user/history',{account_id:$localStorage.account_id})
          .success(function (data) {
              $scope.search_products = data;
     
           $scope.user = {};
           $scope.user.name = data[0].name;
             $scope.user.email= data[0].email;
           $scope.user.mobile= data[0].mobile;
         });
        
          
          $scope.addProduct = function () {
                Product.addProduct($scope.newProduct);
                $location.path('/order/');

            };

        }]);
}());
