(function() {

  angular.module('shopApp')
    .controller('orderCtrl', ['$scope', 'PurchaseFactory', '$location', '$localStorage', function($scope, PurchaseFactory, $location, $localStorage) {
      $scope.orderData = {};
      $scope.error = false;
       if($localStorage.login){
                $localStorage.login = true;
              $rootScope.login = true;
            }else{
              $localStorage.login = false;
              $rootScope.login = false;
              $location.path('/users/login');
            }
      PurchaseFactory.getCartProducts();
      $scope.orderData.products = PurchaseFactory.cartProducts;

      $scope.orderData.sum = PurchaseFactory.getCartSum('price');
      $scope.orderData.discount = PurchaseFactory.getCartSum('oldPrice');

      $scope.orderData.hash = Math.random().toString(33).substr(2, 30);

      $scope.creat = function() {
             var d = new Date();
        console.log($scope.orderData.exp.split('/')[1]+"--"+ d.getFullYear())
   
        if ($scope.orderData.cc.length == 16) {
          if ($scope.orderData.exp.split('/')[1] >= d.getFullYear()) {
            if ($scope.orderData.exp.split('/')[1] == d.getFullYear()) {
              if ($scope.orderData.exp.split('/')[0] > d.getMonth() + 1) {
                       if($scope.orderData.cvv.length==3){
                      PurchaseFactory.createOrder($scope.orderData);
                      $location.path('/');
                    }
              } else {
                $scope.error = true;
                $scope.message = "Expiration Date error"
              }
            } else {
                    if($scope.orderData.cvv.length==3){
                      PurchaseFactory.createOrder($scope.orderData);
                      $location.path('/');
                    }
            }
          } else {
            $scope.error = true;
                $scope.message = "Expiration Date error"
          }
        } else {
          $scope.error = true;
                $scope.message = "credit card Number is not valid"
        }


      }



    }]);
}());