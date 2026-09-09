import React from 'react';
import { ProjectExplorer } from '../../projects/ProjectExplorer';
import { ProjectDetail } from '../../projects/ProjectDetail';
import { projectsData } from '../../../content/projects';

interface ProjectsRendererProps {
  filterSlug?: string;
  featuredOnly?: boolean;
  tagFilter?: string;
  initialSearch?: string;
}

export const ProjectsRenderer: React.FC<ProjectsRendererProps> = ({
  filterSlug,
  featuredOnly,
  tagFilter,
  initialSearch
}) => {
  if (filterSlug) {
    const single = projectsData.find(
      (p) =>
        p.slug.toLowerCase() === filterSlug.toLowerCase() ||
        p.id.toLowerCase() === filterSlug.toLowerCase()
    );
    if (single) {
      return <ProjectDetail project={single} />;
    }
  }

  return (
    <ProjectExplorer
      initialSlug={filterSlug}
      featuredOnly={featuredOnly}
      tagFilter={tagFilter}
      initialSearch={initialSearch}
    />
  );
};
