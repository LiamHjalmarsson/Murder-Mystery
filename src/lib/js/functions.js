import { PubSub } from "../../utilities/pubsub";

export const createElement = ( element, addclass, id ) => {
    let elemetTyp = document.createElement(element);
    addClass(addclass, elemetTyp);
    addId(id, elemetTyp);

    return elemetTyp;
}

export const addClass = (addclass, element) => {
    addclass === "" || undefined ? false : element.classList.add(addclass) ;
}

export const addId = (id, element) => {
    id === undefined || "" ? false : element.id = id ;
}

export const selectAll = (elemets) => {
    return document.querySelectorAll(elemets);
}