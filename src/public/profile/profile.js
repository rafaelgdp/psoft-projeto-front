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

    function renderLikes(course) {
        let $likes = document.getElementById("likeView");
        $likes.innerHTML = '';
        if (course == null) {
            $likes.innerHTML = `<p>Perfil não encontrado! :(</p>`
        } else {
            document.getElementById("courseName").innerText = "Nome: " + course.name
            pageName = course.name
            let novo = document.createElement("like-view");
            novo.setAttribute('likes', course.userLikes || course.likes);
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
            registerComment(comments[0])
            if (comments.length > 1) {
                let commentArray = comments[0].commentCourse.comments // comment array
                console.log("Got this %O", commentArray)
                for (var i in commentArray) {
                    if (isComment(commentArray[i])) {
                        let c = getComment(commentArray[i])
                        registerComment(c)
                        let authorComments = commentArray[i].commentAuthor.comments
                        console.log("Author array: %O", authorComments)
                        for(var j in authorComments) {
                            if (isComment(authorComments[j])) {
                                registerComment(authorComments[j])
                            }
                        }
                    }
                }
            }
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
        if (da > db) {
          comparison = 1;
        } else if (da < db) {
          comparison = -1;
        }
        return comparison;
    }

    function isComment(c) {
        if (c == null) return false
        let attrs = ['commentAuthor', 'date', 'message']
        for (var attr in attrs) {
            if (c[attrs[attr]] == null)
                return false
        }
        if (c.commentCourse.id == pageId || c.commentCourse == pageId ||
            c.name == pageName)
            return true
        // console.log("Estou dizendo que isto não é comentario: %O", c)
        return false
    }

    function getComment(c) {
        let a = "";
        if (c.commentAuthor.email != null) {
            a = c.commentAuthor.email
        } else {
            a = c.commentAuthor
        }
        return {
            commentAuthor: a,
            message: c.message,
            date: c.date
        }
    }

    function registerComment(comment) {
        storedComments.push(comment)
    }

    function addCommentView(comment) {
        let $comments = document.getElementById("commentList")
        let novo = document.createElement("comment-view");
        novo.setAttribute('author', comment.commentAuthor);
        novo.setAttribute('message', comment.message);
        novo.setAttribute('date', comment.date);
        $comments.appendChild(novo)
    }

}) // end of fetch config