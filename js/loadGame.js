// loadGame.js
import { changeModal, closeModal } from './modules/changeModal.js';

document.querySelector('.loadgame-close-button-container').addEventListener('click', () => {
  if (document.getElementById('modal-loadgame').style.zIndex === '100') {
    closeModal('loadgame');
  } else {
    changeModal('top', null, 500);
  }
});

export function initLoadGame() {
  // 後で書く
}