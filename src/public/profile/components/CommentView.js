import { getURL } from "../../utils.js"

// Carregando configs
fetch('../../config.json').then((cr) => cr.json()).then((config) => {

class CommentView extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.commentid =  this.getAttribute('commentid');
        console.log(this.commentid);
        this.author = this.getAttribute('author');
        this.email = this.getAttribute('email');
        this.date = this.getAttribute('date');
        this.message = this.getAttribute('message');
        let user = window.sessionStorage.getItem("user")
        if (user != null && window.sessionStorage.accessToken != null) {
            this.user = JSON.parse(user)
            this.loginOK = true
        } else {
            this.loginOK = false
        }
        this.render();
        if (this.loginOK && this.user.email === this.email) {
            this.$shadow.getElementById("deleteBtn").addEventListener('click', onclickCallback.bind(this, this.commentid));

        function onclickCallback(commentid) {
            let host = config.host || "localhost"
            let port = config.port || 8080
            let deleteCommentUri = config["path-prefix"] + config["delete-comment-uri"] + "?commentid=" + commentid
            console.log("inside ", commentid)
            let httpPostRequest = {
                method: "DELETE",
                cache: "no-cache",
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
            fetch(getURL(host, port, deleteCommentUri), httpPostRequest)
                .then((response) => {
                    if (response.ok) {
                        location.reload()
                    } else {
                        alert("Ocorreu um erro com sua sessão. Faça login novamente!")
                    }
                })
                .catch((error) => {
                    console.log('Request failed: ', error);
                });
            } // end of onclick function body
        } // end if login ok
    }

    render() {
        this.$shadow.innerHTML =
            `<link rel="stylesheet" href="./components/comment.css">
             <hr>
             <p><span class="author">${this.author} (${this.email})</span> disse <span class="message" style="color: indigo; font-weight: bold;">${this.message}</span> em <time class="at">${this.date}</time>.</p>`;
             if (this.user.email === this.email) {
                 this.$shadow.innerHTML += `<button id="deleteBtn">Deletar</button>`;
             } else {
                 console.log("Not user")
             }
             this.$shadow.innerHTML += `<hr>`;
    }
}

window.customElements.define('comment-view', CommentView)

})