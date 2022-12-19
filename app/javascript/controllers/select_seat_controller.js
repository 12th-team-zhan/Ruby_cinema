import { Controller } from "stimulus";
import consumer from '../channels/consumer';

export default class extends Controller {
    static targets = ["seatGrid", "next"];
    connect() {
        let params = new URLSearchParams(location.search);
        this.ticketAmount = Number(params.get('amount'));
        this.showtimeId = Number(params.get('showtimeid'));
        this.token = document.querySelector("meta[name='csrf-token']").content;
        //去空隔 [] 轉陣列
        this.notSeatList = this.element.dataset.notseatlist.replace(/[\"\[\]\s]/g, "").split(",").map(v => Number(v));
        this.maxRow = Number(this.element.dataset.maxrow);
        // +2欄位給英文排數
        this.maxColumn = Number(this.element.dataset.maxcolumn) + 2;
        this.makeSeatingChart(this.maxRow, this.maxColumn);
        this.otherSeat = {}
        this.selectSeat = [];
        //向API查詢以被選擇位子selected_tickets
        console.log(window.location.host);
        fetch(`/api/v1/selected_tickets`, {
            method: "POST",
            headers: {
                "X-CSRF-Token": this.token,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (Object.keys(json).length != 0) {
                    let seat
                    for (let [key, value] of Object.entries(json)) {
                        value.forEach((seatNumber => {
                            seat = document.querySelector(`.item${seatNumber}`)
                            seat.classList.add("bg-MediumPurple")
                            seat.disabled = true
                            this.otherSelect(key, seatNumber)
                        }))
                    }
                }
            })
            .catch(() => {
                console.log("error!!");
            });
        this.id = Math.round(Date.now() + Math.random())
        this.channel = consumer.subscriptions.create({ channel: 'SelectseatChannel', id: this.id }, {
            connected: this._cableConnected.bind(this),
            disconnected: this._cableDisconnected.bind(this),
            received: this._cableReceived.bind(this),
        });
    }

    makeSeatingChart(maxR, maxC) {
        this.seatGridTarget.style.cssText += `grid-template-rows: repeat(${maxR}, 1fr);grid-template-columns: repeat(${maxC}, 1fr);`;

        for (var r = 1; r <= maxR; r++) {
            for (let c = 0; c < maxC; c++) {
                if (c === 0 || c === maxC - 1) {
                    const item = `<div class="item item-alphabet mx-3">${String.fromCharCode(64 + r)}</div>`;
                    this.seatGridTarget.insertAdjacentHTML("beforeend", item);
                }
                else if (this.notSeatList.includes(((r - 1) * maxC + c))) {
                    const item = `<button class="item item-hidden" data-status="empty" data-row="${r}" data-column="${c}">${c}</button>`;
                    this.seatGridTarget.insertAdjacentHTML("beforeend", item);
                }
                else {
                    const item = `<button  class="item item${((r - 1) * maxC + c - (2 * (r - 1)))}" data-status="empty" data-row="${r}" data-column="${c}" value="${((r - 1) * maxC + c - (2 * (r - 1)))}" data-action="click->select-seat#changeSeatStatus">${c}</button>`;
                    this.seatGridTarget.insertAdjacentHTML("beforeend", item);
                }
            }
        }
    }

    changeSeatStatus(el) {
        const seatId = +el.target.value
        let seatStatus = el.target.dataset.status;
        if (this.selectSeat.length === this.ticketAmount && seatStatus === "empty") {
            let firstSelect = this.selectSeat.shift()
            let seatElement = document.querySelector(`.item${firstSelect}`)
            seatElement.classList.remove("bg-DodgerBlue");
            seatElement.dataset.status = "empty";
            fetch(`/ticketing/seat_reservation`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": this.token,
                },
                body: JSON.stringify({
                    status: "cancel",
                    seat_id: firstSelect,
                    id: this.id,
                })
            }).catch(() => {
                console.log("error!!");
            });
        }
        switch (seatStatus) {
            case "empty":
                el.target.classList.add("bg-DodgerBlue")
                el.target.dataset.status = "selected";
                this.selectSeat.push(seatId);
                fetch(`/ticketing/seat_reservation`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": this.token,
                    },
                    body: JSON.stringify({
                        status: "selected",
                        seat_id: el.target.value,
                        id: this.id,
                    })
                }).then(() => {
                    this.changeLink()
                }).catch(() => {
                    console.log("error!!");
                });

                break;
            case "selected":
                el.target.classList.remove("bg-DodgerBlue");
                el.target.dataset.status = "empty";
                const index = this.selectSeat.indexOf(seatId);
                this.selectSeat.splice(index, 1);
                fetch(`/ticketing/seat_reservation`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": this.token,
                    },
                    body: JSON.stringify({
                        status: "cancel",
                        seat_id: el.target.value,
                        id: this.id,
                    })
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

        if (data.id != this.id) {
            let seatElement;
            switch (data.status) {
                case "selected":
                    seatElement = document.querySelector(`.item${data.seat_id}`)
                    seatElement.classList.add("bg-MediumPurple")
                    seatElement.disabled = true
                    this.otherSelect(data.id, data.seat_id)
                    break

                case "cancel":
                    seatElement = document.querySelector(`.item${data.seat_id}`)
                    seatElement.classList.remove("bg-MediumPurple")
                    seatElement.disabled = false
                    this.otherCancel(data.id, data.seat_id)
                    break

                case "other_unsubscribed":
                    if (this.otherSeat[data.id] !== undefined) {
                        this.otherSeat[data.id].forEach(seat_id => {
                            seatElement = document.querySelector(`.item${seat_id}`)
                            seatElement.classList.remove("bg-MediumPurple")
                            seatElement.disabled = false
                        })
                    }
                    break
            }
        }
    }

    otherSelect(id, seat_id) {
        if (this.otherSeat[id] === undefined) {
            this.otherSeat[id] = [seat_id]
        }
        else {
            this.otherSeat[id].push(seat_id)
        }
    }
    otherCancel(id, seat_id) {
        this.otherSeat[id] = this.otherSeat[id].filter(item => item !== seat_id)
    }
    changeLink() {
        this.nextTarget.href = `/ticketing/pay?showtimeId=${this.showtimeId}&seatId=${this.selectSeat}`;
    }

}