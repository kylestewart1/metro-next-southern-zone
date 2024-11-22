import "./styles.css";
import "leaflet/dist/leaflet.css";
import L, { latLng, marker } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import zoneData from "../assets/Southern_Zone_WGS_1984.geojson";
import stops from "../assets/southern_zone_stops_WGS_1984.geojson";
import routes from "../assets/southern_zone_nearby_routes_WGS_1984.geojson";
import markerIcon from "../assets/marker-icon.png";

const icon = new L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 40],

});

const provider = new OpenStreetMapProvider({
    params: {
        'accept-language': 'en',
        countrycodes: 'us',
    }
});

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


// Add routes you'll be able to reach directly from METRO NEXT

function routeInfo(feature, layer) {
    if (feature.properties) {
        const info = `Route ${feature.properties.VAR_ROUTE} ` + 
                     (feature.properties.VAR_DIREC === 4 ? "Inbound" : "Outbound");
        layer.bindPopup(info);
    }
}
L.geoJSON(routes, {
    color: "red",
    onEachFeature: routeInfo
}).addTo(map);




// Add bus stops within 3/4 mile of zone

// marker settings for bus stops
const geojsonMarkerOptions = {
    radius: 4,
    fillcolor: "#fff",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// Pop up with stop info when clicked
function stopInfo(feature, layer) {
    if (feature.properties) {
        const info = `Route ${feature.properties.Route}, ` +
                     `${feature.properties.Direction}, ` +
                     `Stop #${feature.properties.Stop} - ${feature.properties.Description}`;
        layer.bindPopup(info);
    }
}

L.geoJSON(stops, {
    pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, geojsonMarkerOptions)
    },
    onEachFeature: stopInfo
}).addTo(map);

