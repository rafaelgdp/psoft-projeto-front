import "../global_components/NavbarView.js"
import { getURL, loadNavbar } from '../utils.js'

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

loadNavbar()

document.getElementById("entrarBtn").onclick = async function () {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        "email": email,
        "password": password
    };

    let host = config.host
    let port = config.port
    let registerUri = config["path-prefix"] + config["login-uri"]

    let httpPostRequest = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    }

    let ok = false

    fetch(getURL(host, port, registerUri), httpPostRequest)
        .then((response) => {
            ok = response.ok
            if (response.status == 400) {
                alert("Usuário e/ou senha incorreto(s)!")
            }
            return response.json()
        })
        .then((data) => {
            if (ok) {
                window.sessionStorage.accessToken = data.token;
                window.sessionStorage.setItem("user", JSON.stringify(data.user))
                console.log("Logado com sucesso!")
                updateLoggedInUi()
            }
        })
        .catch((error) => {
            console.log('Request failed: ', error);
        });
}

function updateLoggedInUi() {
    let user = window.sessionStorage.getItem("user")
    if (user != "undefined") {
        window.location.pathname = config['front-home']
    }
}

}) // end of fetch config