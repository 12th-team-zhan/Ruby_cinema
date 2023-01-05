import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    this.maxRow = parseInt(this.element.dataset.maxrow);
    this.maxColumn = parseInt(this.element.dataset.maxcolumn);
    this.seatNotAdded = this.element.dataset.notAdded;

    this.makeSeatingChart(this.maxRow, this.maxColumn);
  }

  makeSeatingChart(maxR, maxC) {
    const grid = this.element.firstElementChild;
    grid.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC + 2}, 1fr);`;

    let seatList = "";
    for (var r = 1; r <= maxR; r++) {
      let RowId = `<div class="text-center text-dark">${String.fromCharCode(r + 64)}</div>`;
      seatList += RowId;
      for (let c = 1; c <= maxC; c++) {
        let seatIdStr = `"${((r - 1) * maxC + c).toString()}"`;

        let columnId = `<div class="seat-item">${String(c).padStart(2, "0")}</div>`;
        if (this.seatNotAdded.includes(seatIdStr)) {
          columnId = `<div class="seat-item bg-transparent text-dark">${String(c).padStart(2, "0")}</div>`;
        }

        seatList += columnId;
      }
      seatList += RowId;
    }
    grid.insertAdjacentHTML("beforeend", seatList);
  }
}
