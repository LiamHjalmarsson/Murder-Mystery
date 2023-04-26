export const createElement = ( element, addclass, id ) => {
    let elemetTyp = document.createElement(element);
    addClass(addclass, elemetTyp);
    addId(id, elemetTyp);

    return elemetTyp;
}

export const addClass = (addclass, element) => {

    if (addclass === "" || addclass === undefined ) {
        return false; 
    } else {
        element.classList.add(addclass)
    }
}

export const addId = (id, element) => {
    if (id === "" || id === undefined ) {
        return false; 
    } else {
        element.id = id ;
    }
}

