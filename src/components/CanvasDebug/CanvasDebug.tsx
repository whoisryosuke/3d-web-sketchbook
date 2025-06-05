import React from "react";
import { OrbitControls, Preload, Stats } from "@react-three/drei";

type Props = {};

const CanvasDebug = (props: Props) => {
  return (
    <>
      <Stats />
      <OrbitControls />
      <Preload all />
    </>
  );
};

export default CanvasDebug;
