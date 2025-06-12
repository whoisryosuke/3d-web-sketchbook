import CanvasDebug from "@/components/CanvasDebug/CanvasDebug";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { baseColors } from "@whoisryosuke/oat-milk-design";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  N8AO,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import InstancedMeshWaveform from "./InstancedMeshWaveform";

type Props = {};

const WaveformBufferGeoR2 = (props: Props) => {
  return (
    <Canvas>
      <CanvasDebug />

      <color attach="background" args={[baseColors["gray-9"]]} />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      <InstancedMeshWaveform />

      {/* <mesh rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <boxGeometry />
        <meshStandardMaterial color="blue" />
      </mesh> */}

      <EffectComposer multisampling={8}>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
        {/* <DepthOfField
          focusDistance={0}
          focalLength={1}
          bokehScale={2}
          height={480}
        /> */}
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
};

export default WaveformBufferGeoR2;
