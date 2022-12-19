import { Controller } from "stimulus"

export default class extends Controller {
    static targets = [""]

    connect() {
        console.log("Text");
        this.setupTrix()
    }
    setupTrix() {
        Trix.config.textAttributes.fontSize = {
            styleProperty: "font-size",
            inheritable: 1
        }

        this.trix = this.element.querySelector("trix-editor")
    }
}