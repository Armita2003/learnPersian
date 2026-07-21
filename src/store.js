import { create } from "zustand";
import { letters } from "./constants";
import { subscribeWithSelector } from "zustand/middleware";

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
};

export const playAudio = (path, callback) => {
  const audio = new Audio(`./sounds/${path}.mp3`);
  if (callback) {
    audio.addEventListener("ended", callback);
  }
  audio.play();
};

export const generateGameLevel = ({ nbStages }) => {
  const level = [];
  const goodLetters = [];
  for (let i = 0; i < nbStages; i++) {
    const stage = [];
    const nbOptions = 3 + i;

    for (let j = 0; j < nbOptions; j++) {
      let letter = null;

      while (!letter || stage.includes(letter) || goodLetters.includes(letter)) {
        letter = letters[Math.floor(Math.random() * letters.length)];
      }

      stage.push(letter);
    }

    const goodLetter = stage[Math.floor(Math.random() * stage.length)];
    goodLetter.correct = true;
    goodLetters.push(goodLetter);
    level.push(stage);
  }

  return level;
};

export const useGameStore = create(
  subscribeWithSelector((set, get) => ({
    level: null,
    currentStage: 0,
    currentLetter: null,
    gameState: gameStates.MENU,
    wrongAnswers: 0,
    startGame: () => {
      const level = generateGameLevel({ nbStages: 5 });
      const currentLetter = level[0].find((letter) => letter.correct);
      playAudio("Start", () => {
        playAudio(`persian/${currentLetter.name}`);
      });
      set({ level, currentStage: 0, currentLetter, gameState: gameStates.GAME, wrongAnswers: 0 });
    },
    nextStage: () => {
      set((state) => {
        if (state.currentStage + 1 === state.level.length) {
          playAudio("Congratulations");
          return {
            currentStage: 0,
            currentLetter: null,
            level: null,
            gameState: gameStates.GAME_OVER,
          };
        }
        const currentStage = state.currentStage + 1;
        const currentLetter = state.level[currentStage].find((letter) => letter.correct);

        // playAudio("Good");
        // playAudio(`Correct${currentStage % 3}`, () => {
        //   playAudio(`persian/${currentLetter.name}`);
        // });
        playAudio("Good", () => {
          playAudio(`Correct${currentStage % 3}`, () => {
            playAudio(`persian/${currentLetter.name}`);
          });
        });
        return {
          currentStage,
          currentLetter,
        };
      });
    },
    goToMenu: () => {
      set({ gameState: gameStates.MENU });
    },
    letterTouched: (letter) => {
      const currentLetter = get().currentLetter;
      if (currentLetter.name === letter.name) {
        get().nextStage();
      } else {
        // playAudio("Wrong");
        // playAudio(`persian/${letter.name}`, () => {
        //   playAudio("Fail");
        // });
        playAudio(`persian/${letter.name}`, () => {
          playAudio(`Wrong`, () => {
            playAudio("Fail");
          });
        });
        set((state) => ({
          wrongAnswers: state.wrongAnswers + 1,
        }));
      }
    },
  }))
);
