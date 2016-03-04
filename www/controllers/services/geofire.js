/*global angular, Firebase, GeoFire*/
angular.module("starter")
    .service("geofireService", function() {

        var firebaseRef = new Firebase("https://senior-tendero.firebaseio.com/map");
        var geoFire = new GeoFire(firebaseRef);
        var ref = geoFire.ref(); // ref === firebaseRef

        var dataFactory = {};

        dataFactory.set = function(key, point) {
            return geoFire.set(key, point);
        }

        return dataFactory;

    })