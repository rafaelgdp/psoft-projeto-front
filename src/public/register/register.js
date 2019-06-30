import { getURL, loadNavbar } from '../utils.js'
import "../global_components/NavbarView.js"

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

loadNavbar()

document.getElementById("submitBtn").onclick = register;

function register() {

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    };

    for (let p in user) {
        if (user[p] == "") {
            // If any field's empty, cancel operation!
            alert("Campo com '" + p + "' está vazio!")
            return
        }
    }

    let host = config.host
    let port = config.port
    let registerUri = config['path-prefix'] + config['register-uri']

    let httpRequest = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    }

    let ok = false;

    fetch(getURL(host, port, registerUri), httpRequest)
    .then((response) => {
        if (response.status == 406) {
            alert("Já existe um usuário com esse email cadastrado!")
        } else {
            if (response.ok) {
                ok = true
            } else {
                alert("Ocorreu algum erro!")
            }
        }
        return response.json()
    })
    .then((data) => {
        if (ok) {
            alert("Usuário criado '" + data.email + "' com sucesso!")
            window.location.pathname = config['login-page']
        }
    })
    .catch((error) => {
        console.log('Request failed: ', error);
        alert("Erro: " + error)
    });
}

}) // end of fetch config
