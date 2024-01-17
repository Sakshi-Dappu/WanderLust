
mapboxgl.accessToken = accessToken;
console.log(accessToken);
  
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [ 73.85535000 ,18.51957000 ], //starting position [lng, lat]
  zoom: 8,
}); 


console.log(coordinates);

// Create a default Marker and add it to the map.
// const marker = new mapboxgl.Marker()
//   .setLngLat([12.554729, 55.70651]) //listing.geometry.coordinates
//   .addTo(map);
 