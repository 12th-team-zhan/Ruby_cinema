import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["time"]

    connect() {
        let time = 600
        const countDown = setInterval(() => {
            time = time - 1

            let minutes = Math.floor((time / 60));
            let seconds = Math.floor((time % 60));

            this.timeTarget.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

            if (time === 0) {
                clearInterval(countDown)
                window.location.href = window.location.origin;
            }
        }, 1000);
    }
}
