import { Workbox } from "workbox-window";

function serviceWorkerRegister() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("./serviceWorker.ts");
    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        window.location.reload();
      }
    });

    wb.register();
  }
}

export default serviceWorkerRegister;
