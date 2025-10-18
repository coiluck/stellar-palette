// loadGame.js
import { changeModal } from './modules/changeModal.js';

document.querySelector('.loadgame-close-button-container').addEventListener('click', () => {
  changeModal('top');
});

export function initLoadGame() {
  // 後で書く
}