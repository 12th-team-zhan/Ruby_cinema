import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    this.maxRow = this.element.dataset.maxrow;
    this.maxColumn = this.element.dataset.maxcolumn;
    this.seatNotAdded = this.element.dataset.notAdded;

    this.makeSeatingChart(this.maxRow, this.maxColumn);
  }

  makeSeatingChart(maxR, maxC) {
    const grid = this.element.firstElementChild;

    grid.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC}, 1fr);`;
    
    for (var r = 1; r <= maxR; r++) {
      let row_index = String.fromCharCode(r + 64);
      for (let c = 1; c <= maxC; c++) {
        let seatIdStr = `"${((r-1)*maxC + c).toString()}"`;

        let item = `<div class="seat-item">${row_index}${String(c).padStart(2, '0')}</div>`;
        if (this.seatNotAdded.includes(seatIdStr)) {
          item = `<div class="seat-item bg-transparent">${row_index}${String(c).padStart(2, '0')}</div>`;
        }

        grid.insertAdjacentHTML("beforeend", item);      
      }
    }
  }
}