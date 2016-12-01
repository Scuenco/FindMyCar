$('#recordCar').on('click', function(){
  recordPosition();
})

$('#findCar').on('click', function(){
  findMyCar();
})

$('#closeDialog').on('click', function(){
  $('#modalContainer').modal('hide');
  $('#findCar').show();
  $('#recordCar').hide();
})

function recordPosition(){
  navigator.geolocation.getCurrentPosition(function(position){
    //save in localStorage
    var latitude = window.sessionStorage.setItem('latitude', position.coords.latitude);
    var longitude = window.sessionStorage.setItem('longitude', position.coords.longitude);
    $('.info').html('Your car positioned at latitude: '+ localStorage.getItem('latitude') + ' longitude: '+
    localStorage.getItem('longitude') + '\n' + 'was recorded.');
  });
}

function findMyCar(){
  navigator.geolocation.getCurrentPosition(function(position){
    // my current location
    var mylatitude = position.coords.latitude;
    var mylongitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    // my car location
    var latitude = window.sessionStorage.getItem('latitude');
    var longitude = window.sessionStorage.getItem('longitude');

  var mapUrl = 'http://maps.googleapis.com/maps/api/staticmap'
    + '?center=' + latitude + ',' + longitude
    +' &zoom=18'
    + '&size=500x500'
    + '&markers=icon:https://chart.apis.google.com/chart?chst=d_map_pin_icon%26chld=car-dealer%257CFF0000|'
    + latitude + ',' + longitude
    + '&markers=color:green%7Clabel:S|' + mylatitude + ',' + mylongitude;
    + '&sensor=false';

  $('#map').attr('src', mapUrl);
  var dKm = getDistance(latitude,longitude,mylatitude,mylongitude);
  var dMi = dKm * 0.621371; //distance in km to mi
  $('#distance').html('Distance: ' + dKm + ' km(' + dMi + ' mi)' );
  });
}

function getDistance(lat1, lon1, lat2, lon2){
  var R = 6371 //earth radius in km
  var p = Math.PI / 180;
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
         c(lat1 * p) * c(lat2 * p) *
         (1 - c((lon2 - lon1) * p))/2;
  var d = (2 * R) * Math.asin(Math.sqrt(a));
 return d; //in km
}
