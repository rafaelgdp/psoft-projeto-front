class CommentView extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.likes = this.getAttribute('comment');
        this.likeCount = this.likes.length
        this.render();
    }

    render() {
        this.$shadow.innerHTML =
            `<p class="likes">Número de likes: ${this.likeCount}</p>`;
    }
}

window.customElements.define('comment-view', LikeView)