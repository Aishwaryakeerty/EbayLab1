(function () {
  angular.module('shopApp')
    .factory('Product', ['$http', function ($http) {
      return {
        item: {},
        get: function (productId) {
          var that = this;
          return $http.get('/api/products/' + productId)
            .success(function (data) {
              that.item = data[0];
              that.item.details = JSON.parse(that.item.details)
              that.item.bigImage = data[0].images;
            });
        },
        addProduct:function(productData){
          var that = this;
          return $http.post('/api/products/addProduct',productData)
            .success(function (data) {
              that.message = data;
            });
        }
      };
    }]);
}());
