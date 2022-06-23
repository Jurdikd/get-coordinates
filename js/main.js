document.addEventListener("DOMContentLoaded", () => {});
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
	style: "mapbox://styles/mapbox/satellite-v9",
	center: [-68.7378062, 10.3392072],
	zoom: 18,
});

//mapbox://styles/mapbox/streets-v11
const layerList = document.getElementById("menu_map");
const inputs = layerList.getElementsByTagName("input");

for (const input of inputs) {
	input.onclick = (layer) => {
		const layerId = layer.target.id;
		map.setStyle("mapbox://styles/mapbox/" + layerId);
	};
}

//BUSCADOR
const geocoder = new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	marker: {
		color: "red",
	},
	language: "es-VE",
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
const popupGalup = new mapboxgl.Popup({
	closeOnClick: false,
})
	.setHTML(
		`<h5 class="title text-center">Galup</h5>
    <p>Oficinas de Comunicaciones Galup</p>`
	)
	.setLngLat([-68.73763653571724, 10.339226847138619]);

// Create a default Marker and add it to the map for Galup.
const markerGalup = new mapboxgl.Marker({ color: "orange", rotation: 45 })
	.setLngLat([-68.73763653571724, 10.339226847138619])
	.setPopup(popupGalup)
	.addTo(map);

popupGalup.addTo(map);
const popupClient = new mapboxgl.Popup({
	closeOnClick: false,
})
	.setHTML(
		`<h5 class="title text-center">Mi marca</h5>
    <p>Marca de ubicacion</p>`
	)
	.addTo(map);
//Create a market for client
const markerClient = new mapboxgl.Marker({ color: "green", rotation: 45 });
//boton de marca
const textCoordendas = document.getElementById("coordendas");
//render marker
map.on("click", (e) => {
	//Get coordinates
	const coordinates = { lng: e.lngLat.lng, lat: e.lngLat.lat };
	//Set coordinates to market
	markerClient.setLngLat(coordinates);
	markerClient.setPopup(popupClient);
	//Render to map
	markerClient.addTo(map);

	textCoordendas.setAttribute("placeholder", markerClient._lngLat);
	//Activar botones
	const btnFlay = document.getElementById("fly");
	btnFlay.disabled = false;
	const btnClear = document.getElementById("clear");
	btnClear.disabled = false;
	console.log(textCoordendas);
});
//Buscar marca
document.getElementById("fly").addEventListener("click", () => {
	// Busqueda de marca
	map.flyTo({
		center: markerClient._lngLat,
		zoom: 18,
		essential: true, // this animation is considered essential with respect to prefers-reduced-motion
	});

	console.log(markerClient);
});
document.getElementById("clear").addEventListener("click", () => {
	// Busqueda de marca
	markerClient.remove(markerClient._lngLat);
	const btnFlay = document.getElementById("fly");
	btnFlay.disabled = true;
	const btnClear = document.getElementById("clear");
	btnClear.disabled = true;
});
