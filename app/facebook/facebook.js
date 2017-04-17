'use strict';

angular.module('eyoApp.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/facebook', {
        templateUrl: 'facebook/facebook.html',
        controller: 'facebookController'
    });
}])

.config(function ($facebookProvider) {
    $facebookProvider.setAppId('126685577873363');
    $facebookProvider.setPermissions("email, public_profile, user_posts, publish_actions, user_photos");
    $facebookProvider.setVersion('v2.5');
    $facebookProvider.setCustomInit({
       xfbml      : true,
        cookie: true
     });
    //$facebookProvider.setCookie(true);
})

.run(function ($rootScope) {
    $window.fbAsyncInit = function() {
    FB.init({
      appId: '126685577873363',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
};

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
})

.controller('facebookController', ['$scope', '$facebook', function ($scope, $facebook) {
    $scope.isLoggedIn = false;
    $scope.logIn = function () {
        $facebook.login().then(function () {
            $scope.isLoggedIn = true;
            refresh();
        });
    }

    $scope.logOut = function () {
        $facebook.logout().then(function () {
            $scope.isLoggedIn = false;
            refresh();
        });
    }

    function refresh() {
        var fields = [
          'id',
          'name',
          'first_name',
          'middle_name',
          'last_name',
          'gender',
          'locale',
          'languages',
          'link',
          'username',
          'third_party_id',
          'installed',
          'timezone',
          'updated_time',
          'verified',
          'age_range',
          'bio',
          'birthday',
          'cover',
          'currency',
          'devices',
          'education',
          'email',
          'hometown',
          'interested_in',
          'location',
          'political',
          'payment_pricepoints',
          'favorite_athletes',
          'favorite_teams',
          'picture',
          'quotes',
          'relationship_status',
          'religion',
          'significant_other',
          'video_upload_limits',
          'website',
          'work'
          ].join(',');
        $facebook.api('/me?fields=id,name,first_name,last_name,email,gender,locale', function (response) {
            console.log('response');
            console.log(response);
            $scope.welcomeMsg = "Welcome " + response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;
        }, function (error) {
            $scope.welcomeMsg = "Please Log In";
        });

        $facebook.api('/me/picture').then(function (response) {
            console.log("picture response");
            console.log(response);
            $scope.picture = response.data.url;
            $facebook.api('/me/permissions').then(function (response) {
                console.log('permissions response');
                console.log(response);
                $scope.permissions = response.data;
                $facebook.api('/me/posts', {
                    fields: fields
                }, function (response) {
                    $scope.posts = response.data;
                });
            });
        });
    }

    refresh();

}]);
