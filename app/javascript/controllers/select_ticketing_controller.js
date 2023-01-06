import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "form",
    "titleTotal",
    "next",
    "total",
    "nextAmount",
    "amount",
    "regularAmount",
    "concessionAmount",
    "elderlyAmount",
    "disabilityAmount",
  ];

  connect() {
    this.calcTotal();
    let params = new URLSearchParams(location.search);
    this.showtimeId = params.get("showtimeid");
  }

  select(e) {
    e.srcElement.parentElement.parentElement.children[2].textContent =
      "$" +
      Number(e.srcElement.value) *
      Number(e.srcElement.parentElement.parentElement.children[0].textContent.substring(1));
    this.calcTotal();
    this.calcAmount();

    const event = new CustomEvent("update-typelist", {
      detail: {
        Quantity: e.target.value,
        ticketType: e.srcElement.parentElement.parentElement.parentElement.children[0].children[0].textContent,
      },
    });
    window.dispatchEvent(event);
  }

  calcTotal() {
    let allPrice = 0;
    this.titleTotalTarget.textContent = "";
    this.totalTargets.forEach((e) => {
      allPrice = allPrice + Number(e.textContent.substring(1));
    });
    this.titleTotalTarget.textContent = "$" + allPrice;
    if (allPrice > 0) {
      this.nextTarget.classList.remove("d-none");
    } else {
      this.nextTarget.classList.add("d-none");
    }
  }

  calcAmount() {
    let allAmount = 0;
    this.nextAmountTarget.textContent = "";
    this.amountTargets.forEach((e) => {
      allAmount = allAmount + Number(e.value);
    });
    const html = `已選取${allAmount}張票`
    this.nextAmountTarget.innerHTML = html;
    this.changeLink(allAmount);
  }

  changeLink() {
    const params = new URLSearchParams({
      showtimeid: this.showtimeId.toString(),
      authenticity_token: document.querySelector("meta[name='csrf-token']").content,
      regularAmount: this.regularAmountTarget.value.toString(),
      concessionAmount: this.concessionAmountTarget.value.toString(),
      elderlyAmount: this.elderlyAmountTarget.value.toString(),
      disabilityAmount: this.disabilityAmountTarget.value.toString(),
    });
    this.formTarget.action = `/ticketing/tickets?${params}`;
  }

  submit() {
    this.formTarget.submit()
  }
}
