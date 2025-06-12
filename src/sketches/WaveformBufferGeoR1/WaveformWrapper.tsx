import React, { CSSProperties, useEffect, useRef, useState } from "react";
import WaveformMesh from "./WaveformMesh";

async function loadAudio(audioCtx: AudioContext, filepath: string) {
  try {
    const response = await fetch(filepath);

    const fileBuffer = await response.arrayBuffer();
    const audioBuffer = audioCtx.decodeAudioData(fileBuffer);
    return audioBuffer;
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

type Props = {
  file: string;
  width?: number;
  height?: number;
};

const WaveformWrapper = ({ file, width, height }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [bufferLength, setBufferLength] = useState<number>(0);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (typeof window == "undefined") return;
    async function getAudioBuffer() {
      audioCtx.current = new window.AudioContext();
      const newBuffer = await loadAudio(audioCtx.current, file);
      if (!newBuffer) return;
      setAudioBuffer(newBuffer);

      analyser.current = audioCtx.current.createAnalyser();

      // Configure analyser
      analyser.current.fftSize = 1024;
      const newBufferLength = analyser.current.frequencyBinCount;
      setBufferLength(newBufferLength);
    }
    getAudioBuffer();
  }, [window]);

  const handleDone = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    console.log(
      "playing",
      !audioBuffer,
      !audioCtx.current,
      !analyser.current,
      isPlaying
    );
    if (!audioBuffer || !audioCtx.current || !analyser.current || isPlaying)
      return;

    // Check if context is in suspended state (autoplay policy)
    if (audioCtx.current?.state === "suspended") {
      audioCtx.current.resume();
    }

    console.log("playing", isPlaying);
    setIsPlaying(true);

    // Create the buffer node and attach our audio buffer
    const sourceNode = audioCtx.current.createBufferSource();
    sourceNode.buffer = audioBuffer;

    // Loop through any dynamic audio nodes and attach them
    sourceNode.connect(analyser.current);
    analyser.current.connect(audioCtx.current.destination);

    // Add any event listeners to audio (like when it's done)
    sourceNode.addEventListener("ended", handleDone);

    // Play audio
    sourceNode.start();
  };

  //   useEffect(() => {
  //     const click = () => {
  //       console.log("clicked canvas");
  //       handlePlay();
  //     };
  //     document.getElementsByTagName("canvas")[0].addEventListener("click", click);

  //     return () => {
  //       document
  //         .getElementsByTagName("canvas")[0]
  //         .removeEventListener("click", click);
  //     };
  //   }, [audioBuffer]);

  return (
    <group>
      {audioBuffer && (
        <WaveformMesh analyser={analyser} bufferLength={bufferLength} />
      )}
    </group>
  );
};

export default WaveformWrapper;
