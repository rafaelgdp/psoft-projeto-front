class LikeView extends HTMLElement{
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.likes = this.getAttribute('likes');
        this.likeCount = this.likes.length
        this.render();
    }

    render() {
        this.$shadow.innerHTML =
            `<p class="likes">Número de likes: ${this.likeCount}</p>`;
    }
}

window.customElements.define('like-view', LikeView)