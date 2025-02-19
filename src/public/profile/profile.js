import { getURL, loadNavbar } from '../utils.js'
import "./components/LikeView.js"
import "./components/CommentView.js"
import "./components/NewCommentView.js"
import '../global_components/NavbarView.js'

// Carregando configuração
fetch('../config.json').then((cr) => cr.json()).then((config) => {
    
    loadNavbar()

    var pageId
    var pageName
    var token = window.sessionStorage.accessToken
    var user = JSON.parse(window.sessionStorage.getItem("user"))
    if (token != null && user != null) {

    var storedComments = []

    let host = config.host
    let port = config.port

    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    pageId = id;
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
            renderNewCommentView()
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
    } else {    // end of login check
        let $likes = document.getElementById("likeView");
        $likes.innerHTML = `<p>Você precisa logar para acessar os perfis.</p>`
    }
    
    function renderLikes(course) {
        let $likes = document.getElementById("likeView");
        $likes.innerHTML = '';
        if (course == null) {
            $likes.innerHTML = `<p>Perfil não encontrado! :(</p>`
        } else {
            document.getElementById("courseName").innerText = "Nome: " + course.name
            pageName = course.name
            let novo = document.createElement("like-view");
            console.log("%O", course)
            novo.setAttribute('likes', JSON.stringify(course.likes));
            $likes.appendChild(novo)
        }
    }

    function renderNewCommentView() {
        let $newCommentView = document.getElementById("newCommentView");
        $newCommentView.innerHTML = '';
        $newCommentView.appendChild(document.createElement("new-comment-view"));
    }

    function renderComments(comments) {
        console.log(comments)
        let $comments = document.getElementById("commentList");
        $comments.innerHTML = '';
        if (comments == null || comments.length == 0) {
            $comments.innerHTML = `<p>Não há comentários neste curso até agora.</p>`
        } else {
            storedComments = []
            comments.forEach(function(comment) {
                registerComment(comment)
              });
        }
        storedComments.sort(compareComment)
        for (var c in storedComments) {
            addCommentView(storedComments[c])
        }
    }

    function compareComment(a, b) {
        const da = a.date;
        const db = b.date;
        
        let comparison = 0;
        if (da < db) {
          comparison = 1;
        } else if (da > db) {
          comparison = -1;
        }
        return comparison;
    }

    function registerComment(comment) {
        storedComments.push(comment)
    }

    function addCommentView(comment) {
        let $comments = document.getElementById("commentList")
        let novo = document.createElement("comment-view");
        novo.setAttribute('commentid', comment.id);
        novo.setAttribute('author', comment.commentAuthor);
        novo.setAttribute('email', comment.email);
        novo.setAttribute('message', comment.message);
        novo.setAttribute('date', comment.date);
        $comments.appendChild(novo)
    }

}) // end of fetch config