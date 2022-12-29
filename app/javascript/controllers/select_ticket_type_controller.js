import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "regular",
    "concession",
    "elderly",
    "disability",
  ];

  setTicketType(typeTarget, quantity, ticketType) {
    if (typeTarget.textContent === "" || quantity !== "0") {
      typeTarget.textContent = `${ticketType}${quantity}`;
    } else {
      typeTarget.textContent = "";
    }
  }

  addRegularType(e) {
    if (e.detail.ticketType === "全票") {
      this.setTicketType(this.regularTarget, e.detail.Quantity, "全票");
    }
  }

  addConcessionType(e) {
    if (e.detail.ticketType === "優待票") {
      this.setTicketType(this.concessionTarget, e.detail.Quantity, "優待票");
    }
  }

  addElderlyType(e) {
    if (e.detail.ticketType === "敬老票") {
      this.setTicketType(this.elderlyTarget, e.detail.Quantity, "敬老票");
    }
  }

  addDisabilityType(e) {
    if (e.detail.ticketType === "愛心票") {
      this.setTicketType(this.disabilityTarget, e.detail.Quantity, "愛心票");
    }
  }
}
