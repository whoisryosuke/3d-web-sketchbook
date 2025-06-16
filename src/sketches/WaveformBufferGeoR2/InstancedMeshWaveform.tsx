import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { InstancedMesh, Object3D } from "three";
import { getFrequencyData } from "../WaveformBufferGeoR1/audio";

const COUNT = 100;

function InstancedMeshWaveform() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = new Object3D();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const freqData = getFrequencyData();
    for (let i = 0; i < COUNT; i++) {
      const radius = 5 + Math.sin(t + i) * 2;
      const angle = (i / COUNT) * Math.PI * 2 + t * 0.2;
      const amp = freqData[i % freqData.length] / 255;
      const rotationAmp = 1;

      dummy.position.set(
        Math.cos(angle * amp) * radius,
        Math.sin(angle * 2 * amp) * 2,
        Math.sin(angle) * radius
      );
      dummy.rotation.set(t + i * rotationAmp, t * 0.5 + i * rotationAmp, 0);
      dummy.scale.setScalar(0.3 + Math.sin(t + i) * 0.1);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry />
      <meshStandardMaterial
        color="skyblue"
        emissive={"blue"}
        emissiveIntensity={10}
      />
    </instancedMesh>
  );
}

export default InstancedMeshWaveform;
