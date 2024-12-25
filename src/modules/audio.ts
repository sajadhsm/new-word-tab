const audioInstance = new Audio()

export default {
  setAudio: (src: string) => {
    audioInstance.src = src || ''
  },
  playAudio: () => audioInstance.play(),
}
