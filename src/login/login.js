// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

    // Adicionando Utils.
    var imported = document.createElement('script');
    imported.src = '../utils.js';
    document.head.appendChild(imported);

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
                    window.localStorage.setItem("token", data.token);
                    window.localStorage.setItem("user", parseJwt(data.token).user)
                    alert("Logado com sucesso!")
                    updateLoggedInUi()
                }
            })
            .catch((error) => {
                console.log('Request failed: ', error);
            });
    }

    function updateLoggedInUi() {
        let user = window.localStorage.getItem("user")
        if (user != "undefined") {
            window.location.pathname = config['logged-uri']
        }
    }

}) // end of fetch config