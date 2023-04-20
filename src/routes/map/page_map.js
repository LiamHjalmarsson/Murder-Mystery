import { PubSub } from "../../utilities/pubsub.js";
import { setDoc } from "firebase/firestore";
import { colRef, docRef, getFromDB } from "../../firebase/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render::Map",
        listener: render
    });

})();

function render () {

    document.querySelector("#app").innerHTML = "";

    document.querySelector("#map").style.display = "flex";

    let map = L.map('map').setView([55.6065, 13.0100], 18);

    map.locate({setView: true, maxZoom: 16});

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // click to get coordinates 
    map.on('click', getLocation);

    // adds all the markers to map 
    addMarkers(map);
    
    // searh(map);

    // get the location
    map.on('locationfound', onLocationFound);

    function onLocationFound(e) {
        let  radius = e.accuracy;
    
        L.marker(e.latlng).addTo(map)
            .bindPopup("You location").openPopup();
    
        L.circle(e.latlng, radius).addTo(map);
    }

}

function addMarkers (map) {

    // add all locations in db 
    let locations = [
        {
            type: "search",
            location: [55.608627, 13.005227],
            text: "This is a search area"
        }, 
        {
            type: "pointer",
            location: [55.607421, 13.006632],
            text: "Murder"
        },
        {
            type: "pointer",
            location: [55.608178, 13.005677],
            text: "Name"
        }
    ]

    locations.forEach(element => {
        switch(element.type) {
            case "pointer":
                addMarker(element.location).addTo(map).bindPopup(element.text);
                break;
            case "search":
                addSearchArea(element.location, 20).addTo(map).bindPopup(element.text);
        }
    });

}

function addMarker (location, icon) {
    return L.marker(location, icon);
}

function addSearchArea (location, area) {
    return L.circle(location, {
        radius: area
    });
}

function getLocation(e) {
    alert("latitude" + e.latlng);
}

function searh (map) {
    navigator.geolocation.watchPosition(success);

    function success(position) {
        let marker, circle, zoomed;
    
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
    
        // Removes any existing marker and circule 
        if (marker) {
            map.removeLayer(marker);
            map.removeLayer(circle);
        }
    
        // Adds marker to the map and a circle for accuracy
        marker = addMarker([latitude, longitude]).addTo(map);
        circle = addSearchArea([latitude, longitude], accuracy).addTo(map);
    
        // Set zoom to boundaries of accuracy circle
        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds()); 
        }
    
        // Set map focus to current user position
        map.setView([latitude, longitude]);
    
    }
}
