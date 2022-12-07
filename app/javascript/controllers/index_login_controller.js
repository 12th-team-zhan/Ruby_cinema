import { Controller } from "stimulus";


export default class extends Controller {
    static targets = ["password", "email", "passwordLabel", "emailLabel", "login"];


    initialize() {
        this.emailValue = false
        this.passwordValue = false
    }

    connect() { }
    addClassAt(e) {
        switch (e.srcElement.autocomplete) {
            case "current-password":
                this.passwordLabelTarget.classList.add("input-at")
                break;
            case "email":
                this.emailLabelTarget.classList.add("input-at")
                break;
        }
    }
    removeClassAt(e) {
        if (e.target.value) {
            switch (e.srcElement.autocomplete) {
                case "current-password":
                    this.passwordLabelTarget.classList.remove("input-at")
                    this.passwordLabelTarget.classList.add("input-at2")
                    break;
                case "email":
                    this.emailLabelTarget.classList.remove("input-at")
                    this.emailLabelTarget.classList.add("input-at2")
                    break;
            }
            this.inputValueStatus(e.srcElement.autocomplete, true)
        }
        else {
            switch (e.srcElement.autocomplete) {
                case "current-password":
                    this.passwordLabelTarget.classList.remove("input-at")
                    this.passwordLabelTarget.classList.remove("input-at2")
                    break;
                case "email":
                    this.emailLabelTarget.classList.remove("input-at")
                    this.emailLabelTarget.classList.remove("input-at2")
                    break;
            }
            this.inputValueStatus(e.srcElement.autocomplete, false)
        }
        this.loginAt()
    }

    test(e) {
        if (e.srcElement.value) {
            this.inputValueStatus(e.srcElement.autocomplete, true)
        }
        else {
            this.inputValueStatus(e.srcElement.autocomplete, false)
        }
        this.loginAt()
    }

    loginAt() {
        if (this.emailValue && this.passwordValue) {
            this.loginTarget.disabled = false
            this.loginTarget.classList.add("login-at")
        } else {
            this.loginTarget.disabled = true
            this.loginTarget.classList.remove("login-at")
        }
    }

    inputValueStatus(inputName, booleanValue) {
        switch (inputName) {
            case "current-password":
                this.emailValue = booleanValue
                break;
            case "email":
                this.passwordValue = booleanValue
                break;
        }
    }
    clearInput() {
        this.emailTarget.value = ""
        this.passwordTarget.value = ""
        this.emailValue = false
        this.passwordValue = false
        this.passwordLabelTarget.classList.remove("input-at2")
        this.emailLabelTarget.classList.remove("input-at2")
        this.loginAt()
    }
    Modal(e) {
        if (e.target.id === "Modal") {
            this.clearInput()
        }
    }

    inputAt(inputName, atType) { }

}