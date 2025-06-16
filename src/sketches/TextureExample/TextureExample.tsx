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
      {/* FPS, OrbitControls */}
      <CanvasDebug />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      {/* Textured plane */}
      <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <planeGeometry />
        <meshStandardMaterial map={colorMap} />
      </mesh>

      {/* Wireframe plane */}
      <mesh position={[0, 0, 0.1]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <planeGeometry />
        <meshStandardMaterial wireframe color={COLOR_PRIMARY} />
      </mesh>
    </Canvas>
  );
};

export default HelloWorld;
