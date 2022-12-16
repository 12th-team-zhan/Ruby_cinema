import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["output"];

  connect() {}
  send() {
    const showtimeId = document.querySelector("#rootShowtime").value;

    const token = document.querySelector("meta[name='csrf-token']").content;
    fetch("/api/v1/go_buy_tickets", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showtime_id: showtimeId,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
