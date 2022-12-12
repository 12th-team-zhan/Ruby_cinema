import { Controller } from "stimulus";


export default class extends Controller {
    static targets = ["theater", "movie", "date", "showTime", "ticketForm", "setForm", "ticketBtn", "setBtn"];


    initialize() {
        let theatersList = []
        const theaterTarget = this.theaterTarget

        fetch('http://127.0.0.1:3000/api/v1/getTheaterList')
            .then(res => res.json())
            .then(data => {
                theatersList = data
                theater()
            })
            .catch(err => console.log(err))

        function theater() {
            theatersList.forEach((theater) => {
                let element = `<option value="${theater}">${theater}</option>`
                theaterTarget.insertAdjacentHTML("beforeend", element)
            })
        }

    }

    connect() {

    }
    theater() {
        console.log("theater");
        if (this.theaterTarget.value && this.theaterTarget.value != "請選擇影城") {
            const moviesList = this.getMovie(this.theaterTarget.value)
            moviesList.forEach((movie) => {
                let element = `<option value="${movie}">${movie}</option>`
                this.movieTarget.insertAdjacentHTML("beforeend", element)
            })
        }
        else {
            let element = `<option>請選擇電影</option>`
            this.movieTarget.textContent = ""
            this.movieTarget.insertAdjacentHTML("beforeend", element)
            element = `<option>請選擇日期</option>`
            this.dateTarget.textContent = ""
            this.dateTarget.insertAdjacentHTML("beforeend", element)
            element = `<option>請選擇場次</option>`
            this.showTimeTarget.textContent = ""
            this.showTimeTarget.insertAdjacentHTML("beforeend", element)
        }
    }

    movie() {
        console.log("movie");
        if (this.movieTarget.value && this.movieTarget.value != "請選擇電影") {
            const datesList = this.getDate(this.dateTarget.value)
            console.log(datesList);
            datesList.forEach((date) => {
                let element = `<option value="${date}">${date}</option>`
                this.dateTarget.insertAdjacentHTML("beforeend", element)
            })
        }
        else {
            let element = `<option>請選擇日期</option>`
            this.dateTarget.textContent = ""
            this.dateTarget.insertAdjacentHTML("beforeend", element)
            element = `<option>請選擇場次</option>`
            this.showTimeTarget.textContent = ""
            this.showTimeTarget.insertAdjacentHTML("beforeend", element)
        }
    }

    date() {
        console.log("date");
        if (this.dateTarget.value && this.dateTarget.value != "請選擇日期") {
            const showTimesList = this.getShowTime(this.dateTarget.value)
            console.log(showTimesList);
            showTimesList.forEach((showTime) => {
                let element = `<option value="${showTime}">${showTime}</option>`
                this.showTimeTarget.insertAdjacentHTML("beforeend", element)
            })
        }
        else {
            const element = `<option>請選擇場次</option>`
            this.showTimeTarget.textContent = ""
            this.showTimeTarget.insertAdjacentHTML("beforeend", element)
        }
    }

    getMovie(theater) {
        const moviesList = ["阿凡達", "骨肉的總和", "黑豹2", "天空之城"]
        return moviesList
    }

    getDate(movie) {
        const dateList = ["2022/12/22", "2022/12/23", "2022/12/24", "2022/12/25"]
        return dateList
    }

    getShowTime(date) {
        const dateList = ["09:00", "12:00", "18:00", "22:00",]
        return dateList
    }

    formSwitch(e) {
        e.preventDefault()
        switch (e.target.textContent) {
            case "快速定票":
                this.ticketBtnTarget.children[0].classList.add("fs-scale");
                this.ticketBtnTarget.disabled = true
                this.setBtnTarget.children[0].classList.remove("fs-scale");
                this.setBtnTarget.disabled = false
                this.setFormTarget.classList.add("item-hidden");
                this.ticketFormTarget.classList.remove("item-hidden");
                break;
            case "快搜空位":
                this.ticketBtnTarget.children[0].classList.remove("fs-scale");
                this.ticketBtnTarget.disabled = false
                this.setBtnTarget.children[0].classList.add("fs-scale");
                this.setBtnTarget.disabled = true
                this.setFormTarget.classList.remove("item-hidden");
                this.ticketFormTarget.classList.add("item-hidden");
                break;
        }
    }
}