import { Controller } from "stimulus";
import { fetchWithParams } from "../lib/fetcher";
import { addOptions, addOptionsWithConditions } from "../lib/add_options";
import { resetOptions } from "../lib/reset_dropdown_options";

export default class extends Controller {
  static targets = ["theaterList", "showtimeDate", "showtime", "movieList"];

  addTheaterList(el) {
    resetOptions(this.theaterListTarget, "請選擇影城");
    resetOptions(this.showtimeDateTarget, "請選擇日期");
    resetOptions(this.showtimeTarget, "請選擇場次");
    this.theaterListTarget.disabled = false;
    this.movieId = el.target.value;

    fetchWithParams("/api/v1/theater_list", "POST", { movie_id: this.movieId })
      .then((data) => {
        addOptionsWithConditions(data, this.theaterListTarget, "theater_id");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtimeDate(el) {
    resetOptions(this.showtimeDateTarget, "請選擇日期");
    resetOptions(this.showtimeTarget, "請選擇場次");
    this.showtimeDateTarget.disabled = false;
    this.theaterId = el.target.value;

    fetchWithParams("/api/v1/showtime_list", "POST", {
      movie_id: this.movieId,
      theater_id: this.theaterId,
    })
      .then((data) => {
        if (data.length !== 0) {
          this.showtime = data;
          const date = [];

          data.map((element) => {
            if (date.indexOf(element[0]) === -1) {
              date.push(element[0]);
            }
          });
          addOptions(date, this.showtimeDateTarget);
        } else {
          this.noComeOut();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtime() {
    resetOptions(this.showtimeTarget, "請選擇場次");
    this.showtimeTarget.disabled = false;
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

  noComeOut() {
    this.showtimeDateTarget.replaceChildren();
    this.showtimeTarget.replaceChildren();
    let dateOption = `<option>目前沒有場次</option>`;
    let timeOption = `<option value="0">目前沒有場次</option>`;
    this.showtimeDateTarget.insertAdjacentHTML("beforeend", dateOption);
    this.showtimeTarget.insertAdjacentHTML("beforeend", timeOption);
  }
}
