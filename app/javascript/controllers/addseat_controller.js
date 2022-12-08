import { Controller } from "stimulus";


export default class extends Controller {
    connect() {
        this.seatsArr = {};
    }

    changeSeatStatus(el) {
        const seatId = +el.target.textContent;
        let seatStatus = el.target.dataset.status;

        const seatRow = Math.floor(seatId / 10) + 1;
        const seatColumn = seatId % 10;

        switch (seatStatus) {
            case "not added":
                el.target.classList.add("bg-danger");

                seatStatus = "added";
                el.target.dataset.status = seatStatus;

                const seatArr = [seatRow, seatColumn, seatStatus];
                this.seatsArr[seatId] = seatArr;
                break;
            case "added":
                el.target.classList.remove("bg-danger")

                seatStatus = "not added";
                el.target.dataset.status = seatStatus;

                delete this.seatsArr[seatId.toString()];
                break;
            default:
                console.log(123);
        }        
    }

    addToTable() {
        const token = document.querySelector("meta[name='csrf-token']").content;
        const cinemaId = this.element.dataset.id;
        const seats = {"seats": this.seatsArr}

        fetch(`/admin/cinemas/${cinemaId}/seats`, {
            method: "POST",
            headers: {
              "X-csrf-Token": token,
              "Content-Type": "application/json"
            },
            redirect: 'follow',
            body: JSON.stringify(seats)
          })
          .then((resp) => {
            if (resp.redirected) {
              window.location.href = resp.url;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }
}