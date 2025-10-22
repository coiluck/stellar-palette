// story_icons.js
import { changeModal, showModal, closeModal } from './modules/changeModal.js';

document.getElementById('opening-icon-save').addEventListener('click', (event) => {
  event.stopPropagation(); 
  // 後で書く
});
document.getElementById('opening-icon-load').addEventListener('click', (event) => {
  event.stopPropagation(); 
  showModal('loadgame');
});
document.getElementById('opening-icon-setting').addEventListener('click', (event) => {
  event.stopPropagation(); 
  showModal('setting');
});
document.getElementById('opening-icon-menu').addEventListener('click', (event) => {
  event.stopPropagation(); 
  showModal('menu');
});
document.querySelector('.menu-close-button-container').addEventListener('click', () => {
  closeModal('menu');
});

document.getElementById('menu-item-save-data').addEventListener('click', () => {
  // あとで書く
});
document.getElementById('menu-item-load-data').addEventListener('click', () => {
  closeModal('menu');
  showModal('loadgame');
});
document.getElementById('menu-item-setting').addEventListener('click', () => {
  closeModal('menu');
  showModal('setting');
});
document.getElementById('menu-item-return-title').addEventListener('click', () => {
  closeModal('menu');
  changeModal('top');
});