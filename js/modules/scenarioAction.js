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

export function MoveBackgroundImage(direction = 'leftToRight', duration = 5000) {
  const movements = {
    leftToRight: {
      start: 'translateX(-5%) scale(1.1)',
      end: 'translateX(0) scale(1.1)'
    },
    rightToLeft: {
      start: 'translateX(5%) scale(1.1)',
      end: 'translateX(0) scale(1.1)'
    },
    topToBottom: {
      start: 'translateY(-5%) scale(1.1)',
      end: 'translateY(0) scale(1.1)'
    },
    bottomToTop: {
      start: 'translateY(5%) scale(1.1)',
      end: 'translateY(0) scale(1.1)'
    }
  };

  const movement = movements[direction];
  if (!movement) {
    console.warn(`Unknown direction: ${direction}`);
    return;
  }

  const img = document.querySelector('#opening-background-image-container .background-image');
  if (!img) return;
  img.style.transition = 'none';
  img.style.transform = movement.start;

  requestAnimationFrame(() => {
    img.style.transition = `transform ${duration}ms ease-in-out`;
    img.style.transform = movement.end;
  });
  // scaleとtransformのリセットは背景切り替え時に行う
}

export function changeBackgroundImage(object, imagePath) {
  const modal = document.getElementById(`modal-${object}`);
  const backgroundImage = modal.querySelector(`#${object}-background-image-container .background-image`);
  const newImageSrc = `./assets/images/${imagePath}`;

  // フェードアウト
  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");
  modal.style.pointerEvents = "none";

  // アニメーション後
  setTimeout(() => {
    const tempImage = new Image();
    tempImage.src = newImageSrc;

    backgroundImage.style.transition = '';
    backgroundImage.style.transform = '';

    // 画像の読み込み完了後
    tempImage.onload = () => {
      backgroundImage.src = newImageSrc;
      // フェードイン
      modal.classList.remove("fade-out");
      modal.classList.add("fade-in");
      modal.style.pointerEvents = "auto";
    };
  }, 500);
}

export function shakeBackgroundImage(duration = 500, intensity = 10) {
  const img = document.querySelector('#opening-background-image-container .background-image');
  if (!img) return;

  const startTime = Date.now();
  const originalTransform = img.style.transform; // あとで戻すために保存

  function shake() {
    const elapsed = Date.now() - startTime;
    if (elapsed >= duration) {
      img.style.transform = originalTransform;
      return;
    }
    // 徐々に弱くなる
    const progress = elapsed / duration;
    const currentIntensity = intensity * (1 - progress);

    const x = (Math.random() - 0.5) * currentIntensity;
    const y = (Math.random() - 0.5) * currentIntensity;

    img.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(shake);
  }
  shake();
}

export function openBackgroundImage(duration = 2500) {
  const img = document.querySelector('#opening-background-image-container .background-image');
  if (!img) return;

  img.style.animation = `eyeOpenAnimation ${duration}ms ease-in-out`;
  setTimeout(() => {
    img.style.animation = '';
  }, duration);
}