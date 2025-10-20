// scenario.js
export const openingScenario = [
  { 
    text: 'aaa',
    speaker: 'ココネ',
    choiceId: 'test',
  },
  { 
    text: 'bbb',
    action: async () => {
      await console.log('bbb');
    }
  },
  { text: 'ccc' },
  { text: 'ddd' },
  { text: 'eee' },
]

export const openingChoices = {
  test: [
    {
      buttonText: '選択肢A',
      branch: [
        { text: 'a' },
        { text: 'b' },
      ],
    },
    {
      buttonText: '選択肢B',
      branch: [
        { text: 'a' },
        { text: 'b' },
      ],
    },
  ],
};