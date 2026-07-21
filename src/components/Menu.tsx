import { gameStates, useGameStore } from "../store";

export const Menu = () => {
  const startGame = useGameStore((state) => state.startGame);
  const gameState = useGameStore((state) => state.gameState);
  const goToMenu = useGameStore((state) => state.goToMenu);

  return (
    <>
      {/* <div className={`menu ${gameState !== gameStates.MENU ? "menu--hidden" : ""}`}> */}
      <div className={gameState === gameStates.MENU ? "menu" : "menu menu--hidden"}>
        <div className="menu--content">
          <span>
            <h1>Learn Persian</h1>

            <p>Master the Persian alphabet through a fun 3D adventure.</p>
          </span>
          <button disabled={gameState !== gameStates.MENU} onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
      <div
        className={` ${gameState === gameStates.GAME_OVER ? "scores" : " scores scores--hidden"}`}
      >
        <div className="scores--content">
          <span>
            <h1>Congratulations 🎉</h1>
            <p> you are becoming a true master</p>
          </span>

          <button onClick={goToMenu} disabled={gameState !== gameStates.GAME_OVER}>
            Play again
          </button>
        </div>
      </div>
    </>
  );
};
