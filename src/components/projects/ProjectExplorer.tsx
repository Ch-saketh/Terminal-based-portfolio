import React, { useState, useMemo } from 'react';
import { projectsData } from '../../content/projects';
import { ProjectDetail } from './ProjectDetail';
import { useTerminalStore } from '../../state/useTerminalStore';
import { Folder, Search, Star, Terminal } from 'lucide-react';
import styles from './ProjectExplorer.module.css';

interface ProjectExplorerProps {
  initialSlug?: string;
  featuredOnly?: boolean;
  tagFilter?: string;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  initialSlug,
  featuredOnly = false,
  tagFilter
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState(tagFilter || '');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
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

  const activeProject = useMemo(() => {
    if (!selectedSlug) return null;
    return projectsData.find((p) => p.slug === selectedSlug || p.id === selectedSlug) || null;
  }, [selectedSlug]);

  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={() => setSelectedSlug(null)} />;
  }

  return (
    <div className={styles.explorerContainer} role="region" aria-label="Projects Filesystem Explorer">
      {/* 1. Header Bar */}
      <div className={styles.headerBar}>
        <div className={styles.headerTitle}>
          <span className={styles.systemBadge}>[VFS.PROJECTS]</span>
          <span>saketh@portfolio:~/projects</span>
          <span style={{ color: '#768390', fontSize: '11px' }}>({filteredProjects.length} directories found)</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => executeCommand('ls -la projects')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#768390',
              fontFamily: 'inherit',
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            &gt; ls -la
          </button>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className={styles.searchFilterRow}>
        <div className={styles.searchInputWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search projects by name, architecture keyword, or technology (e.g. Qdrant, Go, Playwright)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      {/* 3. Project Directories List */}
      <div className={styles.projectList}>
        {filteredProjects.length === 0 ? (
          <div className={styles.emptyNotice}>
            No projects matched query &quot;{searchQuery}&quot;. Try &apos;projects&apos; to view all.
          </div>
        ) : (
          filteredProjects.map((p) => (
            <div
              key={p.id}
              className={styles.projectRowCard}
              onClick={() => setSelectedSlug(p.slug)}
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

              <div className={styles.quickActionRow}>
                <span className={styles.inspectHint}>drwxr-xr-x &bull; 6 files &bull; README.md</span>
                <button
                  className={styles.inspectCmdBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    executeCommand(`projects ${p.slug}`);
                  }}
                >
                  <Terminal size={11} style={{ display: 'inline', marginRight: '4px' }} />
                  &gt; cat {p.slug}/README.md
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
