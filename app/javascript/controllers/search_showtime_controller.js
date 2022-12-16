import { Controller } from "stimulus";


export default class extends Controller {
    static targets = ["theaterList", "ShowtimeList"];

    connect() {
    }

    addTheaterList(el) {
        this.theaterListTarget.replaceChildren();

        let option = `<option>請選擇影城</option>`;
        this.theaterListTarget.insertAdjacentHTML("beforeend", option);

        const token = document.querySelector("meta[name='csrf-token']").content;
        this.movieId = el.target.value;
        fetch('/api/v1/theater_list', {
            method: "POST",
            headers: {
                "X-csrf-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"movie_id": this.movieId})
            })
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {            
            data.forEach((element) => {
                let option = `<option value="${element.theater_id}" >${element.name}</option>`;
                this.theaterListTarget.insertAdjacentHTML("beforeend", option); 
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addShowtimeList(el) {
        this.ShowtimeListTarget.replaceChildren();

        let option = `<option>請選擇日期</option>`;
        this.ShowtimeListTarget.insertAdjacentHTML("beforeend", option);

        const token = document.querySelector("meta[name='csrf-token']").content;
        this.theaterId = el.target.value;
        fetch('/api/v1/showtime_list', {
            method: "POST",
            headers: {
                "X-csrf-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"movie_id": this.movieId, "theater_id": this.theaterId})
        })
        .catch((err) => {
            console.log(err)
        })
    }
}