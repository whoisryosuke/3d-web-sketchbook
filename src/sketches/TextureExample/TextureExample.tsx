import CanvasDebug from "@/components/CanvasDebug/CanvasDebug";
import { Canvas, useLoader } from "@react-three/fiber";
import React from "react";
import { Color, TextureLoader } from "three";

type Props = {};

const COLOR_PRIMARY = new Color("#0B49AF");

const HelloWorld = (props: Props) => {
  const colorMap = useLoader(TextureLoader, "../images/avatar.jpg");
  return (
    <Canvas>
      <CanvasDebug />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <planeGeometry />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <mesh position={[0, 0, 0.1]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <planeGeometry />
        <meshStandardMaterial wireframe color={COLOR_PRIMARY} />
      </mesh>
    </Canvas>
  );
};

export default HelloWorld;
