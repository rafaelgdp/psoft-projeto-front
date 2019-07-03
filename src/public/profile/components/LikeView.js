import { getURL } from "../../utils.js"

// Carregando configs
fetch('../../config.json').then((cr) => cr.json()).then((config) => {

class LikeView extends HTMLElement{
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.likes = JSON.parse(this.getAttribute('likes'));
        this.likeCount = this.likes.length
        this.people = ""
        let max = Math.min(this.likeCount, 10)
        if (max == 0) {
            this.people = "Ninguém curtiu esta disciplina ainda! :/"
        } else {
            let names = this.getAttribute('likes').replace(/\[|\]|"|'/g, '')
            names = names.replace(/,/g, ", ")
            this.people = names + " curtiram este curso."
        }
        this.render();
        this.$shadow.getElementById("likeBtn").onclick = function () {
            let user = JSON.parse(window.sessionStorage.getItem("user"))
            let token = window.sessionStorage.accessToken
            if (user == null || token == null) {
                alert("Há algum problema com a sessão, tente fazer login de novo!")
            } else {

                let host = config.host || "localhost"
                let port = config.port || 8080

                console.log("Config: %O", config)

                var url_string = window.location.href;
                var url = new URL(url_string);
                var id = url.searchParams.get("id");
                let addLikeUri = config["path-prefix"] + config["like-uri"] + "?courseid=" + id

                let httpPostRequest = {
                    method: "POST",
                    cache: "no-cache",
                    headers: {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(user)
                }
                fetch(getURL(host, port, addLikeUri), httpPostRequest)
                    .then((response) => {
                        if (response.ok) {
                            location.reload()
                        }
                    })
                    .catch((error) => {
                        console.log('Request failed: ', error);
                    });
                } // end of else user or token
        } // end of onclick function body
    }

    render() {
        this.btnText = "Curtir/Descurtir"
        this.$shadow.innerHTML =
            `   <link rel="stylesheet" href="./components/like.css">
                <div class="tooltip">
                    <p class="likes">Número de likes: ${this.likeCount}</p>
                    <span class="tooltiptext">${this.people}</span>
                    <button id="likeBtn">${this.btnText}</button>
                </div>
                
            `;
    }
}

window.customElements.define('like-view', LikeView)

})