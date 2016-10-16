(function () {
    angular.module('shopApp')
        .controller('productsCtrl', ['$rootScope', '$scope', 'Catalog', '$localStorage','$location',function ($rootScope, $scope, Catalog,$localStorage,$location) {

            Catalog.getProducts();
            $scope.products = Catalog;
          
          
           $rootScope.logout = function(){
              $localStorage.login = false;
             $rootScope.login = false;
              $location.path('/');
           }
             $rootScope.txt;
            $rootScope.searchProduct = function () {
                Catalog.searchProduct($rootScope.txt);
                 $scope.search_products = Catalog;
                 $location.path('/search/');

            };

        }])
    .controller('searchCtrl', ['$rootScope', '$scope', 'Catalog', '$localStorage','$location',function ($rootScope, $scope, Catalog,$localStorage,$location) {

          
             $rootScope.txt;
            $rootScope.searchProduct = function () {
                Catalog.searchProduct($rootScope.txt);
                 $rootScope.search_products = Catalog.result;
                //console.log(Catalog.result)
                 $location.path('/search/');

            };

        }]);
}());
