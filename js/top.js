// top.js
import { changeModal } from "./modules/changeModal.js";

document.getElementById("top-button-start").addEventListener("click", () => {
  // indexとかを初期化する必要がある
  // これはopening.jsでやる
  changeModal("opening");
});

document.getElementById("top-button-continue").addEventListener("click", () => {
  changeModal("loadgame");
});

document.getElementById("top-button-gallary").addEventListener("click", () => {
  changeModal("gallary");
});

document.getElementById("top-button-setting").addEventListener("click", () => {
  changeModal("setting");
});