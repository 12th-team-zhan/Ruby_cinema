import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["ticketForm", "setForm", "ticketBtn", "setBtn"];

  formSwitch(e) {
    e.preventDefault();
    switch (e.target.textContent) {
      case "快速訂票":
        this.ticketBtnTarget.children[0].classList.add("fs-scale");
        this.ticketBtnTarget.disabled = true;
        this.setBtnTarget.children[0].classList.remove("fs-scale");
        this.setBtnTarget.disabled = false;
        this.setFormTarget.classList.add("item-hidden");
        this.ticketFormTarget.classList.remove("item-hidden");
        break;
      case "快搜空位":
        this.ticketBtnTarget.children[0].classList.remove("fs-scale");
        this.ticketBtnTarget.disabled = false;
        this.setBtnTarget.children[0].classList.add("fs-scale");
        this.setBtnTarget.disabled = true;
        this.setFormTarget.classList.remove("item-hidden");
        this.ticketFormTarget.classList.add("item-hidden");
        break;
    }
  }
}
