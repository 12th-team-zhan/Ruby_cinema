import { Controller } from "stimulus";
const QRCode = require('qrcode');

export default class extends Controller {
    static targets = ["canvas"];

    connect() {
        this.url = location.origin + "/admin/ticket_checking"

        this.canvasTargets.forEach(e => {
            QRCode.toCanvas(e, e.dataset.serial, function (error) {
                if (error) console.error(error)
            })
        });


    }
}
