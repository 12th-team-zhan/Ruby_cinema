import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "theater",
    "showtimeDate",
    "showtime",
    "dateDropdownBtn",
    "showtimeSelect",
    "showtimeTable",
  ];

  addShowtimeDate(el) {
    this.resetShowtimeDate();

    this.dateDropdownBtnTarget.textContent = `《${el.target.textContent}》請選擇日期`;

    const token = document.querySelector("meta[name='csrf-token']").content;
    this.movieId = el.target.dataset.movieId;
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

        const date = [];
        let options = "";

        data.map((element) => {
          if (date.indexOf(element[0]) === -1) {
            date.push(element[0]);
          }
        });
        date.forEach((element) => {
          options += `<li class="dropdown-item bg-white text-center" data-action="click->movie-show-showtimes#addShowtime">${element}</li>`;
        });

        this.showtimeDateTarget.insertAdjacentHTML("beforeend", options);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtime(el) {
    this.resetShowtimeTable();

    const list = [];
    let content = "";

    this.showtime.map((showtime) => {
      if (showtime[0] === el.target.textContent) {
        list.push(showtime);
      }
    });

    list.forEach((showtime) => {
      content += `<tr>
            <td>${showtime[0]}</td>
            <td>${showtime[1]}</td>
            <td class="align-middle">
              <button class="btn btn-outline-Silver p-0 m-auto">
                <a href="/ticketing/select_tickets?showtimeid=${showtime[2]}" class="link-Silver d-block px-4 py-1">Go</a>
              </button>
            </td>
          </tr>`;
    });
    this.showtimeTarget.insertAdjacentHTML("beforeend", content);
  }

  resetShowtimeDate() {
    this.showtimeDateTarget.replaceChildren();
    this.showtimeSelectTarget.classList.replace("d-none", "d-block");
    this.showtimeTableTarget.classList.replace("d-block", "d-none");
  }

  resetShowtimeTable() {
    this.showtimeTarget.replaceChildren();
    this.showtimeTableTarget.classList.replace("d-none", "d-block");
  }
}
