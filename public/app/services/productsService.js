(function () {
  angular.module('shopApp')
    .factory('Catalog', ['$http', function ($http) {
      return {
        list: [],
        getProducts: function () {
          var that = this;
          return $http.get('/api/products')
            .success(function (data) {
              that.list = data;
            });
        },
        list : [],
         getOrders: function (orderHash) {
           console.log(orderHash)
          var that = this;
           console.log(orderHash)
          return $http.post('/api/user/history', orderHash)
            .success(function (data) {
              that.history = data;
            });
        },

        getProduct: function (productId) {
          return $http.get('/api/products/' + productId);
        },
        result :[],
         searchProduct: function (data) {
          var that = this;
           var data = {search:data};
          return $http.post('/api/products/search', data)
            .success(function (data) {
              that.result = data;
            });
        }
       
      };
    }]);
}());


