import {getFrontURL}  from "../utils.js"

// Carregando configs
fetch('../../config.json').then((cr) => cr.json()).then((config) => {
class CourseSimpleView extends HTMLElement {
    constructor() {
        super();
        this.$shadow = this.attachShadow({ "mode": "open" });
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.name = this.getAttribute('name');
        this.render();
    }

    render() {
        this.$shadow.innerHTML =
            `<link rel="stylesheet" href="course.css">
             <a href="${getFrontURL(config, "profile")}?id=${this.id}"><p class="id">${this.id} - ${this.name}</p></a>`;
    }
}

window.customElements.define('simple-course', CourseSimpleView)

})