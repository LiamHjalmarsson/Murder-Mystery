import { PubSub } from "../../../utilities/pubsub.js";
import { createElement, fadeInElement, fadeOutElement } from "../../js/functions.js";
import { getDocByClue, getFromDB, docUpdate, addDocAddData } from "../../../utilities/functions/firebase_functions.js";

export default {}

;(() => {

    PubSub.subscribe({
        event: "render_popup",
        listener: render_popup
    });

})();

function render_popup ( response ) {
    let app = document.querySelector("#app");
    let wrapperPopUp = createElement("div", "", "wrapperPopUp");
    app.appendChild(wrapperPopUp);

    let containerPopUp = createElement("div", "", "containerPopUp"); 
    wrapperPopUp.append(containerPopUp);

    let box = createElement("form", "", "box");
    containerPopUp.appendChild(box);

    box.innerHTML = `
        <div class="navContainer">
            <div class="navClose"> 
                <div class="close" id="popUpClose"> <i class="fa-solid fa-xmark"></i> </div>
            </div>
        </div>
        <h3 class="headerPopUp"> </h3>
        <div class="popUp"></div>
    `;

    document.querySelector("#popUpClose").addEventListener("click", () => {
        fadeOutElement(wrapperPopUp);
    });

    displayInformation(response);

    fadeInElement(wrapperPopUp);

}

function displayInformation ( res ) { 
    let { params, response } = res;

    let header = document.querySelector(".headerPopUp"); 
    let message = document.querySelector(".popUp"); 

    switch(params) {
        case "error":
            header.textContent = "Error!";
            message.textContent = response.error; 
        break;

        case "wrongGuess":
            header.textContent = "Ajdå du har gissat fel";
            message.textContent = response.data.timesGuessing === 1 ? `Du har nu gjort ${response.data.timesGuessing} av 2 din två försök till att fånga mördaren!` : `Du har nu gjort ditt sista försök och mördaren lyckades fly`; 
        break;

        case "correctGuess":
            header.textContent = "Du har lyckats lista ut vem mördaren var";
            message.textContent = `Mördaren var ${response.data.murderGuess}`; 
        break;

        case "locked":
            header.textContent = "Låst ledtråd";
            message.textContent = response.msg; 
        break;

        case "noTime":
            header.textContent = "Tiden har tagit slut";
        break;

        case "created":
            header.textContent = "Användare skapad";
            document.querySelector("#popUpClose").addEventListener("click", () => {
                PubSub.publish({
                    event: "render_startUp", 
                    detail: "login"
                });
            });
        break;

        case "completed": 
            header.textContent = "Du har nu kommit till slutet";
            message.textContent = ""; 
        break;

        case "guessMurder": 
            inputGuessMurder(response);
        break;

        default:
            inputPopUp(response);
        break;
    }
}

function inputPopUp (response) {
    let header = document.querySelector(".headerPopUp"); 
    let message = document.querySelector(".popUp"); 

    if (!response.gameIsFinished) { 
        header.textContent = "Skriv in kod";
        let input = createElement("input", "popUp_input", ""); 
        input.placeholder  = "Skriv in ditt svar";
        
        let button = createElement("button", "", ""); 
        button.textContent = "Skicka in ditt svar";
    
        message.append(input);
        document.querySelector("#box").append(button);
    
        formListener(response);
    } else {
        header.textContent = "Det går inte att skriva in fler koder";
    }

}

async function formListener (response) {
    let isClue = response.data.chapters.some(chapter => chapter.searchOnGoing);

    let allChapters = await getFromDB("storyTelling");
    
    let onGoingChapter = response.data.chapters.filter(chapter => chapter.onGoing)[0];
    if (onGoingChapter !== undefined) {
        let story = allChapters.filter(chapter => chapter.chapterId === onGoingChapter.chapter && onGoingChapter.onGoing)[0];
        if (isClue) {
            document.querySelector("#box").classList.add("puzzelClues");
        } else {
            document.querySelector("#box").classList.add("puzzelStory");
        }
    
        document.querySelector("#box").addEventListener("submit", async (e) => {
            e.preventDefault();
            let inputValue = document.querySelector(".popUp_input");
            let puzzel = await getDocByClue(e.target.className, inputValue.value, { response: {
                data: response.data,
                storys: story
            }}); 
    
            if (puzzel.params) {
                inputValue.classList.add("error");
            } else {
                inputValue.classList.remove("error");
    
                PubSub.publish({
                    event: "render_riddle",
                    detail: { 
                        response: {
                            data: response.data,
                            storys: story,
                            puzzel: puzzel
                        }
                    }
                }); 
            }
        });
    }
}

function inputGuessMurder (response) {
    let { data, character } = response;
    let header = document.querySelector(".headerPopUp"); 
    
    header.innerHTML = `Är du säker på att du vill gissa på <br> ${response.character.fullName}`;
    let btns = ["Ja", "Nej"];

    btns.forEach(btn => {
        let btnGuess = createElement("button", `guessMurderBtn${btn}` , "guessMurderBtn");
        btnGuess.textContent = btn;
        document.querySelector("#box").append(btnGuess);

        btnGuess.addEventListener("click", async (e) => {
            e.preventDefault();
            if (btnGuess.classList.contains("guessMurderBtnJa")) {

                await docUpdate("users", data.id, { murderGuess: character.id, timesGuessing: data.timesGuessing - 1 , murderGuessCorrect: character.isMurder } );

                document.querySelector("#wrapperPopUp").remove();

                let updateUser = await getFromDB("users", data.id);
                
                if (updateUser.murderGuessCorrect) {
                    
                    let userFinish = {
                        username: data.username,
                        murderGuessCorrect: true, 
                        UserStartedAt: data.createdAt
                    }

                    await addDocAddData("leadboard", userFinish);

                    PubSub.publish({
                        event: "leadboard",
                        detail: {
                            response: {
                                data: updateUser
                            }
                        }
                    });

                } else {

                    if (data.timesGuessing === 1) {
                        let userFinish = {
                            username: data.username,
                            murderGuessCorrect: false, 
                            UserStartedAt: data.createdAt
                        }

                        await addDocAddData("leadboard", userFinish);

                        PubSub.publish({
                            event: "leadboard", 
                            detail: {
                                response: {
                                    data: updateUser
                                }
                            }
                        });

                    } else {

                        PubSub.publish({
                            event: "render_map",
                            detail: {
                                response: {
                                    data: updateUser
                                }
                            }
                        });
    
                        setTimeout(() => {
                            PubSub.publish({
                                event: "render_popup",
                                detail: { 
                                    params: "wrongGuess", 
                                    response : {
                                        data: updateUser,
                                    }
                                }
                            }); 
                        }, 100);

                    }
                }
            } else {
                fadeOutElement(document.querySelector("#wrapperPopUp"));
            }
        });
    });
}