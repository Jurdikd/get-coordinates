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
const markerGalup = new mapboxgl.Marker()
	.setLngLat([-68.7378062, 10.3392072])
	.setPopup(popupGalup)
	.addTo(map);
// Create a default Marker, colored black, rotated 45 degrees.
map.on("click", function (e) {
	///alert(e.lngLat);
	console.log(e.lngLat.lng + ", " + e.lngLat.lat);
	console.log(map);
	const coordinates = e.lngLat.lng + ", " + e.lngLat.lat;
	console.log(coordinates);
	console.log(JSON.stringify(e.lngLat));
	const markerClient = new mapboxgl.Marker({ color: "orange", rotation: 45 })
		.setLngLat(coordinates)
		.addTo(map);
});
