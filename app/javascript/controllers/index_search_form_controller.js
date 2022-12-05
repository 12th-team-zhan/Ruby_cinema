import { Controller } from "stimulus";


export default class extends Controller {
    static targets = ["theater", "movie", "date", "showtime", "ticketForm", "setForm", "ticketBtn", "setBtn"];


    initialize() {
        const theatersList = ["台北信義威秀影城", "台中大遠百威秀影城", "高雄大遠百威秀影城", "花蓮新天堂樂園威秀影城"]
        theatersList.forEach((theater) => {
            let element = `<option value="${theater}">${theater}</option>`
            this.theaterTarget.insertAdjacentHTML("beforeend", element)
        })
    }

    connect() {

    }
    test() {
        if (this.theaterTarget.value && this.theaterTarget.value != "請選擇影城")
            console.log(123);
    }
    formSwitch(e) {
        e.preventDefault()
        switch (e.target.textContent) {
            case "快速定票":
                this.ticketBtnTarget.classList.add("fs-4");
                this.ticketBtnTarget.classList.remove("fs-5");
                this.ticketBtnTarget.disabled = true
                this.setBtnTarget.classList.add("fs-5");
                this.setBtnTarget.classList.remove("fs-4");
                this.setBtnTarget.disabled = false
                this.setFormTarget.classList.add("item-hidden");
                this.ticketFormTarget.classList.remove("item-hidden");
                break;
            case "快搜空位":
                this.ticketBtnTarget.classList.remove("fs-4");
                this.ticketBtnTarget.classList.add("fs-5");
                this.ticketBtnTarget.disabled = false
                this.setBtnTarget.classList.remove("fs-5");
                this.setBtnTarget.classList.add("fs-4");
                this.setBtnTarget.disabled = true
                this.setFormTarget.classList.remove("item-hidden");
                this.ticketFormTarget.classList.add("item-hidden");
                break;
        }
    }
}