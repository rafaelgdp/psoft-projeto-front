import { getURL } from '../utils.js'
import "./components/LikeView.js"
import "./components/CommentView.js"

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {

    let host = config.host
    let port = config.port

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    let courseUri = config["path-prefix"] + config["course-profile-uri"] + "?courseid=" + id

    let httpGetRequest = {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    let okLikes = false
    let okComments = false
    // Get course likes
    fetch(getURL(host, port, courseUri), httpGetRequest)
    .then((response) => {
        okLikes = response.ok
        return response.json()
    })
    .then((data) => {
        if (okLikes) {
            renderLikes(data)
        }
        // Get comments
        let courseCommentsUri = config["path-prefix"] + config["course-comments-uri"] + "?courseid=" + id
        return fetch(getURL(host, port, courseCommentsUri), httpGetRequest)
    })
    .then((response) => {
        console.log("getting comments")
        okComments = response.ok
        return response.json()
    })
    .then((data) => {
        console.log(okComments)
        if (okComments) {
            renderComments(data)
        }
    })
    .catch((error) => {
        console.log('Request failed: ', error);
    });

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

    function renderComments(comments) {
        console.log(comments)
        let $comments = document.getElementById("commentList");
        $comments.innerHTML = '';
        if (comments == null || comments.length == 0) {
            $comments.innerHTML = `<p>Nenhum comentário encontrado! :(</p>`
        } else {
            for (var cIndex in comments) {
                let comment = comments[cIndex];
                let novo = document.createElement("comment-view");
                novo.setAttribute('author', comment.commentAuthor);
                novo.setAttribute('message', comment.message);
                novo.setAttribute('date', comment.date);
                $comments.appendChild(novo)
            }
        }
    }

}) // end of fetch config