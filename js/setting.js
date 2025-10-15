// setting.js
import { changeModal } from './modules/changeModal.js';

document.querySelector('.setting-close-button-container').addEventListener('click', () => {
  changeModal('top');
});