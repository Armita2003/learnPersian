import { create } from "zustand";
import { letters } from "./constants";

// export const generateGameLevel = ({ nbStages }) => {
//   const level = [];
//   for (let i = 0; i < nbStages; i++) {
//     const stage = [];
//     const nbOptions = 3 + 1;
//     for (let j = 0; j < nbOptions; j++) {
//       let letter = null;

//       while (!letter || stage.includes(letter)) {
//         // letter = letters[Math.floor(Math.random() * letters.length)];
//         letter = {
//           ...letters[Math.floor(Math.random() * letters.length)],
//         };
//       }

//       stage.push(letter);
//     }
//     stage[Math.floor(Math.random() * stage.length)].correct = true;
//     level.push(stage);
//   }
//   return level;
// };

export const generateGameLevel = ({ nbStages }) => {
  const level = [];

  for (let i = 0; i < nbStages; i++) {
    const stage = [];
    const nbOptions = 4;

    for (let j = 0; j < nbOptions; j++) {
      let letter = null;

      while (!letter || stage.some((l) => l.name === letter.name)) {
        letter = {
          ...letters[Math.floor(Math.random() * letters.length)],
        };
      }

      stage.push(letter);
    }

    stage[Math.floor(Math.random() * stage.length)].correct = true;

    level.push(stage);
  }

  return level;
};
export const useGameStore = create((set) => ({
  level: null,
  currentStage: 0,
  currentLetter: null,
  startGame: () => {
    const level = generateGameLevel({ nbStages: 5 });
    const currentLetter = level[0].find((letter) => letter.correct);
    set({ level, currentStage: 0, currentLetter });
  },
  //   nextStage: () =>
  //     set((state) => {
  //       const currentStage = state.currentStage + 1;
  //       const currentLetter = state.level[currentStage].find((letter) => letter.correct);
  //       return { currentStage, currentLetter };
  //     }),
  nextStage: () =>
    set((state) => {
      const next = state.currentStage + 1;

      if (next >= state.level.length) {
        return {};
      }

      const currentLetter = state.level[next].find((letter) => letter.correct);

      return {
        currentStage: next,
        currentLetter,
      };
    }),
}));
