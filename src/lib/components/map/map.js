import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getFromDB } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_map",
        listener: render_map
    });

    PubSub.subscribe({
        event: "update_map",
        listener: detail_map
    });

})();

// renders the map 
async function render_map ( { response } ) {
    let { data, myLocation } = response;
    
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let container_map = createElement("div", "", "container_map");
    app.appendChild(container_map);
    
    let mapBox = createElement("div", "", "map");
    container_map.append(mapBox);
    
    document.querySelector("#map").style.display = "flex";

    // gets the informations to display on the map 
    detail_map(data, myLocation);
}

async function detail_map(data, myLocation) {
    let map;
    // users chapters finds the chapters that are ongoing
    let userLocationsOnGoing = data.chapters.filter(chapter => chapter.onGoing)[0];
    // get all chapters
    let allChapters = await getFromDB("storyTelling");
    
    if (userLocationsOnGoing !== undefined) {
        // filter out to get the correct chapter details
        let userOnGoingChapter = allChapters.filter(chapter => chapter.chapterId === userLocationsOnGoing.chapter && userLocationsOnGoing.onGoing)[0];
        
        if (userLocationsOnGoing.searchOnGoing) {
            map = L.map('map').setView([userOnGoingChapter.locationSearch._lat, userOnGoingChapter.locationSearch._long], 16);
        } else {
            map = L.map('map').setView([userOnGoingChapter.locationCharacter._lat, userOnGoingChapter.locationCharacter._long], 16);
        }

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        addMarkers(map, userOnGoingChapter, userLocationsOnGoing);
        chaptersDone(map, allChapters, data);

        map.on('click', coordinatesAlert);

        PubSub.publish({
            event: "render_navigation",
            detail: {
                response: {
                    data: data,
                    storys: userOnGoingChapter
                }
            }
        });
    // if the users has no chapter that is ongoing 
    } else {
        map = L.map('map').setView([55.6050, 13.0038], 16);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        chaptersDone(map, allChapters, data);

        PubSub.publish({
            event: "render_navigation",
            detail: {
                response: {
                    data: data,
                }
            }
        });

        PubSub.publish({
            event: "render_popup",
            detail: {
                params: "completed",  
                response: {
                    data: data,
                }
            }
        }); 
    }
}

function addMarkers(map, userOnGoingChapter, userLocationsOnGoing) {
    let pinIcon = L.icon({
        iconUrl: '../../library/pin.png',
        iconSize: [38, 38], 
        iconAnchor: [18, 38],
        popupAnchor: [0, -31]
    });

    if (userLocationsOnGoing.searchOnGoing || !userOnGoingChapter.locationCharacter) {
        L.circle([userOnGoingChapter.locationSearch._lat, userOnGoingChapter.locationSearch._long], {
            radius: userOnGoingChapter.searchRadius
        }).addTo(map).bindPopup(userOnGoingChapter.character);
    } else {
        L.marker([userOnGoingChapter.locationCharacter._lat, userOnGoingChapter.locationCharacter._long], { icon: pinIcon })
            .addTo(map).bindPopup(userOnGoingChapter.character);
    }
}

function chaptersDone(map, allChapters, data) {
    let doneChapters = data.chapters.filter(chapter => chapter.completed);

    allChapters.forEach(chapterDb => {
        doneChapters.forEach(chapter => {
            if (chapter.chapter === chapterDb.chapterId) {
                let button = createElement('button', "", `foundCharacterMapBtn${chapterDb.chapterId}`);
                button.textContent = `Story ${chapterDb.chapterId}`;
                button.addEventListener('click', () => {
                    handleButtonClick(chapterDb, data);
                });
    
                let popupContent = createElement('div');
                popupContent.appendChild(button);
    
                L.marker([chapterDb.locationCharacter._lat, chapterDb.locationCharacter._long])
                .addTo(map).bindPopup(popupContent);
            }

            if (chapter.chapter === chapterDb.chapterId && chapter.paused) {
                L.circle([chapterDb.locationSearch._lat, chapterDb.locationSearch._long], {
                    radius: chapterDb.searchRadius,
                    color: "yellow"
                }).addTo(map).bindPopup("paused");
            }
    
            if (chapter.chapter === chapterDb.chapterId && chapter.searchDone) {
                L.circle([chapterDb.locationSearch._lat, chapterDb.locationSearch._long], {
                    radius: chapterDb.searchRadius,
                    color: "lightgreen",
                    fillOpacity: 0.4
                }).addTo(map).bindPopup("Search Completed");
            }
        });
    });

    function handleButtonClick(chapterDb, data) {
        PubSub.publish({
            event: "map_found_charater_interaction",
            detail: {
                response: {
                    data: data,
                    story: chapterDb,
                    found: true
                }
            }
        });
    }
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

function coordinatesAlert(e) {
    alert("latitude" + e.latlng);
}