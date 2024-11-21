import "./styles.css";
import "leaflet/dist/leaflet.css";
import L, { marker } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import zoneData from "../assets/Southern_Zone_WGS_1984.geojson";

const icon = new L.icon({
    iconUrl: "../assets/marker-icon.png",
    iconSize: [20, 40],

});

const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
    provider: provider,
    marker: {
        icon: icon,
        draggable: false,
    }
});


// Creating a map object
const map = new L.map("map", {
    center: L.latLng(40.9726, -81.5295),
    zoom: 12
});


map.addControl(searchControl);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add zone polygon layer
L.geoJSON(zoneData).addTo(map);