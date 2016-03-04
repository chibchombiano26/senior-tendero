/*global angular, cordova, StatusBar, Firebase, Auth, google, Ionic*/

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ["ionic", 'ionic.service.core', "firebase", "ngCordova"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:", token.token);
    });


    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('map', {
      url: '/',
      templateUrl: 'templates/map.html',
      controller: 'MapCtrl'
    })
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'ListCtrl'
    });

  $urlRouterProvider.otherwise("/login");

})


.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://senior-tendero.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//senior-tendero.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.controller("ListCtrl", function($scope, Items, Auth) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt("Que deseas comprar?");
    if (name) {
      $scope.items.$add({
        "name": name
      });
    }
  };

  $scope.login = function() {

    Ionic.Auth.login('facebook', {
      'remember': true
    }).then(function(e) {
      alert(e);
    }, function(e) {
      alert(e);
    });

    /*
    Auth.$authWithOAuthRedirect("facebook").then(function(authData) {
      // User successfully logged in
    }).catch(function(error) {
      if (error.code === "TRANSPORT_UNAVAILABLE") {
        Auth.$authWithOAuthPopup("facebook").then(function(authData) {
          // User successfully logged in. We can log to the console
          // since we’re using a popup here
          console.log(authData);
        });
      }
      else {
        // Another error occurred
        console.log(error);
      }
    });
    
    
    Auth.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
      }
      else {
        console.log("Logged in as", authData.uid);
      }
      $scope.authData = authData; // This will display the user's name in our view
    });
    
    */


  };





});
