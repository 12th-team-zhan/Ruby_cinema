import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["cancelBtn", "orderStatus"];

  connect() {
    this.setOrderState(this.element.dataset.canceled === "cancel");
  }

  cancel() {
    const token = document.querySelector("meta[name='csrf-token']").content;
    const id = this.element.dataset.id;

    fetch(`/orders/${id}/cancel`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
      },
    })
      .then((resp) => resp.json())
      .then(({ status }) => {
        this.setOrderState(status === "cancel");
        this.orderStatusTarget.textContent = "cancel";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setOrderState(state) {
    if (state) {
      this.cancelBtnTarget.classList.add("disabled");
    }
  }
}
