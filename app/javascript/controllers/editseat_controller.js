import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    const token = document.querySelector("meta[name='csrf-token']").content;
    const cinemaId = this.element.dataset.id;
    
    fetch(`/admin/cinemas/${cinemaId}/seats/edit.json`, {
      method: "GET",
      headers: {
        "X-csrf-Token": token,
      },
    })
    .then((resp) => {
      return resp.json()
    })
    .then(({seatsArr}) => {
      this.seatsAll = seatsArr;

      this.maxRow = seatsArr.length;
      this.maxColumn = seatsArr[0].length;

      this.makeSeatingChart(this.seatsAll, this.maxRow, this.maxColumn);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  makeSeatingChart(seats, maxR, maxC) {
    const grid = this.element.firstElementChild;

    grid.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC}, 1fr);`;
    
    for (var r = 0; r < maxR; r++) {
      let row_index = String.fromCharCode(r + 65);
      for (let c = 0; c < maxC; c++) {
        let item = `<div class="seat-item" data-row-id=${r} data-column-id=${c} data-status="added" data-action="click->editseat#changeSeatStatus">${row_index}${String(c + 1).padStart(2, '0')}</div>`;

        if (seats[r][c] == 1) {
          item = `<div class="seat-item bg-transparent" data-row-id=${r} data-column-id=${c} data-status="not added" data-action="click->editseat#changeSeatStatus">${row_index}${String(c + 1).padStart(2, '0')}</div>`;
        }

        grid.insertAdjacentHTML("beforeend", item);      
      }
    }
  }

  changeSeatStatus(el) {
    const rowId = +el.target.dataset.rowId;
    const columnId = +el.target.dataset.columnId;
    let seatStatus = el.target.dataset.status;

    switch (seatStatus) {
      case "not added":
        el.target.classList.remove("bg-transparent")

        el.target.dataset.status = "added";

        this.seatsAll[rowId][columnId] = 0;
        break;
      case "added":
        el.target.classList.add("bg-transparent");

        el.target.dataset.status = "not added";

        this.seatsAll[rowId][columnId] = 1;
        break;
      default:
        console.log("We don't have the seat status");
    }        
  }

  updateToTable() {
    const token = document.querySelector("meta[name='csrf-token']").content;
    const cinemaId = this.element.dataset.id;

    const seats = {"seats": this.seatsAll}

    fetch(`/admin/cinemas/${cinemaId}/seats`, {
      method: "PATCH",
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