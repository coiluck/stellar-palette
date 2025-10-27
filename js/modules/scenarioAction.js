// scenarioAction.js
import { showModal, closeModal } from "./changeModal.js";

export async function nextDay(nextDay, backgroundImage, clickTextColor = 'white') {
  // セットアップ処理
  document.querySelector('#modal-day .day-click-text').textContent = "";
  document.querySelector('#modal-day .day-background-image img').src = `./assets/images/${backgroundImage}`;
  const maxDay = 31;
  document.querySelector('#modal-day #day-text-previous').textContent = nextDay - 2 > 0 ? `Day${nextDay - 2}` : ``;
  document.querySelector('#modal-day #day-text-current').textContent = nextDay - 1 > 0 ? `Day${nextDay - 1}` : ``;
  document.querySelector('#modal-day #day-text-nextCurrent').textContent = `Day${nextDay}`;
  document.querySelector('#modal-day #day-text-nextNext').textContent = nextDay < maxDay ? `Day${nextDay + 1}` : ``;
  // 表示
  showModal('day');
  // DAY更新アニメーション
  await new Promise(resolve => setTimeout(resolve, 750));
  document.querySelector('#modal-day .day-container').classList.add('animate');
  setTimeout(() => {
    document.getElementById('day-text-nextCurrent').style.scale = '1.5';
    document.getElementById('day-text-nextCurrent').style.transform = 'translateY(-10px)';
  }, 1100);
  // クリック可能にする
  await new Promise(resolve => setTimeout(resolve, 1500));
  document.querySelector('#modal-day .day-click-text').classList.remove('fade-in');
  document.querySelector('#modal-day .day-click-text').style.color = clickTextColor;
  document.querySelector('#modal-day .day-click-text').textContent = "- Click to Continue -";
  document.querySelector('#modal-day .day-click-text').classList.add('fade-in');
  await new Promise(resolve => setTimeout(resolve, 500));
  document.getElementById('modal-day').addEventListener('click', () => {
    closeModal('day');
    setTimeout(() => {
      document.querySelector('#modal-day .day-container').classList.remove('animate');
      document.getElementById('day-text-nextCurrent').style.scale = '1';
      document.getElementById('day-text-nextCurrent').style.transform = 'translateY(0)';
    }, 500);
  }, { once: true });
}

export function addBackgroundEffect() {
  console.log('addBackgroundEffect');
}