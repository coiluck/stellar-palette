// story_icons.js
import { changeModal, showModal, closeModal } from './modules/changeModal.js';

document.getElementById('opening-icon-setting').addEventListener('click', () => {
  showModal('setting');
});
document.getElementById('opening-icon-menu').addEventListener('click', () => {
  showModal('menu');
});
document.querySelector('.menu-close-button-container').addEventListener('click', () => {
  closeModal('menu');
});

document.getElementById('menu-item-save-data').addEventListener('click', () => {
  // あとで書く
});
document.getElementById('menu-item-load-data').addEventListener('click', () => {
  // あとで書く
});
document.getElementById('menu-item-setting').addEventListener('click', () => {
  closeModal('menu');
  showModal('setting');
});
document.getElementById('menu-item-return-title').addEventListener('click', () => {
  closeModal('menu');
  changeModal('top');
});