import { Cylinder, MeshReflectorMaterial, OrbitControls, Text, Text3D } from "@react-three/drei";
import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Torii } from "./Torii";
import { letters } from "../constants";
import { useGameStore } from "../store";
import { useEffect } from "react";
import { LetterSpots } from "./LetterSpots";
import { CharacterController } from "./CharacterController";
import { Kicker } from "./Kicker";

export const Experience = () => {
  const currentLetter = useGameStore((state) => state.currentLetter);
  return (
    <>
      <OrbitControls />

      {/* Lights */}

      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow color={"#9e69da"} />

      {/* Ground */}

      <RigidBody colliders={false} type="fixed" name="void">
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#dbecfb"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>
      <Torii scale={[16, 16, 16]} position={[0, 0, -22]} rotation-y={1.25 * Math.PI} />
      {currentLetter && (
        <Text position={[0, -1, -20]} fontSize={0.82}>
          {currentLetter.name.toUpperCase()}
          <meshStandardMaterial color={"black"} opacity={0.6} transparent />
        </Text>
      )}
      <Torii scale={[10, 10, 10]} position={[-8, 0, -20]} rotation-y={1.4 * Math.PI} />
      <Torii scale={[10, 10, 10]} position={[8, 0, -20]} rotation-y={Math.PI} />
      {/* Stage */}
      <group position-y={-1}>
        <Kicker />
        <RigidBody colliders={false} type="fixed" position-y={-0.5} friction={2}>
          <CylinderCollider args={[1 / 2, 5]} />
          <Cylinder scale={[5, 1, 5]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

        {/* Character */}
        <CharacterController />

        {/* Letters */}
        <LetterSpots />
      </group>
    </>
  );
};
