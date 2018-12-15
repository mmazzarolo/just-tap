import Sound from "react-native-sound";

Sound.setCategory("Playback", true);

const availableSounds = {
  start: new Sound("water-drip-1.mp3", Sound.MAIN_BUNDLE, () => null),
  tap: new Sound("water-drip-2.mp3", Sound.MAIN_BUNDLE, () => null)
};

export const playSound = (soundName: keyof typeof availableSounds) => {
  const sound = availableSounds[soundName];
  sound.getCurrentTime((currentTime: number) => {
    if (currentTime === 0) {
      sound.play();
    } else {
      sound.stop(() => {
        sound.play();
      });
    }
  });
};
