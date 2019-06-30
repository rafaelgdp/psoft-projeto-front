import { getURL } from "../../utils.js"

// Carregando configs
fetch('../../config.json').then((cr) => cr.json()).then((config) => {

class NewCommentView extends HTMLElement {

    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        let user = window.sessionStorage.getItem("user")
        if (user != null) {
            this.author = 
            this.date = this.getAttribute('date');
            this.message = this.getAttribute('message');
            this.loginOK = true
        } else {
            this.loginOK = false
        }
        this.render();
        if (this.loginOK) {
            this.$shadow.getElementById("addCommentBtn").onclick = function () {
                let commentInput = this.parentNode.getElementById("newCommentText")
                let message = commentInput.value
                if (message == "") {
                    alert("Não é possível adicionar comentários vazios!")
                } else {
                    let user = JSON.parse(window.sessionStorage.getItem("user"))
                    console.log("user %O", user)
                    let token = window.sessionStorage.accessToken
                    if (user == null || token == null) {
                        alert("Há algum problema com a sessão, tente fazer login de novo!")
                    } else {
                        // Tudo OK, vamos enviar o comentário!
                        const comment = JSON.stringify(
                            {
                              commentAuthor: {
                                email: user.email,
                              },
                              message: message
                            }
                          );
                        
                        let host = config.host || "localhost"
                        let port = config.port || 8080

                        console.log("Config: %O", config)
    
                        var url_string = window.location.href;
                        var url = new URL(url_string);
                        var id = url.searchParams.get("id");
                        let addCommentUri = config["path-prefix"] + config["new-comment-uri"] + "?courseid=" + id
                        
                        console.log(addCommentUri)

                        let httpPostRequest = {
                            method: "POST",
                            cache: "no-cache",
                            headers: {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: comment
                        }
                        let okComment = false
                        fetch(getURL(host, port, addCommentUri), httpPostRequest)
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
                    } // end of else user or token
                } // end of else message null
            } // end of onclick function body
        } // end if login ok
    } // end of connected callback

    render() {
        if (this.loginOK) {
            console.log("login view ok")
            this.$shadow.innerHTML =
            `<link rel="stylesheet" href="./components/new-comment.css">
             <input id="newCommentText" type="text" placeholder="Novo comentário">
             <button id="addCommentBtn">Adicionar</button>`;
        } else {
            `<p>Não é possível adicionar comentários por um problema no login.</p>`
        }
    }
}

window.customElements.define('new-comment-view', NewCommentView)

})