function getURL(host, port, uri) {
    return "http://" + host + ":" + port + uri;
}

function debugLog(msg, config) {
    if(config.debug)
        console.log(msg)
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function loadNavbar() {
    let $navbar = document.getElementById("navbar");
    $navbar.innerHTML = '';
    $navbar.appendChild(document.createElement("navbar-view"));
}

function getFrontURL(config, page) {
    //return config["front-host"] + ":" + config["front-port"] + config["front-"+page]
    return ".." + config["front-"+page]
}

export { getURL, debugLog, parseJwt, loadNavbar, getFrontURL };