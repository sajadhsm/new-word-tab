const audioInstance = new Audio();

export default {
  setAudio: (src) => {
    audioInstance.src = src ? `https:${src}` : null;
  },
  playAudio: () => audioInstance.play(),
}