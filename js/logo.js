// logo.js
import { changeModal } from './modules/changeModal.js';

document.addEventListener('DOMContentLoaded', () => {
  changeModal('logo', null, 1000);
  setTimeout(() => {
    const logoAnimationArray = ['bounce', 'scale', 'jump'];
    const logoAnimation = logoAnimationArray[Math.floor(Math.random() * logoAnimationArray.length)];
    console.log(logoAnimation);
    const textTop = "KOKONE";
    const textBottom = "Project";
    const animationDelay = 0.07; // 秒

    const topElement = document.getElementById('logo-text-top');
    const bottomElement = document.getElementById('logo-text-bottom');

    // テキストを分割してアニメーションを適用
    const createAnimatedText = (text, delayStart = 0) => {
      return text.split('').map((char, index) => {
        const delay = (delayStart + index * animationDelay).toFixed(1);
        return `<span class="animate-${logoAnimation}" style="animation-delay: ${delay}s">${char}</span>`;
      }).join('');
    };

    // テキストをレンダリング
    topElement.innerHTML = createAnimatedText(textTop, 0);
    bottomElement.innerHTML = createAnimatedText(textBottom, textTop.length * animationDelay + 0.15);

    const totalAnimationTime = (textTop.length * animationDelay + 0.2) + (textBottom.length - 1) * animationDelay + 0.6;
    setTimeout(() => {
      changeModal('top');
    }, totalAnimationTime * 1000 + 500); // 500msは待機時間
  }, 1000);
});