import { PubSub } from "../utilities/pubsub.js";
import { createElement } from "../lib/js/functions.js";
import { registerPlayer } from "../utilities/functions/firebase_auth.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_map",
        listener: render_map
    });

})();

async function render_map (data) {

    console.log(data);
    let { location } = data;

    let app = document.querySelector("#app");
    app.innerHTML = "";

    let container_map = createElement("div", "", "container_map");
    app.appendChild(container_map);

    let mapBox = createElement("div", "", "map");
    container_map.append(mapBox);
    
    // let db_locations = await getFromDB("locations");
    
    document.querySelector("#map").style.display = "flex";

    let map = L.map('map').setView([location.lat, location.long], 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
    document.getElementById('map').style.zIndex = 0;

    // let db_locations = getLocations();
    addMarkers(map, location);

    // getLocation(map);

    // click to get coordinates 
    // map.on('click', coordinatesAlert);
}

function addMarkers (map, location) {

    let pinIcon = L.icon({
        iconUrl: '../../library/pin.png',
        iconSize: [38, 38], // size of the icon
        iconAnchor: [18, 38], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([location.lat, location.long], { icon: pinIcon })
        .addTo(map).bindPopup(location.text);

}

function getLocation (map) {    

    navigator.geolocation.watchPosition(success);

    let marker, circle, zoomed;

    function success(position) {
    
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
    
        // Removes any existing marker and circule 
        if (marker) {
            map.removeLayer(marker);
        }

        if (circle) {
            map.removeLayer(circle);
        }
        // Adds marker to the map and a circle for accuracy
        marker = L.marker([latitude, longitude]).addTo(map);
        circle = L.circle([latitude, longitude], accuracy).addTo(map);
    
        // Set zoom to boundaries of accuracy circle
        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds()); 
        }
    
        // Set map focus to current user position
        map.setView([latitude, longitude]);
    }
}





        
    // db_locations.forEach(location => {

    //     if (location.type === "pin") {

    //         if (location.view) {
    //             L.marker([location.location._lat, location.location._long], { icon: pinIcon })
    //                 .addTo(map).bindPopup(location.text);
    //         }
    //     }

    //     if (location.type === "search") {

    //         if (location.view) {
    //             L.circle([location.location._lat, location.location._long], {
    //                 radius: location.radius
    //             }).addTo(map).bindPopup(location.text);
    //         }
    //     }

    // });


function coordinatesAlert(e) {
    alert("latitude" + e.latlng);
}

// function getLocation (map) {
//     if (!navigator.geolocation) {

//     } else {
//         setInterval(() => {
//             navigator.geolocation.getCurrentPosition(getPostion)
//         }, 5000);
//     }

//     let marker, circle

//     function getPostion (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         const accuracy = position.coords.accuracy;
    
//         if (marker) {
//             map.removeLayer(marker);
//         }

//         if (circle) {
//             map.removeLayer(circle);
//         }

//         marker = L.marker([latitude, longitude]).addTo(map)
//         circle = L.circle([latitude, longitude], accuracy).addTo(map);

//         // let featureGroup = L.featureGroup([marker, circle]).addTo(map);

//         // map.fitBounds(featureGroup.getBounds());
//         map.setView([latitude, longitude]);

//     }
// }


    // get the location
    // map.on('locationfound', onLocationFound);

    // function onLocationFound(e) {
    //     let  radius = e.accuracy;
    
    //     L.marker(e.latlng).addTo(map)
    //         .bindPopup("You location").openPopup();
    
    //     L.circle(e.latlng, radius).addTo(map);
    // }