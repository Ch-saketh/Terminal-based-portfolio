import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Disc3 } from 'lucide-react';
import styles from './Hud.module.css';

export const NowPlayingPanel: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.panelBox}>
      <div className={styles.panelHeader}>
        <Disc3 size={13} color="var(--accent-tertiary)" className={isPlaying ? styles.spinDisc : ''} />
        <span>NOW PLAYING</span>
      </div>

      <div className={styles.playerWrapper}>
        <div className={styles.playerTop}>
          <div className={styles.albumArt}>
            <div className={styles.albumArtInner} />
          </div>

          <div className={styles.trackInfo}>
            <div className={styles.trackTitle}>The Builder&apos;s Mindset</div>
            <div className={styles.trackSubtitle}>Focus &bull; Build &bull; Grow</div>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: isPlaying ? '62%' : '40%' }} />
          </div>
          <div className={styles.timeLabels}>
            <span>{isPlaying ? '2:34' : '1:45'}</span>
            <span>4:12</span>
          </div>
        </div>

        <div className={styles.controlsRow}>
          <button className={styles.controlBtn} aria-label="Previous track">
            <SkipBack size={14} />
          </button>
          <button className={styles.playBtn} onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className={styles.controlBtn} aria-label="Next track">
            <SkipForward size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
