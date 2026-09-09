import React, { useState } from 'react';
import { profileData } from '../../../content/profile';
import { useTerminalStore } from '../../../state/useTerminalStore';
import { SectionHeader } from '../SectionHeader';
import styles from './AboutRenderer.module.css';

interface AboutRendererProps {
  initialTab?: 'md' | 'json' | 'overview';
}

export const AboutRenderer: React.FC<AboutRendererProps> = ({ initialTab = 'md' }) => {
  const [activeTab, setActiveTab] = useState<'md' | 'json' | 'overview'>(initialTab);
  const [copied, setCopied] = useState(false);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(profileData.profileJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.aboutContainer} role="region" aria-label="About Developer Profile">
      {/* 1. Clean Prominent Section Header */}
      <SectionHeader
        badge="DEVELOPER PROFILE"
        title="ABOUT SAKETH"
        subtitle="AI & software engineer specializing in scalable full-stack and machine learning systems"
        path="saketh@portfolio:~/about"
      />

      {/* 2. Format Switcher Tabs */}
      <div className={styles.inspectorHeader}>
        <div className={styles.inspectorTitle}>
          <span className={styles.systemBadge}>[SYS.PROFILE_INSPECTOR]</span>
          <span>saketh@portfolio:~/about</span>
        </div>

        <div className={styles.tabControls}>
          <button
            className={`${styles.formatTab} ${activeTab === 'md' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('md')}
          >
            [ 01 about.md ]
          </button>
          <button
            className={`${styles.formatTab} ${activeTab === 'json' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('json')}
          >
            [ 02 profile.json ]
          </button>
          <button
            className={`${styles.formatTab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            [ 03 overview.sys ]
          </button>
        </div>
      </div>

      {/* 2. Markdown / Detailed Inspector View */}
      {activeTab === 'md' && (
        <div className={styles.sectionsContainer}>
          {/* Education */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.EDU]</span>
              <span>Education</span>
            </div>
            {profileData.education.map((edu, i) => (
              <div key={i} className={styles.educationCard}>
                <div className={styles.eduDegree}>{edu.degree}</div>
                <div className={styles.eduMeta}>
                  {edu.institution} &bull; {edu.timeline} &bull; {edu.location}
                </div>
                <div className={styles.eduFocus}>Focus: {edu.focus.join(', ')}</div>
              </div>
            ))}
          </div>

          {/* Engineering Interests */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.INTERESTS]</span>
              <span>Engineering Interests</span>
            </div>
            <ul className={styles.contentList}>
              {profileData.engineeringInterests.map((interest, i) => (
                <li key={i} className={styles.contentItem}>
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          {/* Development Philosophy */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.PHILOSOPHY]</span>
              <span>Development Philosophy</span>
            </div>
            <div className={styles.philosophyGrid}>
              {profileData.developmentPhilosophy.map((phil, i) => (
                <div key={i} className={styles.philosophyCard}>
                  <div className={styles.philosophyTitle}>{phil.title}</div>
                  <div className={styles.philosophyDesc}>{phil.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.CURRENT_FOCUS]</span>
              <span>Current Focus</span>
            </div>
            <ul className={styles.contentList}>
              {profileData.currentFocus.map((focus, i) => (
                <li key={i} className={styles.contentItem}>
                  {focus}
                </li>
              ))}
            </ul>
          </div>

          {/* Long-Term Goals */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.GOALS]</span>
              <span>Long-Term Goals</span>
            </div>
            <ul className={styles.contentList}>
              {profileData.longTermGoals.map((goal, i) => (
                <li key={i} className={styles.contentItem}>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 3. Interactive JSON Representation */}
      {activeTab === 'json' && (
        <div className={styles.jsonContainer}>
          <div className={styles.jsonTopBar}>
            <span className={styles.jsonFileName}>profile.json (JSON 4-space formatted)</span>
            <button className={styles.copyBtn} onClick={handleCopyJson}>
              {copied ? '✓ COPIED' : 'COPY JSON'}
            </button>
          </div>
          <pre className={styles.jsonCode}>
            <code>{JSON.stringify(profileData.profileJson, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* 4. Telemetry / Overview System View */}
      {activeTab === 'overview' && (
        <div className={styles.sectionsContainer}>
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.BIO]</span>
              <span>Executive Summary</span>
            </div>
            <div className={styles.contentList}>
              {profileData.bio.map((b, i) => (
                <p key={i} style={{ margin: 0 }}>
                  {b}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[SYS.ROLES]</span>
              <span>Identity Archetypes</span>
            </div>
            <ul className={styles.contentList}>
              {profileData.roles.map((r, i) => (
                <li key={i} className={styles.contentItem}>
                  <strong>{r}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 5. Quick Terminal Action Buttons */}
      <div className={styles.quickActionsRow}>
        <span className={styles.actionLabel}>Execute:</span>
        <button className={styles.cmdChip} onClick={() => executeCommand('whoami', { clearBefore: true, noEcho: true })}>
          &gt; whoami
        </button>
        <button className={styles.cmdChip} onClick={() => executeCommand('cat about.md', { clearBefore: true, noEcho: true })}>
          &gt; cat about.md
        </button>
        <button className={styles.cmdChip} onClick={() => executeCommand('cat profile.json', { clearBefore: true, noEcho: true })}>
          &gt; cat profile.json
        </button>
        <button className={styles.cmdChip} onClick={() => executeCommand('projects', { clearBefore: true, noEcho: true })}>
          &gt; projects
        </button>
        <button className={styles.cmdChip} onClick={() => executeCommand('skills', { clearBefore: true, noEcho: true })}>
          &gt; skills
        </button>
      </div>
    </div>
  );
};
