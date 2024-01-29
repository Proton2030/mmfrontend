import Sound from "react-native-sound";

// Initialize the sound module

export const playSound = (soundPath: any) => {
  const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Failed to load the sound', error);
      return;
    }
    // Loaded successfully, you can now play the sound
    sound.play((success) => {
      if (success) {
        console.log('Successfully played the sound');
      } else {
        console.error('Failed to play the sound');
      }
    });
  });
};
