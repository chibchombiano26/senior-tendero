/*global angular, cordova, StatusBar, Firebase, Auth, google*/
angular.module("starter")
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, geofireService) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    geofireService.set("test", [position.coords.latitude, position.coords.longitude]);
 
    var mapOptions = {
      center: latLng,
      zoom: 20,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    
    var pinIcon = new google.maps.MarkerImage(
        "https://cdn2.iconfinder.com/data/icons/happy-users/100/users03-128.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(60, 60)
    );  
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: latLng,
        icon: pinIcon,
        title: 'Your Location',
        map: $scope.map
    });
 
  }, function(error){
    console.log("Could not get location");
  });
})