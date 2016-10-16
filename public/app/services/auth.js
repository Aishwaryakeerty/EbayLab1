(function () {
  angular.module('shopApp')
    .factory('Auth', ['$http','$rootScope','$localStorage', function ($http,$rootScope,$localStorage) {
      return {
        item: {},
        auth: function (user) {
          var that = this;
          return $http.post('/api/user/login',user)
            .success(function (data) {
              that.item = data;
            $localStorage.login =  true;
            $localStorage.account_id =  data.account_id;
            $rootScope.login =true;
            console.log($localStorage.login);
            }).error(function(err){
             console.log(err);
            
             
          });
        },
        create:function(user){
          var that = this;
          return $http.post('/api/user/sign-up',user)
            .success(function (data) {
              that.message = data;
            });
        }
      };
    }]);
}());
