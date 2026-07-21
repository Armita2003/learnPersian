import { Center, Cylinder, Text3D } from "@react-three/drei";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { useGameStore } from "../store";

export const LetterSpots = () => {
  const level = useGameStore((state) => state.level);
  const currentStage = useGameStore((state) => state.currentStage);
  const letterTouched = useGameStore((state) => state.letterTouched);

  if (!level) return null;
  return level[currentStage].map((letter, index) => (
    <group
      key={`${currentStage}-${letter.name}`}
      rotation-y={(index / level[currentStage].length) * Math.PI * 2}
    >
      <group position-x={3.5} position-z={-3.5}>
        <RigidBody
          colliders={false}
          type="fixed"
          onCollisionEnter={() => {
            letterTouched(letter);
          }}
        >
          <CylinderCollider args={[0.25 / 2, 1]} />
          <Cylinder scale={[1, 0.25, 1]}>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>
        <Center position-y={0.8}>
          <Text3D
            font="./fonts/Noto Naskh Arabic_Regular.json"
            size={0.82}
            rotation-y={-(index / level[currentStage].length) * Math.PI * 2}
          >
            {letter.character.isolated}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </group>
    </group>
  ));
};
