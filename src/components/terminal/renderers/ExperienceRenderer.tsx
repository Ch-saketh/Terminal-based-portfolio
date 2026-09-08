import React from 'react';
import { experienceData } from '../../../content/experience';
import styles from './Renderers.module.css';

export const ExperienceRenderer: React.FC = () => {
  return (
    <div className={styles.experienceContainer}>
      <div className={styles.helpHeader}>
        <span className={styles.highlightText}>CAREER TIMELINE</span> & Engineering Track Record
      </div>

      {experienceData.map((exp) => (
        <div key={exp.id} className={styles.expCard}>
          <div className={styles.expCardHeader}>
            <div>
              <div className={styles.expRole}>{exp.role}</div>
              <div className={styles.expCompany}>
                {exp.company} &bull; {exp.location}
              </div>
            </div>
            <div className={styles.expMeta}>
              <span>
                {exp.period.start} &mdash; {exp.period.end}
              </span>
              {exp.period.isCurrent && <span className={styles.expCurrent}>Current</span>}
            </div>
          </div>

          <div className={styles.expSummary}>{exp.summary}</div>

          <div className={styles.metricsList}>
            {exp.impactMetrics.map((m, idx) => (
              <div key={idx}>⚡ {m}</div>
            ))}
          </div>

          <div className={styles.expAchievements}>
            {exp.keyAchievements.map((ach, idx) => (
              <div key={idx}>&bull; {ach}</div>
            ))}
          </div>

          <div className={styles.techStackRow}>
            {exp.technologies.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
