import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["theater", "cinemaList"];

  connect() {
  }

  addCinemaList(el) {
    this.cinemaListTarget.replaceChildren();
    let option = `<option>請選擇影廳</option>`;
    this.cinemaListTarget.insertAdjacentHTML("beforeend", option);

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.theaterId = el.target.value;
    fetch("/api/v1/cinema_list", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theater_id: this.theaterId }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        data.forEach((element) => {
          let option = `<option value="${element.id}" >${element.name}</option>`;
          this.cinemaListTarget.insertAdjacentHTML("beforeend", option);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
