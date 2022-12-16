import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["theater"];

  connect() {
    console.log(123);
  }

  checked() {
    console.log(this.theaterTarget.dataset);
    // console.log(this.theaterId);

    const token = document.querySelector("meta[name='csrf-token']").content;
    const id = this.theaterTarget.dataset.movieId;

    fetch(`/admin/movies/${id}/come_out`, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
      },
      body: JSON.stringify({ theater_id: this.theaterId }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);

        if (this.theaterTarget.dataset.status === "checked") {
          this.theaterTarget.dataset.status = "check";
        } else {
          this.theaterTarget.dataset.status = "checked";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
