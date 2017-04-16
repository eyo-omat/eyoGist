'use strict';

angular.module('eyoApp.acebook', ['ngRoute', 'ng-facebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'facebookController'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('<your-facebook-app-id>');
})

.controller('facebookController', [function() {

}]);
