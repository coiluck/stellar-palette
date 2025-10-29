// gameState.js
const initialState = {
  storyData : {
    openingStoryIndex: 0,
    branchStack: [],
    displayHistory: [],
  },
  gameData: {
    root: null,
    point: {
      aria: 0,
      kana: 0,
      shiori: 0,
    }
  },
  LoadImageSrc: './assets/images/background/nightsky.png',
};

export const globalGameState = structuredClone(initialState); // 初期化

export function resetGlobalState() {
  const freshState = structuredClone(initialState);
  Object.keys(freshState).forEach((key) => {
    globalGameState[key] = freshState[key];
  });
}

export function setGlobalGameState(newState) {
  Object.keys(newState).forEach((key) => {
    globalGameState[key] = newState[key];
  });
}