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
                highlightCodeOutline: true,
            },
        );
        this.qrScanner.start();

    }

    swal(data) {
        switch (data.res) {
            case 'success':
                Swal.fire(
                    {
                        title: '成功',
                        text: data.text,
                        icon: 'error',
                        confirmButtonText: '關閉',
                        didClose: () => {
                            this.qrScanner.start();
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
                            this.qrScanner.start();
                        }
                    }
                )

                break;
        }
    }
}