

let map;


function drawRoute(jslocations,labels,labelOrigin,color,map){
 




//Create an empty array to store the coordinates from the JSON object above.
  var coordinates = [];

//For each line in the JSON object, pull out the longitude and latitude and add to the coordinates array.
  for (i = 0; i < jslocations.length; i++) {

  var longitudes =jslocations[i].lng

      var latitudes = jslocations[i].lat
      
  coordinates.push({
              lat: latitudes,
              lng: longitudes
                  });
  }

// Define a bound from the given coordinates from which we can center the map.
var bound = new google.maps.LatLngBounds();

  for (i = 0; i < jslocations.length; i++) {
   
  bound.extend( new google.maps.LatLng(jslocations[i].lat, jslocations[i].lng) );
     
  }

// Define the center point.
var centerpoint = bound.getCenter();



// Attach a map to the HTML element with id of 'map-canvas'.
var map = new google.maps.Map(map, {
    center: centerpoint,
  });

// Add map type variable or bring in dynamically.


//Make sure the map fits within the bounds defined.
  map.fitBounds(bound);

//Create the svg marker icon
var icon = {
  path: google.maps.SymbolPath.CIRCLE,
  strokeOpacity: 1,
  fillOpacity: 1,
  scale: 7,
  fillColor:"#ffffff",
  strokeColor: color,
  strokeOpacity: 1.0,
  strokeWeight:5,
  

};

//Create the markers


for( i = 0; i < coordinates.length; i++ ) {
         
  var positions = new google.maps.LatLng(coordinates[i]);
  icon['labelOrigin']=labelOrigin[i]

  var marker = new MarkerWithLabel({
    position:positions,
    // icon: mapStyles.uavSymbolBlack,
    icon:icon,
    labelContent:labels[i],
    labelAnchor: labelOrigin[i],
    labelClass: "labels",
    labelStyle: {
        opacity: 0.75
    },
    zIndex: 999999,
    map: map
  })

};

//Create the polyline that connects the markers.
var flightPath = new google.maps.Polyline({
  path: coordinates,
  geodesic: true,
  strokeColor: color,
  strokeOpacity: 1.0,
  strokeWeight: 7
   });

   flightPath.setMap(map);

}




function initMap() {



  var jslocations =[
    {lat:24.701386355433627, lng:46.829881768713584 },
    {lat:24.747361796216303, lng:46.797889373643635},
    {lat:24.77660830265986, lng:46.77744458960821},
    {lat:24.793214958157993, lng:46.765599804146134},
    {lat:24.786713414385222, lng:46.730128243579685},
    {lat:24.807277811187728, lng:46.71105588351672},
    {lat:24.800191798824756, lng:46.69383440815601},
    {lat:24.786279,lng: 46.660531},
    {lat:24.7673995, lng:46.643198},






  ];
var labels=['3j1','6g2','2e1','6e1','6d2','6d1','4c1','4b1','4a1']
var labelOrigin=[
  new google.maps.Point(10, 0),new google.maps.Point(12, -10),
  new google.maps.Point(-20, 10),new google.maps.Point(12, -5),
  new google.maps.Point(-10, 12),new google.maps.Point(-10, -23),
  new google.maps.Point(-10, 10),new google.maps.Point(-28, -5),
  new google.maps.Point(10, 0)]
  drawRoute(jslocations,labels,labelOrigin,"#991a7e",document.getElementById("map"));

}



