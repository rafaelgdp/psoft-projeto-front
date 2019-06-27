import { getURL } from '../utils.js'
import './CourseSimpleView.js'

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

function checkUser() {
    // If has token and user, return true.
    return window.sessionStorage.accessToken != null && window.sessionStorage.getItem("user") != null
}

function updateUiWithUserInfo(user) {
    if (user != null) {
        let title = document.getElementById("greeting-title")
        title.innerHTML = "Bem-vind@, " + (user.firstName || "pessoa") + "!"
        document.getElementById("loadingMessage").style.display = "none"
        document.getElementById("app").style.visibility = "visible"
    } else {
        console.log("User chegou null")
    }
}

// main
let isLoadingPage = true
let loadPage = setTimeout(checkAndUpdate, 2000);
checkAndUpdate()

function checkAndUpdate() {
    console.log("Checking...")
    if (isLoadingPage) {
        if (checkUser()) {
            updateUiWithUserInfo(JSON.parse(window.sessionStorage.getItem("user")))
            isLoadingPage = false;
            clearTimeout(loadPage)
            console.log("Logged in!")
        } else {
            console.log("No user found...")
        }
    }
}

document.getElementById("searchBtn").onclick = function () {
    let searchString = document.getElementById("searchInput").value

    let host = config.host
    let port = config.port
    let searchUri = config["path-prefix"] + config["search-course-substring-uri"]

    let httpPostRequest = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(searchString)
    }

    let ok = false

    fetch(getURL(host, port, searchUri), httpPostRequest)
        .then((response) => {
            ok = response.ok
            return response.json()
        })
        .then((data) => {
            if (ok) {
                console.log("Recebi isto %O", data)
                renderCourses(data)
            }
        })
        .catch((error) => {
            console.log('Request failed: ', error);
        });
}

    function renderCourses(courses) {
        console.log("Here with %O", courses)
        let $courses = document.getElementById("coursesList");
        $courses.style.display = "block"
        $courses.innerHTML = '';

        if (courses.length == 0) {
            $courses.innerHTML = `<p>Nenhum curso encontrado! :(</p>`
        } else {
            courses.forEach(function (course) {
                let novo = document.createElement("simple-course");
                novo.setAttribute('id', course.id);
                novo.setAttribute('name', course.name);
                $courses.appendChild(novo);
            });
        }
    }

}) // end of fetch config