const audio = new Audio(
  "../music/Piano - Mystic Piano - Chill Playthrough.mp3"
);
audio.crossOrigin = "anonymous";
audio.loop = true;

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

source.connect(analyser);
analyser.connect(audioCtx.destination);

const dataArray = new Uint8Array(analyser.frequencyBinCount);

function getFrequencyData() {
  analyser.getByteFrequencyData(dataArray);
  return [...dataArray];
}

function playAudio() {
  audioCtx.resume();

  if (!audio.paused) {
    audio.pause();
  } else {
    audio.play();
  }
}

export { getFrequencyData, playAudio };
