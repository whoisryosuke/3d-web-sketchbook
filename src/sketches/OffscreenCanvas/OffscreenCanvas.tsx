import CanvasDebug from "@/components/CanvasDebug/CanvasDebug";
import { Canvas } from "@react-three/fiber";
import React from "react";
import CanvasMaterial, { CanvasMaterialProps } from "./CanvasMaterial";

type Props = CanvasMaterialProps & {};

const HelloWorld = ({ canvasRef }: Props) => {
  return (
    <Canvas>
      <CanvasDebug />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <CanvasMaterial canvasRef={canvasRef} />
    </Canvas>
  );
};

export default HelloWorld;
