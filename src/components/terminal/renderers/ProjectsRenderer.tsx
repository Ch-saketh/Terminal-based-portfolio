import React from 'react';
import { projectsData } from '../../../content/projects';
import { ProjectItem } from '../../../types/content';
import { ExternalLink, Github, Star } from 'lucide-react';
import styles from './Renderers.module.css';

interface ProjectsRendererProps {
  filterSlug?: string;
  featuredOnly?: boolean;
  tagFilter?: string;
}

export const ProjectsRenderer: React.FC<ProjectsRendererProps> = ({
  filterSlug,
  featuredOnly,
  tagFilter
}) => {
  let displayed: ProjectItem[] = [...projectsData];

  if (filterSlug) {
    displayed = displayed.filter(
      (p) =>
        p.slug.toLowerCase() === filterSlug.toLowerCase() ||
        p.id.toLowerCase() === filterSlug.toLowerCase()
    );
  }

  if (featuredOnly) {
    displayed = displayed.filter((p) => p.featured);
  }

  if (tagFilter) {
    const t = tagFilter.toLowerCase();
    displayed = displayed.filter(
      (p) =>
        p.techStack.core.some((item) => item.toLowerCase().includes(t)) ||
        p.category.toLowerCase().includes(t)
    );
  }

  if (displayed.length === 0) {
    return (
      <div className={styles.projectsContainer}>
        <p className={styles.descText}>
          No projects matched query{filterSlug ? ` '${filterSlug}'` : ''}
          {tagFilter ? ` with tag '${tagFilter}'` : ''}.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.projectsHeader}>
        <span>
          Showing <strong>{displayed.length}</strong> engineering project
          {displayed.length > 1 ? 's' : ''}
        </span>
        <span className={styles.usageText}>
          Tip: run <code>cat /home/saketh/projects/&lt;slug&gt;.md</code> for raw markdown
        </span>
      </div>

      {displayed.map((project) => (
        <div key={project.id} className={styles.projectCard}>
          <div className={styles.projectCardTop}>
            <div className={styles.projectTitleRow}>
              <span className={styles.projectTitle}>{project.title}</span>
              {project.featured && <span className={styles.featuredBadge}>Featured</span>}
              {project.stars && (
                <span className={styles.badgeTag}>
                  <Star size={12} color="#f59e0b" /> {project.stars}
                </span>
              )}
            </div>
            <span className={styles.projectCategory}>{project.category}</span>
          </div>

          <div className={styles.projectTagline}>{project.tagline}</div>
          <div className={styles.projectDesc}>{project.description}</div>

          <div className={styles.projectArch}>
            <div className={styles.projectArchTitle}>Architecture & Concurrency Design</div>
            <div>{project.architecture.overview}</div>
          </div>

          {project.metrics && project.metrics.length > 0 && (
            <div className={styles.metricsList}>
              {project.metrics.map((m, idx) => (
                <div key={idx}>⚡ {m}</div>
              ))}
            </div>
          )}

          <div className={styles.techStackRow}>
            {project.techStack.core.map((t) => (
              <span key={t} className={`${styles.techTag} ${styles.highlight}`}>
                {t}
              </span>
            ))}
            {project.techStack.infrastructure.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
            {project.techStack.databases.map((t) => (
              <span key={t} className={styles.techTag}>
                {t}
              </span>
            ))}
          </div>

          <div className={styles.projectLinksRow}>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className={styles.projectLinkBtn}
              >
                <Github size={13} /> Source Code
              </a>
            )}
            {project.links.liveDemo && (
              <a
                href={project.links.liveDemo}
                target="_blank"
                rel="noreferrer"
                className={styles.projectLinkBtn}
              >
                <ExternalLink size={13} /> Live Deployment
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
