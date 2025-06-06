import { createPortal, useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import { CanvasTexture } from "three";

export type CanvasMaterialProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

// Lower = slower
const SPEED = 0.5;

function CanvasMaterial({ canvasRef }: CanvasMaterialProps) {
  const textureRef = useRef<CanvasTexture>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    console.log("canvas init - clearing with color");
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef.current]);

  useFrame((frameProps, delta) => {
    const time = frameProps.clock.elapsedTime;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.fillRect(
        Math.sin(time * SPEED) * canvas.width,
        Math.sin(time * SPEED) * canvas.height,
        50,
        50
      );
      if (textureRef.current) {
        textureRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial>
        <canvasTexture
          ref={textureRef}
          attach="map"
          image={canvasRef.current}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

export default CanvasMaterial;
