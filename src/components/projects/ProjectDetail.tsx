import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../../types/content';
import { useTerminalStore } from '../../state/useTerminalStore';
import { ExternalLink, Github, ArrowLeft, Star, Layers, Cpu, CheckCircle, Lightbulb } from 'lucide-react';
import { unlockManager } from '../../core/discovery/UnlockManager';
import styles from './ProjectDetail.module.css';

interface ProjectDetailProps {
  project: ProjectItem;
  onBack?: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'architecture' | 'features' | 'stack' | 'metrics'>('readme');
  const [copied, setCopied] = useState(false);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  // Sync URL hash & unlock BUILDER achievement on project detail viewing
  useEffect(() => {
    if (typeof window !== 'undefined' && project.slug) {
      window.location.hash = `#/projects/${project.slug}`;
    }
    unlockManager.onProjectViewed(project.slug);
  }, [project.slug]);

  // Meaningful unlock triggers on tab deep dive
  useEffect(() => {
    if (activeTab === 'architecture') {
      unlockManager.onArchitectureViewed(project.slug);
    } else if (activeTab === 'metrics') {
      unlockManager.onMetricsViewed(project.slug);
    }
  }, [activeTab, project.slug]);

  // Keyboard navigation for tab switching & Esc to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '1') setActiveTab('readme');
      if (e.key === '2') setActiveTab('architecture');
      if (e.key === '3') setActiveTab('features');
      if (e.key === '4') setActiveTab('stack');
      if (e.key === '5') setActiveTab('metrics');
      if (e.key === 'Escape' && onBack) {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.detailContainer} role="region" aria-label={`Project Deep Dive: ${project.name}`}>
      {/* 1. Breadcrumb & Navigation Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#768390',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px 4px'
              }}
              title="Back to projects (Esc)"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <span>saketh@portfolio:~/projects/{project.slug}</span>
          <span className={styles.categoryBadge}>{project.category}</span>
          <span className={styles.statusPill}>● {project.status}</span>
          {project.stars && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#ffbd2e' }}>
              <Star size={12} fill="#ffbd2e" /> {project.stars}
            </span>
          )}
        </div>

        <div className={styles.tabControls}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'readme' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('readme')}
            title="Press 1"
          >
            [ 01 README.md ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('architecture')}
            title="Press 2"
          >
            [ 02 architecture.sys ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'features' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('features')}
            title="Press 3"
          >
            [ 03 features/ ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'stack' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('stack')}
            title="Press 4"
          >
            [ 04 stack.json ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'metrics' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('metrics')}
            title="Press 5"
          >
            [ 05 metrics.json ]
          </button>
        </div>
      </div>

      {/* 2. Project Hero Identity */}
      <div className={styles.projectHero}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <p className={styles.projectTagline}>{project.tagline}</p>
      </div>

      {/* 3. Links Row (GitHub & Live Demo) */}
      <div className={styles.linksRow}>
        {project.links.liveDemo && (
          <a
            href={project.links.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionLinkBtn} ${styles.liveDemoBtn}`}
          >
            <ExternalLink size={14} />
            <span>LIVE DEMO</span>
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLinkBtn}
          >
            <Github size={14} />
            <span>SOURCE CODE (GITHUB)</span>
          </a>
        )}
        {project.links.docs && (
          <a
            href={project.links.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLinkBtn}
          >
            <Layers size={14} />
            <span>ARCHITECTURE DOCS</span>
          </a>
        )}
      </div>

      {/* 4. Tab 1: Full README Breakdown (All 10 Core Presentation Items) */}
      {activeTab === 'readme' && (
        <div className={styles.sectionsList}>
          {/* WHAT / WHY / HOW */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[01.WHAT]</span>
              <span>What It Is</span>
            </div>
            <p className={styles.sectionBody}>{project.what}</p>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[02.WHY]</span>
              <span>Why It Was Built</span>
            </div>
            <p className={styles.sectionBody}>{project.why}</p>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[03.HOW]</span>
              <span>How It Works</span>
            </div>
            <p className={styles.sectionBody}>{project.how}</p>
          </div>

          {/* 1. Problem & 2. Solution Grid */}
          <div className={styles.problemSolutionGrid}>
            <div className={styles.problemBox}>
              <div className={styles.problemTitle}>THE ENGINEERING PROBLEM</div>
              <p className={styles.sectionBody}>{project.problem}</p>
            </div>
            <div className={styles.solutionBox}>
              <div className={styles.solutionTitle}>THE ARCHITECTED SOLUTION</div>
              <p className={styles.sectionBody}>{project.solution}</p>
            </div>
          </div>

          {/* 3. Architecture & 4. Engineering Decisions */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[04.ARCHITECTURE &amp; DECISIONS]</span>
              <span>System Design &amp; Architectural Decisions</span>
            </div>
            <p className={styles.sectionBody}>{project.architecture.overview}</p>
            {project.architecture.diagramAscii && (
              <pre className={styles.diagramContainer}>
                <code>{project.architecture.diagramAscii}</code>
              </pre>
            )}
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '11px', color: '#00f2fe', fontWeight: 600, letterSpacing: '0.05em' }}>
                KEY ARCHITECTURAL DECISIONS:
              </div>
              {project.architecture.keyDecisions.map((decision, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-primary-cyan, #00f2fe)' }}>&gt;</span>
                  <span style={{ color: '#adbac7', lineHeight: '1.4' }}>{decision}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Core Features */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[05.FEATURES]</span>
              <span>Core Engineering Features</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {project.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <CheckCircle size={14} color="var(--color-primary-green, #00ff88)" />
                  <span style={{ color: '#adbac7' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Engineering Challenges */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[06.CHALLENGES]</span>
              <span>Technical Hurdles &amp; Resolutions</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.challenges.map((c, i) => (
                <div key={i} className={styles.challengeItem}>
                  <div className={styles.challengeTitle}>Hurdle #{i + 1}: {c.challenge}</div>
                  <div className={styles.challengeResolution}>
                    <strong>Resolution:</strong> {c.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Results & Metrics */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[07.RESULTS &amp; METRICS]</span>
              <span>Production Scale &amp; Benchmark Results</span>
            </div>
            <div className={styles.metricsGrid}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metricBadge}>
                  <Cpu size={14} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Key Learnings */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[08.LEARNINGS]</span>
              <span>Key Learnings &amp; Architectural Insights</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.learnings.map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                  <Lightbulb size={14} color="var(--color-primary-green, #00ff88)" style={{ minWidth: '14px', marginTop: '2px' }} />
                  <span style={{ color: '#adbac7', lineHeight: '1.4' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 9. Technologies */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[09.TECHNOLOGIES]</span>
              <span>Full Technology Stack</span>
            </div>
            <div className={styles.stackTagsRow}>
              {project.technologies.map((t, i) => (
                <span key={i} className={styles.stackTag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Architecture Deep Dive */}
      {activeTab === 'architecture' && (
        <div className={styles.sectionsList}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[ARCH.TOPOLOGY]</span>
              <span>System Design &amp; Component Flow</span>
            </div>
            <p className={styles.sectionBody}>{project.architecture.overview}</p>
            {project.architecture.diagramAscii && (
              <pre className={styles.diagramContainer}>
                <code>{project.architecture.diagramAscii}</code>
              </pre>
            )}
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[ARCH.DECISIONS]</span>
              <span>Key Architectural Trade-Offs &amp; Decisions</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.architecture.keyDecisions.map((decision, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: 'var(--color-primary-cyan, #00f2fe)' }}>&gt;</span>
                  <span style={{ color: '#adbac7', lineHeight: '1.4' }}>{decision}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Tab 3: Features & Specifications */}
      {activeTab === 'features' && (
        <div className={styles.sectionsList}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[FEATURES.SPECS]</span>
              <span>Verified Feature Specifications</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', padding: '6px 0' }}>
                  <CheckCircle size={15} color="var(--color-primary-green, #00ff88)" />
                  <span style={{ color: '#e6edf3' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Interactive stack.json */}
      {activeTab === 'stack' && (
        <div className={styles.jsonContainer}>
          <div className={styles.jsonTopBar}>
            <span>~/projects/{project.slug}/stack.json</span>
            <button
              className={styles.copyBtn}
              onClick={() => handleCopy(JSON.stringify(project.techStack, null, 2))}
            >
              {copied ? '✓ COPIED' : 'COPY STACK JSON'}
            </button>
          </div>
          <pre className={styles.jsonCode}>
            <code>{JSON.stringify(project.techStack, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* 8. Tab 5: Interactive metrics.json */}
      {activeTab === 'metrics' && (
        <div className={styles.jsonContainer}>
          <div className={styles.jsonTopBar}>
            <span>~/projects/{project.slug}/metrics.json</span>
            <button
              className={styles.copyBtn}
              onClick={() => handleCopy(JSON.stringify(project.metrics, null, 2))}
            >
              {copied ? '✓ COPIED' : 'COPY METRICS'}
            </button>
          </div>
          <pre className={styles.jsonCode}>
            <code>{JSON.stringify({ project: project.name, metrics: project.metrics, stars: project.stars }, null, 2)}</code>
          </pre>
        </div>
      )}

      {/* 9. Bottom CLI Quick Actions */}
      <div className={styles.cliBar}>
        <span className={styles.cliLabel}>Execute:</span>
        <button className={styles.cliChip} onClick={() => executeCommand(`cat projects/${project.slug}/README.md`)}>
          &gt; cat README.md
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand(`cd projects/${project.slug} && ls`)}>
          &gt; cd projects/{project.slug} &amp;&amp; ls
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('projects')}>
          &gt; projects (all)
        </button>
      </div>
    </div>
  );
};
