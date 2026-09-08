import React, { useState, useMemo } from 'react';
import { gitMilestonesData } from '../../content/timeline';
import { GitCommitMilestone } from '../../types/content';
import { useTerminalStore } from '../../state/useTerminalStore';
import { GitCommit, Calendar, X, ExternalLink, Award, BookOpen, Layers } from 'lucide-react';
import styles from './GitTimeline.module.css';

interface GitTimelineProps {
  initialSelectedHash?: string;
  initialView?: 'graph' | 'timeline' | 'log';
}

export const GitTimeline: React.FC<GitTimelineProps> = ({
  initialSelectedHash,
  initialView = 'graph'
}) => {
  const [activeView, setActiveView] = useState<'graph' | 'timeline' | 'log'>(initialView);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [inspectingCommit, setInspectingCommit] = useState<GitCommitMilestone | null>(() => {
    if (initialSelectedHash) {
      return (
        gitMilestonesData.find(
          (m) => m.hash.toLowerCase() === initialSelectedHash.toLowerCase() || m.hash.startsWith(initialSelectedHash)
        ) || null
      );
    }
    return null;
  });

  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const categories = ['All', 'Project', 'Hackathon', 'Career', 'Education'];

  const filteredMilestones = useMemo(() => {
    return gitMilestonesData.filter((m) => {
      if (categoryFilter === 'All') return true;
      return m.category.toLowerCase() === categoryFilter.toLowerCase();
    });
  }, [categoryFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hackathon':
        return <Award size={13} color="#ffbd2e" />;
      case 'education':
        return <BookOpen size={13} color="#c084fc" />;
      case 'project':
        return <Layers size={13} color="var(--color-primary-green, #00ff88)" />;
      default:
        return <GitCommit size={13} color="var(--color-primary-cyan, #00f2fe)" />;
    }
  };

  return (
    <div className={styles.gitContainer} role="region" aria-label="Career Git History and Timeline">
      {/* 1. Header Navigation Bar */}
      <div className={styles.headerBar}>
        <div className={styles.headerTitle}>
          <span className={styles.systemBadge}>[SYS.GIT_JOURNEY]</span>
          <span>saketh@portfolio:~/journey</span>
          <span style={{ color: '#768390', fontSize: '11px' }}>(HEAD -&gt; main)</span>
        </div>

        <div className={styles.viewTabs}>
          <button
            className={`${styles.viewTabBtn} ${activeView === 'graph' ? styles.activeView : ''}`}
            onClick={() => setActiveView('graph')}
          >
            [ 01 Git Graph Matrix ]
          </button>
          <button
            className={`${styles.viewTabBtn} ${activeView === 'timeline' ? styles.activeView : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            [ 02 Visual Timeline ]
          </button>
          <button
            className={`${styles.viewTabBtn} ${activeView === 'log' ? styles.activeView : ''}`}
            onClick={() => setActiveView('log')}
          >
            [ 03 Compact CLI Log ]
          </button>
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div className={styles.categoryFilterRow}>
        <span style={{ fontSize: '11px', color: '#768390' }}>Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.catBtn} ${categoryFilter === cat ? styles.activeCat : ''}`}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Deep Commit Inspector Card (If Active) */}
      {inspectingCommit && (
        <div className={styles.commitInspectorCard}>
          <div className={styles.inspectorTopBar}>
            <div>
              <div className={styles.commitTitle}>{inspectingCommit.event}</div>
              <div className={styles.commitMetaBlock}>
                <div><strong>commit:</strong> {inspectingCommit.hash} ({inspectingCommit.branch})</div>
                <div><strong>Author:</strong> {inspectingCommit.author}</div>
                <div><strong>Date:</strong> {inspectingCommit.date}</div>
              </div>
            </div>

            <button className={styles.closeBtn} onClick={() => setInspectingCommit(null)}>
              <X size={14} style={{ display: 'inline', marginRight: '4px' }} />
              CLOSE [ESC]
            </button>
          </div>

          <div className={styles.inspectorSection}>
            <div className={styles.sectionHeader}>[01. WHAT HAPPENED]</div>
            <p style={{ margin: 0, fontSize: '12px', color: '#adbac7', lineHeight: '1.45' }}>
              {inspectingCommit.whatHappened}
            </p>
          </div>

          <div className={styles.inspectorSection}>
            <div className={styles.sectionHeader}>[02. WHAT WAS LEARNED]</div>
            <p style={{ margin: 0, fontSize: '12px', color: '#adbac7', lineHeight: '1.45' }}>
              {inspectingCommit.whatWasLearned}
            </p>
          </div>

          <div className={styles.inspectorSection}>
            <div className={styles.sectionHeader}>[03. TECHNOLOGIES &amp; STACK]</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {inspectingCommit.technologies.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    color: '#e6edf3'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {inspectingCommit.diffPreview && (
            <div className={styles.inspectorSection}>
              <div className={styles.sectionHeader}>[04. SIMULATED GIT DIFF]</div>
              <pre className={styles.diffContainer}>
                <code>{inspectingCommit.diffPreview}</code>
              </pre>
            </div>
          )}

          {inspectingCommit.links && inspectingCommit.links.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
              {inspectingCommit.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (link.isCli && link.cliCmd) {
                      executeCommand(link.cliCmd);
                    } else if (link.url) {
                      window.open(link.url, '_blank');
                    }
                  }}
                  style={{
                    background: 'rgba(0, 242, 254, 0.08)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    color: 'var(--color-primary-cyan, #00f2fe)',
                    fontFamily: 'inherit',
                    fontSize: '11px',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ExternalLink size={11} />
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. VIEW 1: Git Graph Matrix */}
      {activeView === 'graph' && (
        <div className={styles.gitGraphContainer}>
          {filteredMilestones.map((m) => (
            <div
              key={m.hash}
              className={`${styles.commitRowCard} ${inspectingCommit?.hash === m.hash ? styles.selectedRow : ''}`}
              onClick={() => setInspectingCommit(m)}
            >
              <div className={styles.graphSymbol}>{m.graphConnector || '* '}</div>
              <div className={styles.commitHashBadge}>{m.hash}</div>
              <div className={styles.commitMsgCol}>
                <span className={styles.branchPill}>{m.branch}</span>
                <span className={styles.commitShortText}>{m.shortMessage || m.message}</span>
              </div>
              <div className={styles.commitDateText}>{m.date}</div>
              <button
                className={styles.showCommitBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setInspectingCommit(m);
                }}
              >
                SHOW &gt;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 5. VIEW 2: Visual Career Timeline (Non-Programmer Friendly) */}
      {activeView === 'timeline' && (
        <div className={styles.visualTimelineList}>
          {filteredMilestones.map((m) => (
            <div
              key={m.hash}
              className={styles.timelineCard}
              onClick={() => setInspectingCommit(m)}
            >
              <div className={styles.timelineCardTop}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {getCategoryIcon(m.category)}
                  <span className={styles.eventTitle}>{m.event}</span>
                </div>
                <div className={styles.eventDateBadge}>
                  <Calendar size={11} style={{ display: 'inline', marginRight: '4px' }} />
                  {m.date}
                </div>
              </div>

              <p className={styles.eventNarrative}>{m.whatHappened}</p>

              <div className={styles.techPillsRow}>
                {m.technologies.slice(0, 5).map((t, idx) => (
                  <span key={idx} className={styles.techPill}>
                    {t}
                  </span>
                ))}
                {m.technologies.length > 5 && (
                  <span className={styles.techPill}>+{m.technologies.length - 5}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. VIEW 3: Compact CLI Log */}
      {activeView === 'log' && (
        <div className={styles.compactLogContainer}>
          {filteredMilestones.map((m, idx) => (
            <div
              key={m.hash}
              className={styles.compactLogLine}
              onClick={() => setInspectingCommit(m)}
            >
              <span style={{ color: 'var(--color-primary-green, #00ff88)' }}>{m.graphConnector || '*'}</span>
              <span style={{ color: 'var(--color-primary-cyan, #00f2fe)', fontWeight: 600 }}>{m.hash}</span>
              <span style={{ color: '#ffbd2e', fontSize: '11px' }}>
                ({idx === 0 ? 'HEAD -> ' : ''}{m.branch})
              </span>
              <span style={{ color: '#ffffff' }}>{m.message}</span>
              <span style={{ color: '#768390', fontSize: '11px', marginLeft: 'auto' }}>{m.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* 7. Bottom CLI Quick Actions */}
      <div className={styles.cliBar}>
        <span className={styles.cliLabel}>Execute:</span>
        <button className={styles.cliChip} onClick={() => executeCommand('git log --oneline')}>
          &gt; git log --oneline
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('git log --graph')}>
          &gt; git log --graph
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('git show a81f2c7')}>
          &gt; git show a81f2c7
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('git show 91be72a')}>
          &gt; git show 91be72a
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('git show 4cd881e')}>
          &gt; git show 4cd881e
        </button>
      </div>
    </div>
  );
};
