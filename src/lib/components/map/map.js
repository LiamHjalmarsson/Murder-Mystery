import { PubSub } from "../../../utilities/pubsub.js";
import { createElement } from "../../js/functions.js";
import { getFromDB, updateArrayMap, deleteArrayMap } from "../../../utilities/functions/firebase_functions.js";

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

async function render_map ( { response } ) {
    let { data, tracking } = response;
    
    let app = document.querySelector("#app");
    app.innerHTML = "";

    let container_map = createElement("div", "", "container_map");
    app.appendChild(container_map);
    
    let mapBox = createElement("div", "", "map");
    document.querySelector("#container_map").append(mapBox);
    
    document.querySelector("#map").style.display = "flex";
    
    PubSub.publish({
        event: "render_navigation",
        detail: {
            response: {
                data: data,
            }
        }
    });

    detail_map(data, tracking);
}

async function detail_map(data, tracking) {
    let map;

    let userLocationsOnGoing = data.chapters.filter(chapter => chapter.onGoing)[0];
    let allChapters = await getFromDB("storyTelling");

    if (userLocationsOnGoing !== undefined) {

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

    } else {
        map = L.map('map').setView([55.60547, 13.002362], 16);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        chaptersDone(map, allChapters, data);
    }

    map.setMaxBounds(map.getBounds().pad(1,2));
    // map.on('click', coordinatesAlert);
    if (tracking) {
        getLocation(map); 
        document.querySelector("#topRight").classList.add("active");
    } else {
        document.querySelector("#topRight").classList.remove("active");
        let trackUser = getLocation();
        trackUser.removeTracking();
    }
}

function addMarkers(map, userOnGoingChapter, userLocationsOnGoing) {
    let pinIcon = L.icon({
        iconUrl: '../../library/redPin.png',
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
    let pinIcon = L.icon({
        iconUrl: '../../library/bluePin.png',
        iconSize: [38, 38], 
        iconAnchor: [18, 38],
        popupAnchor: [0, -31]
    });

    let paused = L.icon({
        iconUrl: '../../library/paused.png',
        iconSize: [38, 38], 
        iconAnchor: [18, 38],
        popupAnchor: [0, -31]
    });

    let doneChapters = data.chapters.filter(chapter => chapter);

    allChapters.forEach(chapterDb => {
        doneChapters.forEach(chapter => {

            if (chapter.chapter === chapterDb.chapterId && chapter.searchDone) {
                L.circle([chapterDb.locationSearch._lat, chapterDb.locationSearch._long], {
                    radius: chapterDb.searchRadius,
                    color: "lightgreen",
                    fillOpacity: 0.4
                }).addTo(map).bindPopup("Search Completed");
            }
            
            if (chapter.chapter === chapterDb.chapterId && chapter.paused) {
                let button = createElement('button', "", `foundCharacterMapBtn${chapterDb.chapterId}`);
                button.textContent = `${chapterDb.character}`;
                button.addEventListener('click', () => {
                    // handleButtonClickPaused(data);
                });
    
                let popupContent = createElement('div');
                popupContent.appendChild(button);

                if (chapter.searchOnGoing) {
                    L.circle([chapterDb.locationSearch._lat, chapterDb.locationSearch._long], {
                        radius: chapterDb.searchRadius,
                        color: "yellow"
                    }).addTo(map).bindPopup(popupContent);
                } else {
                    L.marker([chapterDb.locationCharacter._lat, chapterDb.locationCharacter._long], { icon: paused })
                        .addTo(map).bindPopup(popupContent);
                }
            }
            
            if (chapter.chapter === chapterDb.chapterId && chapter.completed) {
                let button = createElement('button', "", `foundCharacterMapBtn${chapterDb.chapterId}`);
                button.textContent = `${chapterDb.character}`;
                button.addEventListener('click', () => {
                    // handleButtonClick(chapterDb, data);
                });
    
                let popupContent = createElement('div');
                popupContent.appendChild(button);
    
                L.marker([chapterDb.locationCharacter._lat, chapterDb.locationCharacter._long], { icon: pinIcon })
                .addTo(map).bindPopup(popupContent);
            }
        });
    });
}

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

async function handleButtonClickPaused(data) {
    let completedChapterTrue= data.chapters.some(chapter => chapter.paused && chapter.completed);
    let pausedChapterIndex = data.chapters.findIndex(chapter => chapter.paused);
    let pausedChapterTrue = data.chapters.some(chapter => chapter.paused);
    let onGoingIndex = data.chapters.findIndex(chapter => chapter.onGoing);

    await deleteArrayMap("users", data.id, "chapters", onGoingIndex);
    
    if(completedChapterTrue) {
        await updateArrayMap("users", data.id, "chapters", pausedChapterIndex, {
                paused: false, onGoing: true, searchOnGoing: true
        });
    } 
    else if (pausedChapterTrue) {
        await updateArrayMap("users", data.id, "chapters", pausedChapterIndex, {
            paused: false, onGoing: true
        });
    }

    let updateUser = await getFromDB("users", data.id);

    PubSub.publish({
        event: "render_map",
        detail: {
            response: {
                data: updateUser
            }
        }
    });
}

function getLocation(map) {
    let watchId;
    let marker, circle, zoomed;

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let accuracy = position.coords.accuracy;

        if (marker) {
            map.removeLayer(marker);
        }

        if (circle) {
            map.removeLayer(circle);
        }

        marker = L.marker([latitude, longitude]).addTo(map);
        circle = L.circle([latitude, longitude], accuracy).addTo(map);

        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds());
        }

        map.setView([latitude, longitude]);
    }

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(success);
    }

    function removeTracking() {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
        }
    }

    return {
        removeTracking: removeTracking
    };
}

function coordinatesAlert(e) {
    alert("latitude" + e.latlng);
}