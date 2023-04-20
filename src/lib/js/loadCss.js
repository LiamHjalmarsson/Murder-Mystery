function loadCssFile(filename) {
    let head = document.getElementsByTagName("head");
    let link = document.createElement("link");

    let path = "./src/css/"
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `${path}${filename}.css`;
    head[0].appendChild(link);
}

loadCssFile("root");
loadCssFile("style");
loadCssFile("start_up");
loadCssFile("component_loading");
loadCssFile("map");