import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["benefits", "terms", "register", "termsConfirmed"];

  connect() {
    if (document.querySelector(".field_with_errors")) {
      this.benefitsTarget.classList.replace("d-block", "d-none");
      this.registerTarget.classList.replace("d-none", "d-block");
    }
  }

  confirm() {
    if (document.getElementById("TermsCheckbox").checked) {
      this.termsConfirmedTarget.classList.replace("disabled", "action");
    } else {
      this.termsConfirmedTarget.classList.replace("action", "disabled");
    }
  }

  benefitsNext() {
    this.benefitsTarget.classList.replace("d-block", "d-none");
    this.termsTarget.classList.replace("d-none", "d-block");
  }

  termsBack() {
    this.termsTarget.classList.replace("d-block", "d-none");
    this.benefitsTarget.classList.replace("d-none", "d-block");
  }

  termsNext() {
    this.termsTarget.classList.replace("d-block", "d-none");
    this.registerTarget.classList.replace("d-none", "d-block");
  }

  registerBack() {
    this.registerTarget.classList.replace("d-block", "d-none");
    this.termsTarget.classList.replace("d-none", "d-block");
  }
}
