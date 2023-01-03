import { Controller } from "stimulus";
import consumer from "../channels/consumer";

export default class extends Controller {
  static targets = ["seatGrid", "next"];
  connect() {
    console.log(123);
    let params = new URLSearchParams(location.search);
    this.url = new URL("ticketing", location.origin);
    this.url.searchParams.append("showtimeId", params.get("showtimeid"));
    for (const [key, value] of params) {
      this.url.searchParams.append(key, value);
    }
    this.showtime_id = params.get("showtimeid");
    this.ticketAmount = Number(params.get("amount"));
    this.token = document.querySelector("meta[name='csrf-token']").content;
    //去空隔 [] 轉陣列
    this.notSeatList = this.element.dataset.notseatlist
      .replace(/[\"\[\]\s]/g, "")
      .split(",")
      .map((v) => Number(v));
    this.maxRow = Number(this.element.dataset.maxrow);
    // +2欄位給英文排數
    this.maxColumn = Number(this.element.dataset.maxcolumn);
    this.makeSeatingChart(this.maxRow, this.maxColumn);
    this.otherSeat = {};
    this.selectSeat = [];
    //向API查詢以被選擇位子selected_tickets
    fetch(`/api/v1/selected_tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.token,
      },
      body: JSON.stringify({
        showtime_id: this.showtime_id,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (Object.keys(json).length != 0) {
          let seat;
          for (let [key, value] of Object.entries(json)) {
            value.forEach((seatNumber) => {
              seat = document.querySelector(`.item${seatNumber}`);
              seat.classList.add("bg-MediumPurple");
              seat.disabled = true;
              this.otherSelect(key, seatNumber);
            });
          }
        }
      })
      .catch(() => {
        console.log("error!!");
      });
    this.id = Math.round(Date.now() + Math.random());
    this.channel = consumer.subscriptions.create(
      {
        channel: "SelectseatChannel",
        id: this.id,
        showtime_id: params.get("showtimeid"),
      },
      {
        connected: this._cableConnected.bind(this),
        disconnected: this._cableDisconnected.bind(this),
        received: this._cableReceived.bind(this),
      }
    );
  }

  makeSeatingChart(maxR, maxC) {
    this.seatGridTarget.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC + 2}, 1fr);`;

    let seatingChart = "";
    for (var r = 1; r <= maxR; r++) {
      const itemAlphabet = `<div class="item item-alphabet mx-3">${String.fromCharCode(64 + r)}</div>`;
      seatingChart += itemAlphabet;
      for (let c = 1; c <= maxC; c++) {
        let item = `<button  class="item item${(r - 1) * maxC + c}" data-status="empty" data-row="${r}" data-column="${c}" value="${(r - 1) * maxC + c}" data-action="click->select-seat#changeSeatStatus">${c}</button>`;

        if (this.notSeatList.includes((r - 1) * maxC + c)) {
          item = `<button class="item item-hidden" data-status="empty" data-row="${r}" data-column="${c}">${c}</button>`;
        }
        seatingChart += item;
      }
      seatingChart += itemAlphabet;
    }
    this.seatGridTarget.insertAdjacentHTML("beforeend", seatingChart);
  }

  changeSeatStatus(el) {
    let seatStatus = el.target.dataset.status;
    if (this.selectSeat.length >= this.ticketAmount) {
      switch (seatStatus) {
        case "empty":
          let firstSelect = String(this.selectSeat.shift());
          fetch(`/ticketing/seat_reservation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": this.token,
            },
            body: JSON.stringify({
              status: "cancel",
              seat_id: firstSelect,
              showtime_id: this.showtime_id,
              id: this.id,
            }),
          }).catch(() => {
            console.log("error!!");
          });
          break;
        case "selected":
          const index = this.selectSeat.indexOf(el.target.value);
          this.selectSeat.splice(index, 1);
          fetch(`/ticketing/seat_reservation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": this.token,
            },
            body: JSON.stringify({
              status: "cancel",
              seat_id: el.target.value,
              showtime_id: this.showtime_id,
              id: this.id,
            }),
          }).catch(() => {
            console.log("error!!");
          });
          break;
      }
    }
    switch (seatStatus) {
      case "empty":
        fetch(`/ticketing/seat_reservation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": this.token,
          },
          body: JSON.stringify({
            status: "selected",
            seat_id: el.target.value,
            showtime_id: this.showtime_id,
            id: this.id,
          }),
        }).catch(() => {
          console.log("error!!");
        });

        break;
      case "selected":
        fetch(`/ticketing/seat_reservation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": this.token,
          },
          body: JSON.stringify({
            status: "cancel",
            seat_id: el.target.value,
            showtime_id: this.showtime_id,
            id: this.id,
          }),
        }).catch(() => {
          console.log("error!!");
        });

        break;
      default:
        console.log("We don't have the seat status");
    }
  }
  _cableConnected() {
    // Called when the subscription is ready for use on the server.
  }

  _cableDisconnected() {
    // Called when the subscription has been terminated by the server
  }

  _cableReceived(data) {
    let seatElement;

    if (data.id === this.id) {
      switch (data.status) {
        case "selected":
          seatElement = document.querySelector(`.item${data.seat_id}`);
          seatElement.dataset.status = "selected";
          seatElement.classList.add("bg-DodgerBlue");
          this.selectSeat.push(data.seat_id);
          break;

        case "cancel":
          seatElement = document.querySelector(`.item${data.seat_id}`);
          seatElement.classList.remove("bg-DodgerBlue");
          seatElement.dataset.status = "empty";
          break;

        case "fail":
          alert("位子已被選取");
          break;
      }
      this.changeLink();
    } else {
      switch (data.status) {
        case "selected":
          seatElement = document.querySelector(`.item${data.seat_id}`);
          seatElement.classList.add("bg-MediumPurple");
          seatElement.disabled = true;
          this.otherSelect(data.id, data.seat_id);
          break;

        case "cancel":
          seatElement = document.querySelector(`.item${data.seat_id}`);
          seatElement.classList.remove("bg-MediumPurple");
          seatElement.disabled = false;
          this.otherCancel(data.id, data.seat_id);
          break;

        case "other_unsubscribed":
          if (this.otherSeat[data.id] !== undefined) {
            this.otherSeat[data.id].forEach((seat_id) => {
              seatElement = document.querySelector(`.item${seat_id}`);
              seatElement.classList.remove("bg-MediumPurple");
              seatElement.disabled = false;
            });
          }
          break;
      }
    }
  }

  otherSelect(id, seat_id) {
    if (this.otherSeat[id] === undefined) {
      this.otherSeat[id] = [seat_id];
    } else {
      this.otherSeat[id].push(seat_id);
    }
  }

  otherCancel(id, seat_id) {
    this.otherSeat[id] = this.otherSeat[id].filter((item) => item !== seat_id);
  }

  changeLink() {
    this.url.searchParams.append("seatId", this.selectSeat);
    this.nextTarget.href = this.url;
  }
}
