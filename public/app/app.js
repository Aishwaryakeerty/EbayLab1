(function () {
    var app = angular.module('shopApp', ['ngRoute','pageslide-directive','ngStorage','angularPayments']);

    angular.module('shopApp')
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'app/homepage/main.html',
                    controller: 'productsCtrl'
                })
                .when('/account', {
                    templateUrl: 'app/account/main.html',
                    controller: 'accountCtrl'
                })
                .when('/cart', {
                    templateUrl: 'app/cart/cart.html',
                    controller: 'cartCtrl'
                })
                .when('/order', {
                    templateUrl: 'app/order/order.html',
                    controller: 'orderCtrl'
                })
                .when('/order/:urlHash', {
                    templateUrl: 'app/order/order-success.html',
                    controller: 'singleOrderCtrl'
                })
                .when('/catalog', {
                    templateUrl: 'app/products-list/catalog.html',
                    controller: 'productsCtrl'
                })
               .when('/search', {
                    templateUrl: 'app/products-list/search.html',
                    controller: 'searchCtrl'
                })
                .when('/:catName', {
                    templateUrl: 'app/products-list/catalog-cat.html',
                    controller: 'categoriesCtrl'
                })
                .when('/catalog/:productId', {
                    templateUrl: 'app/product-page/product.html',
                    controller: 'productCtrl'
                })
                .when('/products/addProduct', {
                    templateUrl: 'app/product-page/addProduct.html',
                    controller: 'addProductCtrl'
                })
                .when('/users/login', {
                    templateUrl: 'app/auth/login.html',
                    controller: 'auth'
                })
                .when('/users/new/account', {
                    templateUrl: 'app/auth/signup.html',
                    controller: 'auth'
                })
                .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        })
    
    .filter('yesNo', function () {
  return function (boolean) {
    return boolean ? '' : 'Not Valid';
  }
});
    return app;
}());
