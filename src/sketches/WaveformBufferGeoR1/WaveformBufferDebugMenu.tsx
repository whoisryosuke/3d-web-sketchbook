import React from "react";
import { playAudio } from "./audio";

type Props = {};

const WaveformBufferDebugMenu = (props: Props) => {
  const handlePlay = () => {
    playAudio();
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        padding: "2rem",
      }}
    >
      <h2>Debug</h2>
      <button onClick={handlePlay}>Play</button>
    </div>
  );
};

export default WaveformBufferDebugMenu;
