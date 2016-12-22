'use strict';
(function(module){
  var mapView = {};
  mapView.markers = [];
  mapView.userLocation = '';

  mapView.toHtml = function(){
    var template = Handlebars.compile();
    return template;
  };

  mapView.setMarkers = function() {
    mapView.deleteOldMarkers();
    Bar.allBars.forEach(function(bar){
      var coordinates = {
        lat: bar.latitude,
        lng: bar.longitude,
      };
      var marker = new google.maps.Marker({
        position: coordinates,
        animation: google.maps.Animation.DROP,
        icon:'/../../img/paw-icon.png',
        map: map.mapObj
      });
      mapView.markers.push(marker);
    });
  };

  mapView.deleteOldMarkers = function() {
    mapView.markers.forEach(function(marker) {
      marker.setMap(null);
    });
  };

  var configQuery = function(val){
    var newVal1 = val.split(' ').join('');
    var newVal2 = newVal1.split(',').join('');
    return newVal2;
  };

  mapView.setLocation = function(){
    $('#user-submit-btn').on('click', function(){
      var inputLocation = document.getElementById('user-location').value;
      mapView.userLocation = configQuery(inputLocation);
      if (mapView.userLocation === ''){
        sweetAlert('Not to be ruff, but you should enter at least something.');
      } else {
        Bar.requestData();
      }
    });
  };

  module.mapView = mapView;
})(window);
