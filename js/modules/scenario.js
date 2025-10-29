// scenario.js
import { nextDay, MoveBackgroundImage, changeBackgroundImage, shakeBackgroundImage, openBackgroundImage } from './scenarioAction.js';
import { globalGameState } from './gameState.js';

export const openingScenario = [
  {
    text: "――ここは、どこ?",
    speaker: "？？？"
  },
  { text: "目を開けると、わたしは暗闇の中にいた。" },
  { text: "……いや、よく見ると、暗闇ではない。空には無数の星が瞬いている。" },
  { text: "遠くて、近い。" },
  { text: "冷たくて、温かい。" },
  { text: "「わたし」は、ここで何をしているの？" },
  { text: "「わたし」って、誰？" },
  { text: "問いかけても、答えは返ってこない。" },
  { text: "ただ、光だけが瞬き続ける。" },
  { text: "どれくらいの時間が経ったのだろう。" },
  { text: "時間という概念すら、ここにはないのかもしれない。" },
  { text: "それでも、わたしは感じていた。" },
  { text: "何かが、変わろうとしている。" },
  { text: "遠くから、とても強い光が近づいてくる。" },
  { text: "それは他の光たちとは違う。悲しみではなく、別の何か――" },
  { text: "願い？" },
  { text: "祈り？" },
  {
    text: "その光がわたしに触れた瞬間、世界が白く染まった。",
    action: async () => {
      await changeBackgroundImage('opening', 'white.png');
    },
  },
  { text: "そして――" },
  { text: "わたしは、落ちていく。" },
  { text: "星空の中を、どこまでも、どこまでも。" },
  {
    text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa',
    speaker: 'ココネ',
    action: async () => {
      nextDay(1, 'room_nighttime.jpg');
      changeBackgroundImage('opening', 'room_daytime.jpg');
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  },
  {
    text: 'bbb',
    action: async () => {
      await console.log('bbb');
      openBackgroundImage();
    }
  },
  { text: 'ccc' },
  {
    text: 'ddddddddddddddddddddddddddd',
    action: async () => {
      nextDay('4', 'background/room_nighttime.jpg');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  },
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