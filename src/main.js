// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

// leaflet imports
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// importing from Toolkit module
import { getJSONData } from "./Toolkit";

// defined the web app's data source
const SOURCE = "https://data.novascotia.ca/resource/wwaq-2akq.json";

// leaflet map object
let map;

// --------------------------------------------------------- event handlers
function onResponse(jsonData) {
    console.log(jsonData);

    for (let place of jsonData) {
        let {lat, long, english_placename:eng, inm_aite_s_a_gh_idhlig:gael} = place;

        // add marker to map for place
        let marker = L.marker([lat, long]).addTo(map);
        marker.bindTooltip(`<div class="g-tooltip"><b>${gael}</b><br>${eng}</div>`);
    }
}

// --------------------------------------------------------- main method
function main() {
    // initialize map
    map = L.map("map").setView([45.663966, -61.539917], 8);
    // set up tile provider for map object
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 12,
        attribution: "<div>&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></div>"
    }).addTo(map);

    getJSONData(SOURCE, onResponse, (error) => console.log(`*** an error has occurred: ${error.message}`));
}

main();