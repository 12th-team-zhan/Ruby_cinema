import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["ticketType", "allTotal", "next", "total", "allAmount", "amount", "regularAmount", "concessionAmount", "elderlyAmount", "disabilityAmount"]

    connect() {
        console.log(this.regularAmountTarget.value);
        this.calcAllTotal()
        let params = new URLSearchParams(location.search);
        this.showtimeId = params.get('showtimeid')
    }
    select(e) {
        e.path[2].children[2].textContent = "$" + Number(e.srcElement.value) * Number(e.path[2].children[0].textContent.substring(1))
        this.calcAllTotal()
        this.calcAllAmount()
    }

    calcAllTotal() {
        let allPrice = 0
        this.allTotalTarget.textContent = ""
        this.totalTargets.forEach((e) => {
            allPrice = allPrice + Number(e.textContent.substring(1))
        })
        this.allTotalTarget.textContent = "$" + allPrice
        if (allPrice > 0) {
            this.nextTarget.classList.remove("d-none")
        }
        else {
            this.nextTarget.classList.add("d-none")

        }
    }
    calcAllAmount() {
        let allAmount = 0
        this.allAmountTarget.textContent = ""
        this.amountTargets.forEach((e) => {
            allAmount = allAmount + Number(e.value)
        })
        this.allAmountTarget.textContent = allAmount
        this.changeLink(allAmount)

    }
    changeLink(amount) {
        console.log(this.regularAmountTarget.value);
        this.nextTarget.href = `/ticketing/select_seats?showtimeid=2&amount=${amount}&regularAmount=${this.regularAmountTarget.value}&concessionAmount=${this.concessionAmountTarget.value}&elderlyAmount=${this.elderlyAmountTarget.value}&disabilityAmount=${this.disabilityAmountTarget.value}`;
    }
}
