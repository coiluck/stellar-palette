// top.js
import { changeModal } from "./modules/changeModal.js";

document.getElementById("top-button-start").addEventListener("click", () => {
  changeModal("opening");
});

document.getElementById("top-button-continue").addEventListener("click", () => {
  changeModal("opening");
});

document.getElementById("top-button-gallary").addEventListener("click", () => {
  changeModal("gallary");
});

document.getElementById("top-button-setting").addEventListener("click", () => {
  changeModal("setting");
});