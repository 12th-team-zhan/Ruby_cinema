import { Controller } from "stimulus";


export default class extends Controller {
    connect() {
      this.seatsArr = {};
      this.maxRow = this.element.dataset.maxrow;
      this.maxColumn = this.element.dataset.maxcolumn;
      this.makeSeatingChart(this.maxRow, this.maxColumn);
    }

    makeSeatingChart(maxR, maxC) {
      const grid = this.element.firstElementChild;

      grid.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC}, 1fr);`;
      
      for (var r = 1; r <= maxR; r++) {
        for (let c = 1; c <= maxC; c++) {
          const item = `<div class="item" data-status="not added" data-action="click->addseat#changeSeatStatus">${(r-1)*maxC + c}</div>`;

          grid.insertAdjacentHTML("beforeend", item);      
        }
      }
    }

    changeSeatStatus(el) {
        const seatId = +el.target.textContent;
        let seatStatus = el.target.dataset.status;

        const seatRow = Math.floor(seatId / this.maxRow) + 1;
        const seatColumn = seatId % this.maxColumn;

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
        const seats = {"seats": this.seatsArr};
      
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
            console.log(resp);
            // if (resp.redirected) {
            //   window.location.href = resp.url;
            // }
          })
          .catch((err) => {
            console.log(err);
          });
    }
}