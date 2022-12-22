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
          let option = `<option value="${element[0]}" >${element[1]}</option>`;
          this.movieListTarget.insertAdjacentHTML("beforeend", option);
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

        data.map((element) => {
          if (date.indexOf(element[0]) === -1) {
            date.push(element[0]);
          }
        });
        date.forEach((element) => {
          let option = `<option value="${element}" >${element}</option>`;
          this.showtimeListTarget.insertAdjacentHTML("beforeend", option);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addTimeSelect() {
    this.resetTimeSelect();
    var i = 0;
    for (i = 0; i < 24; i++) {
      if (i < 10) {
        let option = `<option value="0${i}:00" >0${i}:00</option>`;
        this.startTimeTarget.insertAdjacentHTML("beforeend", option);
        this.endTimeTarget.insertAdjacentHTML("beforeend", option);
      } else {
        let option = `<option value="${i}:00:00" >${i}:00</option>`;
        this.startTimeTarget.insertAdjacentHTML("beforeend", option);
        this.endTimeTarget.insertAdjacentHTML("beforeend", option);
      }
    }
  }

  changeLink() {
    if (this.startTimeTarget.value <= this.endTimeTarget.value) {
      const link = document.querySelector("#rootSearchShowtime");
      link.href = `/find_showtimes/search?area=${this.areaTarget.value}&movie_id=${this.movieListTarget.value}&showtime=${this.showtimeListTarget.value}&startTime=${this.startTimeTarget.value}&endTime=${this.endTimeTarget.value}`;
    } else {
      alert("開始時間不得晚於結束時間");
    }
  }

  checkAreaData() {
    if (
      this.startTimeTarget.value === "0" ||
      this.endTimeTarget.value === "0"
    ) {
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
}
