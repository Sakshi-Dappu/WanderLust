
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: [ 73.85535000 ,18.51957000 ], //starting position [lng, lat]
  zoom: 8,
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
  .setLngLat([12.554729, 55.70651])
  .addTo(map);
 