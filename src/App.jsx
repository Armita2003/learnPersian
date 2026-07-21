import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense, useMemo } from "react";
import { Physics } from "@react-three/rapier";
import { generateGameLevel } from "./store";
import { KeyboardControls } from "@react-three/drei";
import { Menu } from "./components/Menu";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ position: [0, 5, 14], fov: 42 }}>
        <color attach="background" args={["#dbecfb"]} />
        <fog attach="fog" args={["#dbecfb", 30, 40]} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
      <Menu />
    </KeyboardControls>
  );
}

export default App;
