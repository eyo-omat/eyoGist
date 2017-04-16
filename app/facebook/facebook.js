'use strict';

angular.module('eyoApp.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'facebookController'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('126685577873363');
    $facebookProvider.setPermissions("email","public_profile","user_post","publich_actions", "user_photos");
})

.run(function($rootScope){

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('facebookController', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.isLoggedIn = false;
    $scope.logIn = function(){
        $facebook.login().then(function(){
            $scope.isLoggedIn = true;
            refresh();
        });
    }

    $scope.logOut = function(){
        $facebook.logout().then(function(){
            $scope.isLoggedIn = false;
            refresh();
        });
    }

    function refresh(){
        $facebook.api('/me').then(function(response){
            console.log(response);
            $scope.welcomeMsg = "Welcome "+ response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;
            $facebook.api('/me/picture').then(function(response){
                $scope.picture=response.data.url;
                $facebook.api('/me/permissions').then(function(response){
                    $scope.permissions=response.data;
                    $facebook.api('/me/posts').then(function(response){
                        $scope.posts=response.data;
                    })
                })
            })
        }, function(error){
            $scope.welcomeMsg = "Please Log In";
        });
    }

    refresh();

}]);
