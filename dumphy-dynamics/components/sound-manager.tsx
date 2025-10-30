'use client';

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface SoundEffect {
  id: string;
  volume: number;
}

// Sound effect configurations (using synthesized audio via Web Audio API)
const createBeep = (frequency: number, duration: number, volume: number = 0.3) => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const useSoundEffects = (enabled: boolean = true) => {
  const soundsRef = useRef<{ [key: string]: () => void }>({});

  useEffect(() => {
    if (!enabled) return;

    // Initialize sound effects
    soundsRef.current = {
      click: () => createBeep(800, 0.05, 0.2),
      hover: () => createBeep(600, 0.03, 0.1),
      success: () => {
        createBeep(523.25, 0.1, 0.3); // C5
        setTimeout(() => createBeep(659.25, 0.1, 0.3), 100); // E5
        setTimeout(() => createBeep(783.99, 0.2, 0.3), 200); // G5
      },
      step: () => createBeep(440, 0.05, 0.15),
      complete: () => {
        createBeep(523.25, 0.15, 0.3);
        setTimeout(() => createBeep(659.25, 0.15, 0.3), 150);
        setTimeout(() => createBeep(783.99, 0.15, 0.3), 300);
        setTimeout(() => createBeep(1046.5, 0.3, 0.3), 450); // C6
      },
      error: () => {
        createBeep(200, 0.1, 0.3);
        setTimeout(() => createBeep(150, 0.2, 0.3), 100);
      },
    };
  }, [enabled]);

  const play = (soundId: string) => {
    if (!enabled) return;
    const sound = soundsRef.current[soundId];
    if (sound) {
      sound();
    }
  };

  return { play };
};

interface SoundManagerProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export default function SoundManager({ children, enabled = true }: SoundManagerProps) {
  return <>{children}</>;
}
