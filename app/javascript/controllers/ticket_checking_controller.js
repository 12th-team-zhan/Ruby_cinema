import { Controller } from "stimulus";
import QrScanner from 'qr-scanner';
import Swal from 'sweetalert2'

export default class extends Controller {
    static targets = ["video"];

    connect() {
        const token = document.querySelector("meta[name='csrf-token']").content;

        this.qrScanner = new QrScanner(
            this.videoTarget,
            result => {
                fetch("/admin/ticket_checking/scan", {
                    method: "POST",
                    headers: {
                        "X-csrf-Token": token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ serial: result.data }),
                })
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((data) => {
                        this.swal(data)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.qrScanner.stop();
            },
            {
                highlightScanRegion: true,
            },
        );
        this.qrScanner.start().then(() => {
            this.addElement("")
        });
    }


    swal(data) {
        switch (data.res) {
            case 'success':
                Swal.fire(
                    {
                        title: '成功',
                        html: `<p>${data.text}</p><p>驗證成功</p>`,
                        icon: 'success',
                        confirmButtonText: '關閉',
                        didClose: () => {
                            this.qrScanner.start().then(() => {
                                this.addElement(`${data.text}有效`)
                            });
                        }
                    }
                )
                break;
            case 'fail':
                Swal.fire(
                    {
                        title: '失敗',
                        text: data.text,
                        icon: 'error',
                        confirmButtonText: '關閉',
                        didClose: () => {
                            this.qrScanner.start().then(() => {
                                this.addElement("無效的序號")
                            });
                        }
                    }
                )
                break;
        }
    }
    addElement(message) {
        const back = `<div class='position-absolute fs-3 w-100 back'>
                      <a href="/"><i class="fa-solid fa-arrow-left"></i></a></div > `
        const title = "<div class='position-absolute text-center w-100 fs-3 title'><p>掃描QR Code</p></div>"
        const text = `<div class='position-absolute text-center w-100 fs-3 text'><p>${message}</p></div > `

        this.videoTarget.insertAdjacentHTML('afterend', back + title + text);
    }
}