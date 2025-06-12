import { useFrame } from "@react-three/fiber";
import React, { RefObject, useRef, useState } from "react";
import * as THREE from "three";
import { getFrequencyData } from "./audio";
import { baseColors } from "@whoisryosuke/oat-milk-design";

const NUM_RINGS = 100;
const POINTS_PER_RING = 64;

type Props = {
  // analyser: RefObject<AnalyserNode | null>;
  // bufferLength: number;
};

export default function WaveformMesh({}: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const [geometry] = useState(() => new THREE.BufferGeometry());
  const [positions] = useState(
    () => new Float32Array(NUM_RINGS * POINTS_PER_RING * 3)
  );
  //   const dataArray = useRef(new Uint8Array(bufferLength));

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;
    const freqData = getFrequencyData();

    // Shift rings back in Z
    for (let ring = NUM_RINGS - 1; ring > 0; ring--) {
      for (let i = 0; i < POINTS_PER_RING; i++) {
        const idx = ring * POINTS_PER_RING * 3 + i * 3;
        const prevIdx = (ring - 1) * POINTS_PER_RING * 3 + i * 3;
        positions[idx] = positions[prevIdx];
        positions[idx + 1] = positions[prevIdx + 1];
        positions[idx + 2] = positions[prevIdx + 2];
      }
    }

    // Create new ring at front
    for (let i = 0; i < POINTS_PER_RING; i++) {
      const angle = (i / POINTS_PER_RING) * Math.PI * 2;
      const amp = freqData[i % freqData.length] / 255;
      const radius = 1 + amp * 2;
      const x = Math.cos(angle) * radius * Math.cos(time);
      const y = Math.sin(angle) * radius * Math.sin(time);
      const z = amp ** 2 * Math.cos(amp) * 10;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={baseColors["blue-5"]}
        sizeAttenuation
      />
    </points>
  );
}
