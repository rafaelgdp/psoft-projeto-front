class CommentView extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.author = this.getAttribute('author');
        this.date = this.getAttribute('date');
        this.message = this.getAttribute('message');
        this.render();
    }

    render() {
        this.$shadow.innerHTML =
            `<link rel="stylesheet" href="./components/comment.css">
             <hr>
             <p><span class="author">${this.author}</span> disse <span class="message" style="color: indigo; font-weight: bold;">${this.message}</span> em <time class="at">${this.date}</time>.</p>
             <hr>`;
    }
}

window.customElements.define('comment-view', CommentView)