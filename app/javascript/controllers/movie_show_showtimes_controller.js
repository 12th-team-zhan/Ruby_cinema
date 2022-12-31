import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["theater", "showtimeDate"];

  connect() {}

  addShowtime(el) {
    // console.log(el.target);
    this.showtimeDateTarget.replaceChildren();

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
        console.log(data);

        // data.forEach((element) => {
        //   let content = "";
        //   content += `<tr>
        //   <td><%%></td>
        //   <td>${element[0]}</td> %>
        //   <td>${element[1]}</td> %>
        //   <td><a href="/ticketing/select_tickets?showtimeid=${element[2]}">前往購票</a></td>
        // </tr>`;
        //   this.showtimeDateTarget.insertAdjacentHTML("beforeend", content);
        // });

        const date = [];

        data.map((element) => {
          if (date.indexOf(element[0]) === -1) {
            date.push(element[0]);
          }
        });
        date.forEach((element) => {
          let option = `<option value="${element}" >${element}</option>`;
          this.showtimeDateTarget.insertAdjacentHTML("beforeend", option);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
