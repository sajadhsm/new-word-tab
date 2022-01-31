const audioInstance = new Audio();

export default {
  setAudio: (src: string) => {
    audioInstance.src = src ? `https:${src}` : "";
  },
  playAudio: () => audioInstance.play(),
};
