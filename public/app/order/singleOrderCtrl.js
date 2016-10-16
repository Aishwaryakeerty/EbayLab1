(function () {
    angular.module('shopApp')
        .controller('singleOrderCtrl', ['$scope','$routeParams','PurchaseFactory', function ($scope, $routeParams, PurchaseFactory) {

            // Get single product
            PurchaseFactory.getOrder($routeParams.urlHash);
//             PurchaseFactory.customerInfo = JSON.parse(JSON.stringify(PurchaseFactory.customerInfo));
//             PurchaseFactory.orderInfo =    JSON.parse(JSON.stringify(PurchaseFactory.orderInfo));
//             PurchaseFactory.products =     JSON.parse(JSON.stringify(PurchaseFactory.products));
            $scope.product = PurchaseFactory[0];
            
        }]);
}());
