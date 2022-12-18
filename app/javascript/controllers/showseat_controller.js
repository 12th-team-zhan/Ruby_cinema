import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    const token = document.querySelector("meta[name='csrf-token']").content;
    const cinemaId = this.element.dataset.id;
    
    fetch(`/admin/cinemas/${cinemaId}/seats/index.json`, {
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
        let item = `<div class="seat-item">${row_index}${String(c + 1).padStart(2, '0')}</div>`;

        if (seats[r][c] == 1) {
          item = `<div class="seat-item bg-transparent">${row_index}${String(c + 1).padStart(2, '0')}</div>`;
        }

        grid.insertAdjacentHTML("beforeend", item);      
      }
    }
  }
}