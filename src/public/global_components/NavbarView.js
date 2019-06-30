import {getFrontURL}  from "../utils.js"

// Carregando configs
fetch('../../config.json').then((cr) => cr.json()).then((config) => {

class NavbarView extends HTMLElement {

    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.render()
        let logout = this.$shadow.getElementById("logout")
        if (logout != null) {
            logout.onclick = function () {
                window.sessionStorage.accessToken = null
                window.sessionStorage.setItem("user", null)
            }
        }
    }

    render() {
        if (window.sessionStorage.accessToken != null &&
            JSON.parse(window.sessionStorage.getItem("user")) != null) {
                let name = JSON.parse(window.sessionStorage.getItem("user")).firstName;
                this.$shadow.innerHTML =
                `<link rel="stylesheet" href="../global_components/navbar.css">
                <ul>
                    <li><a href="${getFrontURL(config, "home")}">UCDb</a></li>
                    <li><div><img src="../global_components/images/face.svg"><strong id="user">${name}</strong></div></li>
                    <li style="float:right"><a class="active" id="logout" href="${getFrontURL(config, "login")}">Logout</a></li>
                </ul>`;
            } else {
                this.$shadow.innerHTML =
                `<link rel="stylesheet" href="../global_components/navbar.css">
                <ul>
                    <li><a href="${getFrontURL(config, "home")}">UCDb</a></li>
                    <li><a href="${getFrontURL(config, "register")}">Register</a></li>
                    <li><a href="${getFrontURL(config, "login")}">Login</a></li>
                </ul>`;
            }
        
        }
    }

    window.customElements.define('navbar-view', NavbarView)

})