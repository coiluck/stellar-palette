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
  { text: 'ddddddddddddddddddddddddddd' },
  { text: 'eeeeeeeeeeeeeeeeeeeeeeeeeee' },
]

export const openingChoices = {
  test: [
    {
      buttonText: '選択肢A',
      branch: [
        { text: 'a-1' },
        { text: 'a-2' },
      ],
    },
    {
      buttonText: '選択肢B',
      branch: [
        { 
          text: 'b-1',
          choiceId: 'test2',
        },
        { text: 'b-2' },
        { text: 'b-3' },
      ],
    },
  ],
  test2: [
    {
      buttonText: '選択肢A-2',
      branch: [
        { text: 'a-2-1' },
        { text: 'a-2-2' },
      ],
    },
    {
      buttonText: '選択肢B-2',
      branch: [
        { text: 'b-2-1' },
        { text: 'b-2-2' },
      ],
    },
  ],
};