import React from 'react';
import { skillsData } from '../../../content/skills';
import styles from './Renderers.module.css';

export const SkillsRenderer: React.FC = () => {
  return (
    <div className={styles.skillsContainer}>
      <div className={styles.helpHeader}>
        <span className={styles.highlightText}>SYSTEM COMPETENCIES</span> & Technical Proficiency
        Index
      </div>

      {skillsData.map((cat) => (
        <div key={cat.category} className={styles.skillCategoryCard}>
          <div className={styles.skillCatHeader}>
            <span className={styles.skillCatTitle}>{cat.category}</span>
            <span className={styles.skillCatDesc}>{cat.description}</span>
          </div>

          <div className={styles.skillsTable}>
            {cat.skills.map((skill) => (
              <div key={skill.name} className={styles.skillRow}>
                <span className={styles.skillName}>{skill.name}</span>
                <div>
                  <span className={`${styles.skillLevel} ${styles[skill.level]}`}>
                    {skill.level}
                  </span>
                </div>
                <span className={styles.skillYears}>{skill.years} yrs exp</span>
                <div className={styles.skillTags}>
                  {skill.tags.map((tag) => (
                    <span key={tag} className={styles.badgeTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
