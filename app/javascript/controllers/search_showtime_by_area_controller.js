import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "area",
    "movieList",
    "showtimeList",
    "startTime",
    "endTime",
  ];

  connect() {}

  addMovieList(el) {
    this.resetMovie();
    this.resetShowtime();
    this.resetTimeSelect();

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.areaId = el.target.value;
    fetch("/find_showtimes/add_movie_list", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ area: this.areaId }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        data.forEach((element) => {
          let options = "";
          options += `<option value="${element[0]}" >${element[1]}</option>`;
          this.movieListTarget.insertAdjacentHTML("beforeend", options);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtimeList(el) {
    this.resetShowtime();
    this.resetTimeSelect();

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.movieId = el.target.value;
    fetch("/find_showtimes/add_showtime_list", {
      method: "POST",
      headers: {
        "X-csrf-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: this.movieId,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        const date = [];
        if (data.length !== 0) {
          data.map((element) => {
            if (date.indexOf(element[0]) === -1) {
              date.push(element[0]);
            }
          });
          date.forEach((element) => {
            let options = "";
            options += `<option value="${element}" >${element}</option>`;
            this.showtimeListTarget.insertAdjacentHTML("beforeend", options);
          });
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

    var i = 6;
    for (i; i < 25; i++) {
      let options = "";
      options += `<option value="${this.autoSupplement(
        i.toString()
      )}:00" >${this.autoSupplement(i.toString())}:00</option>`;
      this.startTimeTarget.insertAdjacentHTML("beforeend", options);
      this.endTimeTarget.insertAdjacentHTML("beforeend", options);
    }
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

  resetMovie() {
    this.movieListTarget.replaceChildren();
    let movieOption = `<option>請選擇電影</option>`;
    this.movieListTarget.insertAdjacentHTML("beforeend", movieOption);
  }

  resetShowtime() {
    this.showtimeListTarget.replaceChildren();
    let dateOption = `<option>請選擇日期</option>`;
    this.showtimeListTarget.insertAdjacentHTML("beforeend", dateOption);
  }

  resetTimeSelect() {
    this.startTimeTarget.replaceChildren();
    this.endTimeTarget.replaceChildren();

    let startTimeOption = `<option value="0">時段(起)</option>`;
    let endTimeOption = `<option value="0">時段(迄)</option>`;
    this.startTimeTarget.insertAdjacentHTML("beforeend", startTimeOption);
    this.endTimeTarget.insertAdjacentHTML("beforeend", endTimeOption);
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
