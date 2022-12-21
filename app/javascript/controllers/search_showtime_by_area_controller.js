import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["movieList", "showtimeList", "startTime", "endTime"];

  connect() {
    this.addTimeSelect();
  }

  addMovieList(el) {
    this.movieListTarget.replaceChildren();
    let movieOption = `<option>請選擇電影</option>`;
    this.movieListTarget.insertAdjacentHTML("beforeend", movieOption);

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.areaId = el.target.value;
    fetch("/api/v1/search_seat_movie_list", {
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
    this.showtimeListTarget.replaceChildren();

    let dateOption = `<option>請選擇日期</option>`;

    this.showtimeListTarget.insertAdjacentHTML("beforeend", dateOption);

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.movieId = el.target.value;
    fetch("/api/v1/search_seat_showtime_list", {
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
    var i = 0;
    for (i = 0; i < 24; i++) {
      let option = `<option value="${i}" >${i}:00</option>`;
      this.startTimeTarget.insertAdjacentHTML("beforeend", option);
      this.endTimeTarget.insertAdjacentHTML("beforeend", option);
    }
  }

  changeLink(e) {
    e.preventDefault();
    console.log(this.movieListTarget.value);
    const link = document.querySelector("#rootSearchShowtime");
    // link.href = `/movies/:id/find_showtime?movieid=${this.movieListTarget.value}&startTime=${this.startedTimeTarget.value}&endTime=${this.startedTimeTarget.value}`;
  }
}
