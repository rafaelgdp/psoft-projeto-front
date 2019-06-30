import { getURL, loadNavbar } from '../utils.js'
import './CourseSimpleView.js'
import '../global_components/NavbarView.js'

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

loadNavbar()

let searchList = []

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
let loadPage = setInterval(checkAndUpdate, 2000);
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
                addCourseToList(data)
            }
        })
        .catch((error) => {
            console.log('Request failed: ', error);
        });
    }

    function renderCourseList(actual) {
        if (actual.length > searchList.length) {
            setTimeout(function() { renderCourseList(actual) }, 100)
        } else {
            clearTimeout(renderCourseList)
            searchList.sort((a, b) => {
                if (a.id > b.id) {
                    return 1
                } else if (a.id < b.id) {
                    return -1
                }
                return 0
            })
            searchList.forEach(function (course) {
                let $courses = document.getElementById("coursesList")
                let novo = document.createElement("simple-course");
                novo.setAttribute('id', course.id);
                novo.setAttribute('name', course.name);
                $courses.appendChild(novo);
            })
        }
    }

    function addCourseToList(courses) {
        
        searchList = []
        
        let $courses = document.getElementById("coursesList");
        $courses.style.display = "block"
        $courses.innerHTML = '';

        if (courses.length == 0) {
            $courses.innerHTML = `<p>Nenhum curso encontrado! :(</p>`
        } else {
            courses.forEach(function (course) {
                if (course.id != null) {
                    searchList.push({
                        id: course.id,
                        name: course.name
                    })
                } else {
                        // If this happens, there was a bug
                        let host = config.host
                        let port = config.port
            
                        let courseUri = config["path-prefix"] + config["course-profile-uri"] + "?courseid=" + course
            
                        let httpGetRequest = {
                            method: "GET",
                            cache: "no-cache",
                            headers: {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            }
                        }

                        fetch(getURL(host, port, courseUri), httpGetRequest)
                        .then((response) => {
                            return response.json()
                        })
                        .then((course) => {
                            searchList.push({
                                id: course.id,
                                name: course.name
                            })
                        })
                    }
            });
            renderCourseList(courses)
        }
    }

}) // end of fetch config