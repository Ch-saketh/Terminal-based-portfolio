import React from 'react';
import styles from './WorkstationScene.module.css';

export const WorkstationScene: React.FC = () => {
  return (
    <div className={styles.sceneContainer} aria-hidden="true">
      {/* City Skyline & Stars Window Backdrop */}
      <div className={styles.skylineBackdrop}>
        <div className={styles.moon} />
        <div className={styles.cityBuildings}>
          <div className={`${styles.building} ${styles.b1}`} />
          <div className={`${styles.building} ${styles.b2}`} />
          <div className={`${styles.building} ${styles.b3}`} />
          <div className={`${styles.building} ${styles.b4}`} />
          <div className={`${styles.building} ${styles.b5}`} />
        </div>
      </div>

      {/* Inspiring Wall Posters */}
      <div className={styles.wallPoster1}>
        <div className={styles.posterText}>
          <span>BUILD</span>
          <span>LEARN</span>
          <span>SOLVE</span>
          <span className={styles.highlightWord}>REPEAT_</span>
        </div>
      </div>

      <div className={styles.wallPoster2}>
        <div className={styles.posterText}>
          <span>DISCIPLINE</span>
          <span>CREATIVITY</span>
          <span>CONSISTENCY</span>
          <span className={styles.highlightWord}>FREEDOM</span>
        </div>
      </div>

      <div className={styles.wallQuote}>
        <span>&ldquo;Hard work beats talent when talent doesn&apos;t work hard.&rdquo;</span>
      </div>

      {/* Desk & Workstation Hardware */}
      <div className={styles.deskWrapper}>
        {/* Desk Lamp */}
        <div className={styles.deskLamp}>
          <div className={styles.lampHead} />
          <div className={styles.lampArm} />
          <div className={styles.lampGlow} />
        </div>

        {/* Stack of Engineering Books */}
        <div className={styles.bookStack}>
          <div className={`${styles.book} ${styles.book1}`}>SYSTEM DESIGN</div>
          <div className={`${styles.book} ${styles.book2}`}>MACHINE LEARNING</div>
          <div className={`${styles.book} ${styles.book3}`}>CLEAN CODE</div>
          <div className={`${styles.book} ${styles.book4}`}>BUILD THINGS</div>
        </div>

        {/* Developer Coffee Mug */}
        <div className={styles.coffeeMug}>
          <span>&lt;/&gt;</span>
        </div>

        {/* Dual Coding Monitor Screens */}
        <div className={styles.dualMonitors}>
          <div className={styles.monitorLeft}>
            <div className={styles.screenGlow} />
            <div className={styles.screenCode}>
              <div className={styles.codeLine} style={{ width: '80%' }} />
              <div className={styles.codeLine} style={{ width: '60%' }} />
              <div className={styles.codeLine} style={{ width: '90%', color: 'var(--accent-primary)' }} />
              <div className={styles.codeLine} style={{ width: '70%' }} />
              <div className={styles.codeLine} style={{ width: '45%' }} />
              <div className={styles.codeLine} style={{ width: '85%' }} />
            </div>
            <div className={styles.monitorStand} />
          </div>

          <div className={styles.monitorRight}>
            <div className={styles.laptopScreen}>
              <div className={styles.laptopText}>
                <span>&ldquo;A BETTER VERSION EVERYDAY.&rdquo;</span>
              </div>
            </div>
            <div className={styles.laptopBase} />
          </div>
        </div>

        {/* Developer Silhouette in Hoodie */}
        <div className={styles.devSilhouette}>
          <div className={styles.devHead} />
          <div className={styles.devShoulders} />
          <div className={styles.chairBack} />
        </div>
      </div>

      {/* Desk Motto Banner */}
      <div className={styles.deskMottoBar}>
        <span>&ldquo;Turn ideas into real-world solutions.&rdquo; &mdash; Saketh Chokkapu</span>
      </div>
    </div>
  );
};
