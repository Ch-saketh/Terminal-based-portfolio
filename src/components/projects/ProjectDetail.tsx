import React, { useState } from 'react';
import { ProjectItem } from '../../types/content';
import { useTerminalStore } from '../../state/useTerminalStore';
import { ExternalLink, Github, ArrowLeft, Star, Layers, Cpu, CheckCircle } from 'lucide-react';
import styles from './ProjectDetail.module.css';

interface ProjectDetailProps {
  project: ProjectItem;
  onBack?: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeTab, setActiveTab] = useState<'readme' | 'architecture' | 'stack' | 'metrics'>('readme');
  const [copied, setCopied] = useState(false);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

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
              title="Back to projects"
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
          >
            [ 01 README.md ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'architecture' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            [ 02 architecture.sys ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'stack' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('stack')}
          >
            [ 03 stack.json ]
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'metrics' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            [ 04 metrics.json ]
          </button>
        </div>
      </div>

      {/* 2. Project Hero Identity */}
      <div className={styles.projectHero}>
        <h2 className={styles.projectTitle}>{project.title}</h2>
        <p className={styles.projectTagline}>{project.tagline}</p>
      </div>

      {/* 3. Links Row */}
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
            <span>SOURCE CODE</span>
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

      {/* 4. Tab 1: Full README Breakdown */}
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

          {/* Problem & Solution Grid */}
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

          {/* Core Features */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[04.FEATURES]</span>
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

          {/* Engineering Challenges */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[05.CHALLENGES]</span>
              <span>Technical Hurdles & Resolutions</span>
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

          {/* Production Metrics */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[06.METRICS]</span>
              <span>Production Scale & Benchmark Results</span>
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

          {/* Tech Stack Chips */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>[07.STACK]</span>
              <span>Technology Stack</span>
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
              <span>System Design & Component Flow</span>
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
              <span>Key Architectural Trade-Offs & Decisions</span>
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

      {/* 6. Tab 3: Interactive stack.json */}
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

      {/* 7. Tab 4: Interactive metrics.json */}
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

      {/* 8. Bottom CLI Quick Actions */}
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
