import { getURL } from '../utils.js'
import "./LikeView.js"

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

    let host = config.host
    let port = config.port

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    let courseUri = config["path-prefix"] + config["course-profile-uri"] + "?id=" + id

    let httpGetRequest = {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    let ok = false

    fetch(getURL(host, port, courseUri), httpGetRequest)
        .then((response) => {
            ok = response.ok
            return response.json()
        })
        .then((data) => {
            if (ok) {
                updateUi(data)
            }
        })
        .catch((error) => {
            console.log('Request failed: ', error);
        });

    function updateUi(course) {
        console.log("Recovered this Course: ", course)
        renderLikes(course)
    }

    function renderLikes(course) {
        let $likes = document.getElementById("likeView");
        $likes.innerHTML = '';

        if (course == null) {
            $likes.innerHTML = `<p>Perfil não encontrado! :(</p>`
        } else {
            document.getElementById("courseName").innerText = "Nome: " + course.name
            let novo = document.createElement("like-view");
            novo.setAttribute('likes', course.userLikes || course.likes);
            $likes.appendChild(novo)            
        }
    }

}) // end of fetch config