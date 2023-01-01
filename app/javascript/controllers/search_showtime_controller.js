import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["theaterList", "showtimeDate", "showtime", "movieList"];

  addTheaterList(el) {
    this.resetTheaterList();
    this.resetShowtimeDate();
    this.resetShowtime();

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
        let options = "";

        data.forEach((element) => {
          options += `<option value="${element.theater_id}" >${element.name}</option>`;
        });

        this.theaterListTarget.insertAdjacentHTML("beforeend", options);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtimeDate(el) {
    this.resetShowtimeDate();
    this.resetShowtime();

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
        if (data.length !== 0) {
          this.showtime = data;

          const date = [];
          let options = "";

          data.map((element) => {
            if (date.indexOf(element[0]) === -1) {
              date.push(element[0]);
            }
          });
          date.forEach((element) => {
            options += `<option value="${element}" >${element}</option>`;
          });
          this.showtimeDateTarget.insertAdjacentHTML("beforeend", options);
        
        } else {
          this.noComeOut();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtime() {
    this.resetShowtime();

    let options = "";

    this.showtime.map((showtime) => {
      if (showtime[0] === this.showtimeDateTarget.value) {
        options += `<option value="${showtime[2]}" >${showtime[1]}</option>`;
      }
    });

    this.showtimeTarget.insertAdjacentHTML("beforeend", options);
  }

  changeLink() {
    const link = document.querySelector("#rootBuyTickets");
    link.href = `/ticketing/select_tickets?showtimeid=${this.showtimeTarget.value}`;
  }

  checkBookingData(e) {
    if (this.showtimeTarget.value === "0") {
      e.preventDefault();
      const link = document.querySelector("#rootSearchShowtime");
      link.href = `#`;
      alert("請填寫查詢場次");
    }
  }

  resetTheaterList() {
    this.theaterListTarget.replaceChildren();
    let theaterOption = `<option>請選擇影城</option>`;
    this.theaterListTarget.insertAdjacentHTML("beforeend", theaterOption);
  }

  resetShowtimeDate() {
    this.showtimeDateTarget.replaceChildren();
    let dateOption = `<option>請選擇日期</option>`;
    this.showtimeDateTarget.insertAdjacentHTML("beforeend", dateOption);
  }

  resetShowtime() {
    this.showtimeTarget.replaceChildren();
    let timeOption = `<option value="0">請選擇場次</option>`;
    this.showtimeTarget.insertAdjacentHTML("beforeend", timeOption);
  }

  noComeOut() {
    this.showtimeDateTarget.replaceChildren();
    this.showtimeTarget.replaceChildren();
    let dateOption = `<option>目前沒有場次</option>`;
    let timeOption = `<option value="0">目前沒有場次</option>`;
    this.showtimeDateTarget.insertAdjacentHTML("beforeend", dateOption);
    this.showtimeTarget.insertAdjacentHTML("beforeend", timeOption);
  }
}
