import React, { useState, useMemo, useEffect, useRef } from 'react';
import { projectsData } from '../../content/projects';
import { ProjectDetail } from './ProjectDetail';
import { useTerminalStore } from '../../state/useTerminalStore';
import { Folder, Search, Star, Terminal, ExternalLink, Github } from 'lucide-react';
import { SectionHeader } from '../terminal/SectionHeader';
import styles from './ProjectExplorer.module.css';

interface ProjectExplorerProps {
  initialSlug?: string;
  featuredOnly?: boolean;
  tagFilter?: string;
  initialSearch?: string;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  initialSlug,
  featuredOnly = false,
  tagFilter,
  initialSearch
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState(initialSearch || tagFilter || '');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const categories = ['All', 'AI / Machine Learning', 'Distributed Systems', 'Full Stack', 'Developer Tools'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      if (featuredOnly && !p.featured) return false;
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesTech = p.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = p.description.toLowerCase().includes(q);
        return matchesName || matchesTitle || matchesTech || matchesDesc;
      }
      return true;
    });
  }, [featuredOnly, categoryFilter, searchQuery]);

  const safeSelectedIndex = Math.min(selectedIndex, Math.max(0, filteredProjects.length - 1));

  // Sync URL hash
  useEffect(() => {
    if (typeof window !== 'undefined' && !selectedSlug) {
      window.location.hash = '#/projects';
    }
  }, [selectedSlug]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on '/'
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // If search input is focused, allow Escape to blur
      if (document.activeElement === searchInputRef.current) {
        if (e.key === 'Escape') {
          searchInputRef.current?.blur();
        }
        if (e.key === 'Enter' && filteredProjects.length > 0) {
          setSelectedSlug(filteredProjects[0].slug);
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredProjects.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % Math.max(1, filteredProjects.length));
      } else if (e.key === 'Enter' && filteredProjects[safeSelectedIndex]) {
        e.preventDefault();
        setSelectedSlug(filteredProjects[safeSelectedIndex].slug);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects, safeSelectedIndex]);

  const activeProject = useMemo(() => {
    if (!selectedSlug) return null;
    return projectsData.find((p) => p.slug === selectedSlug || p.id === selectedSlug) || null;
  }, [selectedSlug]);

  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={() => setSelectedSlug(null)} />;
  }

  return (
    <div className={styles.explorerContainer} role="region" aria-label="Projects Filesystem Explorer">
      {/* 1. Clean Prominent Section Header */}
      <SectionHeader
        badge="REPOSITORIES & ARCHITECTURE"
        title="PROJECTS"
        subtitle="Production systems, microservices, and interactive repository explorer"
        path={`saketh@portfolio:~/projects (${filteredProjects.length} repositories)`}
        action={
          <button
            onClick={() => executeCommand('ls -la projects')}
            style={{
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              color: 'var(--color-primary-green, #00ff88)',
              fontFamily: 'inherit',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            &gt; ls -la
          </button>
        }
      />

      {/* 2. Interactive POSIX Filesystem Raw Directory Block */}
      <div
        style={{
          background: '#04070c',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          borderRadius: '4px',
          padding: '10px 14px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '12px',
          lineHeight: '1.6'
        }}
      >
        <div style={{ color: '#768390', fontSize: '11px', marginBottom: '6px', borderBottom: '1px dashed rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
          # POSIX REPOSITORY DIRECTORIES (Click or ArrowUp/Down + Enter to explore):
        </div>
        {filteredProjects.map((p, idx) => {
          const isSelected = idx === safeSelectedIndex;
          return (
            <div
              key={`fs-${p.id}`}
              onClick={() => {
                setSelectedIndex(idx);
                setSelectedSlug(p.slug);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '3px',
                background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'transparent',
                color: isSelected ? '#00f2fe' : '#adbac7',
                transition: 'all 0.1s ease'
              }}
            >
              <span style={{ color: isSelected ? '#00ff88' : '#535d68', width: '12px' }}>
                {isSelected ? '▶' : ' '}
              </span>
              <span style={{ color: isSelected ? 'var(--color-primary-green, #00ff88)' : 'var(--color-primary-cyan, #00f2fe)', fontWeight: 600 }}>
                {`drwxr-xr-x ${p.slug}/`}
              </span>
              <span style={{ color: '#535d68', fontSize: '11px' }}>
                — {p.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Search & Category Filters */}
      <div className={styles.searchFilterRow}>
        <div className={styles.searchInputWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            ref={searchInputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search projects (name, Qdrant, Spring Boot, React, ML) — Press / to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: '#768390',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              ✕
            </button>
          )}
        </div>

        <div className={styles.categoryFilters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${categoryFilter === cat ? styles.activeFilter : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Project Directories Cards List */}
      <div className={styles.projectList}>
        {filteredProjects.length === 0 ? (
          <div className={styles.emptyNotice}>
            No projects matched query &quot;{searchQuery}&quot;. Press &apos;projects&apos; to view all.
          </div>
        ) : (
          filteredProjects.map((p, idx) => {
            const isSelected = idx === safeSelectedIndex;
            return (
              <div
                key={p.id}
                className={`${styles.projectRowCard} ${isSelected ? styles.selectedCard : ''}`}
                onClick={() => {
                  setSelectedIndex(idx);
                  setSelectedSlug(p.slug);
                }}
              >
                <div className={styles.projectRowTop}>
                  <div className={styles.projectDirName}>
                    <Folder size={16} className={styles.dirIcon} />
                    <span>{p.slug}/</span>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>({p.name})</span>
                  </div>

                  <div className={styles.projectMetaRight}>
                    <span className={styles.categoryTag}>{p.category}</span>
                    {p.stars && (
                      <span className={styles.starsCount}>
                        <Star size={11} fill="#ffbd2e" /> {p.stars}
                      </span>
                    )}
                  </div>
                </div>

                <p className={styles.projectTagline}>{p.tagline}</p>

                <div className={styles.techChipsRow}>
                  {p.technologies.slice(0, 6).map((tech, i) => (
                    <span key={i} className={styles.techChip}>
                      {tech}
                    </span>
                  ))}
                  {p.technologies.length > 6 && (
                    <span className={styles.techChip}>+{p.technologies.length - 6} more</span>
                  )}
                </div>

                {/* Direct Links (GitHub & Live Demo) & CLI Chips */}
                <div className={styles.quickActionRow}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#adbac7',
                          textDecoration: 'none',
                          fontSize: '11px'
                        }}
                      >
                        <Github size={12} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {p.links.liveDemo && (
                      <a
                        href={p.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--color-primary-cyan, #00f2fe)',
                          textDecoration: 'none',
                          fontSize: '11px'
                        }}
                      >
                        <ExternalLink size={12} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      className={styles.inspectCmdBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        executeCommand(`cd ${p.slug} && ls`);
                      }}
                      title="Change into directory and list contents"
                    >
                      &gt; cd {p.slug}
                    </button>
                    <button
                      className={styles.inspectCmdBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        executeCommand(`cat projects/${p.slug}/README.md`);
                      }}
                    >
                      <Terminal size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      &gt; cat README.md
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
