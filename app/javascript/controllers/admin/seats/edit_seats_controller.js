import { Controller } from "stimulus";
import { fetchWithParamsAndRedirect } from "../../lib/fetcher";

export default class extends Controller {
  connect() {
    this.maxRow = parseInt(this.element.dataset.maxrow);
    this.maxColumn = parseInt(this.element.dataset.maxcolumn);
    this.seatsNotAddedStr = this.element.dataset.notAdded;

    this.seatsNotAdded = this.seatsNotAddedStr
      .substring(1, this.seatsNotAddedStr.length - 1)
      .split(", ")
      .map((s) => {
        return parseInt(s.substring(1, s.length - 1));
      });
    this.seatsAll = [...Array(this.maxRow * this.maxColumn).keys()].map((x) => x + 1);

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
        let seatIdStr = (r - 1) * maxC + c;

        let columnId = `<div class="seat-item" data-seat-id=${(r - 1) * maxC + c} data-status="added" data-action="click->admin--seats--edit-seats#changeSeatStatus">${String(c).padStart(2, "0")}</div>`;
        if (this.seatsNotAdded.includes(seatIdStr)) {
          columnId = `<div class="seat-item bg-transparent text-dark" data-seat-id=${(r - 1) * maxC + c} data-status="not added" data-action="click->admin--seats--edit-seats#changeSeatStatus">${String(c).padStart(2, "0")}</div>`;
        }

        seatList += columnId;
      }
      seatList += RowId;
    }
    grid.insertAdjacentHTML("beforeend", seatList);
  }

  changeSeatStatus(el) {
    const seatId = +el.target.dataset.seatId;
    let seatStatus = el.target.dataset.status;

    switch (seatStatus) {
      case "not added":
        el.target.classList.remove("bg-transparent", "text-dark");

        el.target.dataset.status = "added";

        const index = this.seatsNotAdded.indexOf(seatId);
        this.seatsNotAdded.splice(index, 1);
        break;
      case "added":
        el.target.classList.add("bg-transparent", "text-dark");

        el.target.dataset.status = "not added";

        this.seatsNotAdded.push(seatId);
        break;
      default:
        console.log("We don't have the seat status");
    }
  }

  updateToTable() {
    const cinemaId = this.element.dataset.id;
    const path = `/admin/cinemas/${cinemaId}/seats/update`;

    this.seatsAdded = this.seatsAll.filter((s) => !this.seatsNotAdded.includes(s));
    const seats = { added: this.seatsAdded, notAdded: this.seatsNotAdded };

    fetchWithParamsAndRedirect(path, "PATCH", seats).catch((err) => {
      console.log(err);
    });
  }
}
