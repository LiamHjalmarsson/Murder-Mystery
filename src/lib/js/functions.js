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

export const fadeInElement = (element) => {
    setTimeout(() => {
        element.classList.add("fade-in");
    }, 100);

}

export const fadeOutElement = (element) => {
    element.classList.add("fade-out");
    setTimeout(() => {
        element.remove();
    }, 500);
}

export const fadeOutElementEmpetyApp = (element) => {
    element.classList.add("fade-out");
    setTimeout(() => {
        element.innerHTML = "";
    }, 500);
}