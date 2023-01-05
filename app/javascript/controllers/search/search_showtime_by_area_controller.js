import { Controller } from "stimulus";
import { fetchWithParams } from "../lib/fetcher";
import { resetOptions } from "../lib/reset_dropdown_options";
import { addOptions } from "../lib/add_options";

export default class extends Controller {
  static targets = [
    "area",
    "movieList",
    "showtimeList",
    "startTime",
    "endTime",
  ];

  addMovieList(el) {
    resetOptions(this.movieListTarget, "請選擇電影");
    resetOptions(this.showtimeListTarget, "請選擇日期");
    this.movieListTarget.disabled = false;
    this.resetTimeSelect();

    this.areaId = el.target.value;

    fetchWithParams(`/find_showtimes/add_movie_list`, "POST", {
      area: this.areaId,
    })
      .then((data) => {
        let options = "";

        data.forEach((element) => {
          options += `<option value="${element[0]}" >${element[1]}</option>`;
        });

        this.movieListTarget.insertAdjacentHTML("beforeend", options);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtimeList(el) {
    resetOptions(this.showtimeListTarget, "請選擇日期");
    this.resetTimeSelect();
    this.movieId = el.target.value;
    this.showtimeListTarget.disabled = false;

    fetchWithParams(`/find_showtimes/add_showtime_list`, "POST", {
      movie_id: this.movieId,
    })
      .then((data) => {
        const date = [];

        if (data.length !== 0) {
          data.map((element) => {
            if (date.indexOf(element[0]) === -1) {
              date.push(element[0]);
            }
          });
          addOptions(date, this.showtimeListTarget);
        } else {
          this.noComeOut();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addTimeSelect() {
    this.resetTimeSelect();

    this.startTimeTarget.disabled = false;
    this.endTimeTarget.disabled = false;
    let options = "";

    var i = 6;
    for (i; i < 25; i++) {
      options += `<option value="${this.autoSupplement(
        i.toString()
      )}:00" >${this.autoSupplement(i.toString())}:00</option>`;
    }
    this.startTimeTarget.insertAdjacentHTML("beforeend", options);
    this.endTimeTarget.insertAdjacentHTML("beforeend", options);
  }

  changeLink(e) {
    if (this.startTimeTarget.value <= this.endTimeTarget.value) {
      const link = document.querySelector("#rootSearchShowtime");
      const params = new URLSearchParams({
        area: this.areaTarget.value.toString(),
        movie_id: this.movieListTarget.value.toString(),
        showtime: this.showtimeListTarget.value.toString(),
        startTime: this.startTimeTarget.value.toString(),
        endTime: this.endTimeTarget.value.toString(),
      });
      link.href = `/find_showtimes/search?${params}`;
    } else {
      e.preventDefault();
      alert("開始時間不得晚於結束時間");
    }
  }

  checkAreaData(e) {
    if (
      this.startTimeTarget.value === "0" ||
      this.endTimeTarget.value === "0"
    ) {
      e.preventDefault();
      const link = document.querySelector("#rootSearchShowtime");
      link.href = `#`;
      alert("請填寫查詢時段");
    }
  }

  resetTimeSelect() {
    resetOptions(this.startTimeTarget, "時段(起)");
    resetOptions(this.endTimeTarget, "時段(迄)");
  }

  autoSupplement(timeHour) {
    return timeHour.padStart(2, "0");
  }

  noComeOut() {
    this.showtimeListTarget.replaceChildren();
    let Option = `<option>目前沒有場次</option>`;
    this.showtimeListTarget.insertAdjacentHTML("beforeend", Option);
  }
}
