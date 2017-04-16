'use strict';

// Declare app level module which depends on views, and components
angular.module('eyoApp', [
  'ngRoute',
  'eyoApp.view1',
  'eyoApp.view2',
  'eyoApp.facebook'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);

