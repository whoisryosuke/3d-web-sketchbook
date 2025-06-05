import CanvasDebug from "@/components/CanvasDebug/CanvasDebug";
import { Canvas } from "@react-three/fiber";
import React from "react";

type Props = {};

const HelloWorld = (props: Props) => {
  return (
    <Canvas>
      <CanvasDebug />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Canvas>
  );
};

export default HelloWorld;
