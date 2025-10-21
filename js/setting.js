// setting.js
import { changeModal, closeModal } from './modules/changeModal.js';

document.querySelector('.setting-close-button-container').addEventListener('click', () => {
  if (document.getElementById('modal-setting').style.zIndex === '100') {
    closeModal('setting');
  } else {
    changeModal('top', null, 500);
  }
});