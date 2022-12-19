import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["theaterList", "showtimeList", "showtime"];

  connect() {

  }

  addTheaterList(el) {
    this.theaterListTarget.replaceChildren();

    let option = `<option>請選擇影城</option>`;
    this.theaterListTarget.insertAdjacentHTML("beforeend", option);

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.movieId = el.target.value;
    fetch("/api/v1/theater_list", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie_id: this.movieId }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        data.forEach((element) => {
          let option = `<option value="${element.theater_id}" >${element.name}</option>`;
          this.theaterListTarget.insertAdjacentHTML("beforeend", option);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtimeList(el) {
    this.showtimeListTarget.replaceChildren();

    let option = `<option>請選擇日期</option>`;
    this.showtimeListTarget.insertAdjacentHTML("beforeend", option);

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.theaterId = el.target.value;
    fetch("/api/v1/showtime_list", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: this.movieId,
        theater_id: this.theaterId,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        this.showtime = data;
        data.forEach((element) => {
          let option = `<option value="${element[0]}" >${element[0]}</option>`;
          this.showtimeListTarget.insertAdjacentHTML("beforeend", option);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtime() {
    this.showtimeTarget.replaceChildren();
    let option = `<option>請選擇場次</option>`;
    this.showtimeTarget.insertAdjacentHTML("beforeend", option);

    this.showtime.map((showtime) => {
      if (showtime[0] === this.showtimeListTarget.value) {
        let option = `<option value="${showtime[2]}" >${showtime[1]}</option>`;
        this.showtimeTarget.insertAdjacentHTML("beforeend", option);
      }
    });
  }

  changeLink(e) {
    if (e.srcElement.value === "請選擇場次") {
      return
    }
    const link = document.querySelector("#rootBuyTickets");
    link.href = `/ticketing/select_tickets?showtimeid=${e.srcElement.value}`;
  }
}
