import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';

export const SCENE_DURATIONS = {
  intro: 4500,
  assessments: 5500,
  cadence: 5000,
  outro: 5000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  assessments: Scene2,
  cadence: Scene3,
  outro: Scene4,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-dark)] font-body">
      {/* Persistent background layers */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/bg-navy-abstract.png`}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt=""
          animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Balance scale image layer, fades in for outro */}
        <motion.img
          src={`${import.meta.env.BASE_URL}images/bg-balance-scale.png`}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
          alt=""
          animate={{
            opacity: sceneIndex === 0 || sceneIndex === 3 ? 0.3 : 0,
            scale: sceneIndex === 3 ? 1.1 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-[var(--color-bg-dark)] opacity-80" />
      </div>

      {/* Persistent abstract particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-[var(--color-accent)] blur-[100px] opacity-20"
          animate={{
            x: ['10vw', '80vw', '40vw'],
            y: ['20vh', '60vh', '80vh'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[var(--color-secondary)] blur-[120px] opacity-40"
          animate={{
            x: ['70vw', '20vw', '60vw'],
            y: ['60vh', '10vh', '40vh'],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Persistent UI frame */}
      <div className="absolute inset-6 border border-white/5 rounded-2xl z-20 pointer-events-none flex justify-between p-6">
        <div className="text-[0.7vw] text-white/30 uppercase tracking-widest font-mono">
          ER // Diag_v1.0
        </div>
        <div className="text-[0.7vw] text-white/30 uppercase tracking-widest font-mono">
          <motion.span
            key={sceneIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            SEQ_0{sceneIndex + 1}
          </motion.span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}
