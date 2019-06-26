import { parseJwt } from '../utils.js';
// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

function checkUser() {
    let token = window.localStorage.getItem("token")
    if (token == null) return false
    let parsedToken = parseJwt(token)
    if (parsedToken.user == null)
        return false
    return true
}

function updateUiWithUserInfo(user) {
    if (user != null) {
        let title = document.getElementById("greeting-title")
        title.innerHTML = "Bem-vind@, " + (user.firstName || "anônimo") + "!"
        console.log("Atualizei user..,.")
    } else {
        console.log("User chegou null")
    }
}

// main
let isLoadingPage = true
let loadPage = setTimeout(checkAndUpdate, 2000);

function checkAndUpdate() {
    console.log("Checking...")
    if (isLoadingPage) {
        if (checkUser()) {
            updateUiWithUserInfo(parseJwt(window.sessionStorage.accessToken).user)
            isLoadingPage = false;
            clearTimeout(loadPage)
            console.log("Logged in!")
        } else {
            console.log("No user found...")
        }
    }
}

}) // end of fetch config