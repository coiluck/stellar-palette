// gallary.js
import { changeModal } from './modules/changeModal.js';

document.querySelector('.gallary-close-button-container').addEventListener('click', () => {
  changeModal('top');
});

export function initGallary() {
  // 後でjsonからfetchする仕組みを作る
}