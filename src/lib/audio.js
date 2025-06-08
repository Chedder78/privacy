export const AudioManager = {
  bgMusic: new Howl({ src: ['/assets/sounds/underwater.mp3'] }),
  
  playBubble() {
    new Howl({ src: ['/assets/sounds/bubble.mp3'], volume: 0.3 }).play();
  }
}
