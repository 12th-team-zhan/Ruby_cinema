import { Controller } from "stimulus";
import { fetchWithParams } from "../lib/fetcher";
import { addList } from "../lib/add_options";

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

    this.movieId = el.target.dataset.movieId;
    this.theaterId = el.target.value;

    fetchWithParams("/api/v1/showtime_list", "POST", {
      movie_id: this.movieId,
      theater_id: this.theaterId,
    })
      .then((data) => {
        this.showtime = data;

        const date = [];

        data.map((element) => {
          if (date.indexOf(element[0]) === -1) {
            date.push(element[0]);
          }
        });

        addList(
          date,
          this.showtimeDateTarget,
          "click->search--movie-show-showtimes#addShowtime"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addShowtime(el) {
    this.resetShowtimeTable();

    const date = [];
    let content = "";

    this.showtime.map((showtime) => {
      if (showtime[0] === el.target.textContent) {
        date.push(showtime);
      }
    });

    date.forEach((showtime) => {
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
