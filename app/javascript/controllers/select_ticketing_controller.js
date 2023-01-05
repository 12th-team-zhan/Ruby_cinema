import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "allTotal",
    "next",
    "total",
    "allAmount",
    "amount",
    "regularAmount",
    "concessionAmount",
    "elderlyAmount",
    "disabilityAmount",
  ];

  connect() {
    this.calcAllTotal();
    let params = new URLSearchParams(location.search);
    this.showtimeId = params.get("showtimeid");
  }

  select(e) {
    e.srcElement.parentElement.parentElement.children[2].textContent =
      "$" +
      Number(e.srcElement.value) *
      Number(e.srcElement.parentElement.parentElement.children[0].textContent.substring(1));
    this.calcAllTotal();
    this.calcAllAmount();

    const event = new CustomEvent("update-typelist", {
      detail: {
        Quantity: e.target.value,
        ticketType: e.srcElement.parentElement.parentElement.parentElement.children[0].children[0].textContent,
      },
    });
    window.dispatchEvent(event);
  }

  calcAllTotal() {
    let allPrice = 0;
    this.allTotalTarget.textContent = "";
    this.totalTargets.forEach((e) => {
      allPrice = allPrice + Number(e.textContent.substring(1));
    });
    this.allTotalTarget.textContent = "$" + allPrice;
    if (allPrice > 0) {
      this.nextTarget.classList.remove("d-none");
    } else {
      this.nextTarget.classList.add("d-none");
    }
  }

  calcAllAmount() {
    let allAmount = 0;
    this.allAmountTarget.textContent = "";
    this.amountTargets.forEach((e) => {
      allAmount = allAmount + Number(e.value);
    });
    this.changeLink(allAmount);
  }

  changeLink(amount) {
    const params = new URLSearchParams({
      showtimeid: this.showtimeId.toString(),
      authenticity_token: document.querySelector("meta[name='csrf-token']").content,
      regularAmount: this.regularAmountTarget.value.toString(),
      concessionAmount: this.concessionAmountTarget.value.toString(),
      elderlyAmount: this.elderlyAmountTarget.value.toString(),
      disabilityAmount: this.disabilityAmountTarget.value.toString(),
    });
    this.nextTarget.action = `/ticketing/tickets?${params}`;
  }
}
