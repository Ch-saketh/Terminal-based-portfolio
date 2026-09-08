import React from 'react';
import { GitTimeline } from '../../experience/GitTimeline';

interface ExperienceRendererProps {
  initialCommitHash?: string;
  initialView?: 'graph' | 'timeline' | 'log';
}

export const ExperienceRenderer: React.FC<ExperienceRendererProps> = ({
  initialCommitHash,
  initialView = 'graph'
}) => {
  return (
    <GitTimeline
      initialSelectedHash={initialCommitHash}
      initialView={initialView}
    />
  );
};
