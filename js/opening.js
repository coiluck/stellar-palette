// opening.js
import { openingScenario, openingChoices } from './modules/scenario.js';

const Scenario = [...openingScenario];
const Choices = openingChoices;
let openingStoryIndex = 0;
let isDisplayingSelection = false;
let isUpdating = false;
let branchStack = []; // 分岐管理
let displayHistory = []; // 履歴

document.getElementById("top-button-start").addEventListener("click", () => {
  // 初期化
  openingStoryIndex = 0;
  isDisplayingSelection = false;
  isUpdating = false;
  branchStack = [];
  displayHistory = [];
  updateStory();
});

import { globalGameState } from './modules/gameState.js';

document.getElementById('modal-opening').addEventListener('click', () => {
  if (isDisplayingSelection || isUpdating) {
    return;
  }
  updateStory();
});

async function updateStory() {
  if (isUpdating) return;
  isUpdating = true;

  const isBranch = branchStack.length > 0;
  let scenario, index;

  if (isBranch) {
    scenario = branchStack[branchStack.length - 1].scenario;
    index = branchStack[branchStack.length - 1].index;
  } else {
    scenario = Scenario;
    index = openingStoryIndex;
  }

  // 現在のシナリオが終了
  if (index >= scenario.length) {
    if (isBranch) {
      // 分岐ストーリー終了 -> 一つ前のレベルに復帰
      branchStack.pop(); // 現在の分岐を削除
      isUpdating = false;
      updateStory(); // 前のレベルを続行 (再帰呼び出し)
    } else {
      // 共通ルート終了
      isUpdating = false;
    }
    return;
  }

  await displayStory(index, true);

  // 表示した状態を履歴に追加
  displayHistory.push({
    scenario: scenario,
    index: index,
    branchStack: JSON.parse(JSON.stringify(branchStack)),
    openingStoryIndex: openingStoryIndex
  });

  updateGlobalGameState();

  // インデックスを進める
  if (isBranch) {
    branchStack[branchStack.length - 1].index++;
  } else {
    openingStoryIndex++;
  }
  isUpdating = false;
}

async function displayStory(index, executeAction = true) {

  const isBranch = branchStack.length > 0;
  const currentScenario = isBranch ? branchStack[branchStack.length - 1].scenario : Scenario;

  if (index >= currentScenario.length || index < 0) {
    console.warn(`Invalid story index: ${index}`);
    return;
  }

  const story = currentScenario[index];

  // actionが設定されていれば実行
  if (executeAction && typeof story.action === 'function') {
    await story.action(); // 待つ
  }

  // 発話者を表示
  if (story.speaker) {
    document.getElementById('opening-character-name').style.visibility = 'visible';
    document.getElementById('opening-character-name').textContent = story.speaker;
  } else {
    document.getElementById('opening-character-name').style.visibility = 'hidden';
  }

  // テキストを表示
  await displayText(story.text);

  // 選択肢を消去(戻るボタンで選択肢が残るのを防ぐ)
  if (isDisplayingSelection) {
    isDisplayingSelection = false;
    document.getElementById('opening-choices-container').innerHTML = '';
    document.getElementById('opening-choices-container').style.display = 'none';
    document.getElementById('opening-choices-container').style.pointerEvents = 'none';
  }

  // 戻るボタンの際は選択肢を表示しない
  if (!executeAction) {
    return;
  }

  // choiceIdが設定されていれば選択肢を表示
  if (story.choiceId) {
    displayChoices(story.choiceId);
  }
}

function displayChoices(choiceId) {
  isDisplayingSelection = true;

  document.getElementById('opening-choices-container').innerHTML = '';
  document.getElementById('opening-text').classList.remove('fade-in');
  document.getElementById('opening-choices-container').style.display = 'none';
  document.getElementById('opening-choices-container').style.pointerEvents = 'none';

  const choiceData = Choices[choiceId];
  if (!choiceData) {
    return;
  }

  choiceData.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('choice-button');
    button.textContent = choice.buttonText;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      isDisplayingSelection = false;
      document.getElementById('opening-choices-container').innerHTML = '';

      // 選択された分岐ストーリーを保存
      branchStack.push({
        scenario: choice.branch,
        index: 0
      });

      // 選択肢を選んだら履歴をリセット
      displayHistory = [];

      updateGlobalGameState();

      updateStory(); // 新しい分岐の最初のストーリーを開始
    });
    document.getElementById('opening-choices-container').appendChild(button);
  });

  setTimeout(() => {
    document.getElementById('opening-choices-container').style.display = 'flex';
    document.getElementById('opening-choices-container').style.pointerEvents = 'auto';
    document.querySelectorAll('#opening-choices-container .choice-button').forEach(btn => {
      btn.classList.add('fade-in');
    });
  }, 500);
  setTimeout(() => {
    document.getElementById('opening-choices-container').classList.remove('fade-in');
  }, 1000);
}

// 最初に一度だけ実行
updateStory();


// 戻るボタン
document.getElementById('opening-icon-prev-text').addEventListener('click', (event) => {
  event.stopPropagation();
  // 履歴が2未満(現在の + 戻る先)は戻れない
  if (isDisplayingSelection || isUpdating || displayHistory.length < 2) {
    console.log('選択肢より前には戻れません');
    return;
  }
  isUpdating = true;

  // 現在の状態を履歴から削除
  displayHistory.pop();

  // 戻るべき直前の状態を取得
  const prevState = displayHistory[displayHistory.length - 1];

  // 状態を「prevState」が表示された時点の状態に復元
  branchStack = JSON.parse(JSON.stringify(prevState.branchStack));
  openingStoryIndex = prevState.openingStoryIndex;

  const isBranch = branchStack.length > 0;
  if (isBranch) {
    branchStack[branchStack.length - 1].index++;
  } else {
    openingStoryIndex++;
  }

  updateGlobalGameState();

  // 直前の状態を表示
  displayStory(prevState.index, false).then(() => {
    isUpdating = false;
  });
});

// storyDataを更新
function updateGlobalGameState() {
  globalGameState.storyData.openingStoryIndex = openingStoryIndex;
  globalGameState.storyData.branchStack = JSON.parse(JSON.stringify(branchStack));
  globalGameState.storyData.displayHistory = JSON.parse(JSON.stringify(displayHistory));
}

// テキストを表示
async function displayText(text) {
  let textSpeed = 3;
  const radios = document.querySelectorAll('input[name="text-speed"]');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      textSpeed = i; // delayは0-6の数字で、0が最遅、6が最速
      break;
    }
  }
  const delay = 30 - textSpeed * 3;
  document.getElementById('opening-text').innerHTML = '';
  const textArray = text.split('');
  for (const char of textArray) {
    document.getElementById('opening-text').innerHTML += char;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}