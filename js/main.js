document.addEventListener("DOMContentLoaded", () => {
	//fetchDataMap();
});
//`http://api.positionstack.com/v1/forward?access_key=${api_key}&query=40.7638435,-73.9729691`
/*const api_key = "c59bc1d034f4e46966a6e79f32797f02";
const fetchDataMap = async () => {
	try {
		console.log();

		const res = await fetch(
			`http://api.positionstack.com/v1/forward?access_key=${api_key}`
		);
		const data = await res.json();

		console.log(data.data);
	} catch (error) {
		console.log(error);
	}
};*/
// mapbox
mapboxgl.accessToken =
	"pk.eyJ1IjoianVyZGlrZCIsImEiOiJjbDRxaWY0ZGowMnJkM2puNzZheHZ3cTNnIn0.VpZd6mXZddH_tyYZ6Zi22g";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [-68.7378062, 10.3392072],
	zoom: 18,
});
//BUSCADOR
const geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	marker: {
		color: "red",
	},
	mapboxgl: mapboxgl,
});
//BUSCADOR INIT
map.addControl(geocoder);
map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		// When active the map will receive updates to the device's location as it changes.
		trackUserLocation: true,
		// Draw an arrow next to the location dot to indicate which direction the device is heading.
		showUserHeading: true,
	})
);
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());
// Create a default Popup and add it to the marketGalup for Galup.
const popupGalup = new mapboxgl.Popup().setHTML(
	`<h5 class="title text-center">Oficia Galup</h5>`
);
// Create a default Marker and add it to the map for Galup.
const markerGalup = new mapboxgl.Marker({ color: "orange", rotation: 45 })
	.setLngLat([-68.7378062, 10.3392072])
	.setPopup(popupGalup)
	.addTo(map);
//Create a market cliente
const markerClient = new mapboxgl.Marker({ color: "green", rotation: 45 });

map.on("click", function (e) {
	//Get coordinates
	const coordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat };
	//Set coordinates to market
	markerClient.setLngLat(coordinates);
	//Render to map
	markerClient.addTo(map);
});
//Buscar marca
console.log(markerClient);
document.getElementById("fly").addEventListener("click", () => {
	// Fly to a random location by offsetting the point -74.50, 40
	// by up to 5 degrees.
	map.flyTo({
		center: markerClient._lngLat,
		essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	});
});
