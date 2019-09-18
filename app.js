var x = document.getElementById("demo");
var lat = 0;
var lon =0;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lat = lat.toFixed(3);
  lon = position.coords.longitude;
  lon = lon.toFixed(3);
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  mapboxgl.accessToken = 'pk.eyJ1IjoibnVjY2lveCIsImEiOiJjazBvc2xkNm4wY3ZmM2ZxdXo2MnF4bmFnIn0.EriLcN-QVJTMfoXFPJ2FSA';
  
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [lon, lat],
  zoom :12
  });

  map.on('load', function () {

    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": {
      "type": "geojson",
      "data": {
      "type": "FeatureCollection",
      "features": [{
      "type": "Feature",
      "geometry": {
      "type": "Point",
      "coordinates": [lon, lat]
      }
      }]
      }
      },
      "layout": {
      "icon-image": "pulsing-dot"
      }
      });
    });
}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }
 
  mapboxgl.accessToken = 'pk.eyJ1IjoibnVjY2lveCIsImEiOiJjazBvc2xkNm4wY3ZmM2ZxdXo2MnF4bmFnIn0.EriLcN-QVJTMfoXFPJ2FSA';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [10, 10],
  zoom :12
  });

  var size = 100;
 
  var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    
    onAdd: function() {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
    },
    
    render: function() {
    var duration = 1000;
    var t = (performance.now() % duration) / duration;
    
    var radius = size / 2 * 0.3;
    var outerRadius = size / 2 * 0.7 * t + radius;
    var context = this.context;
    
    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
    context.fill();
    
    // draw inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(255, 100, 100, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
    
    // update this image's data with data from the canvas
    this.data = context.getImageData(0, 0, this.width, this.height).data;
    
    // keep the map repainting
    map.triggerRepaint();
    
    // return `true` to let the map know that the image was updated
    return true;
    }
  };