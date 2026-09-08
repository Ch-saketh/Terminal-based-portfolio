import React from 'react';
import { SkillStackSystem } from '../../skills/SkillStackSystem';

interface SkillsRendererProps {
  category?: string;
  inspectSkillId?: string;
}

export const SkillsRenderer: React.FC<SkillsRendererProps> = ({
  category,
  inspectSkillId
}) => {
  return (
    <SkillStackSystem
      initialCategory={category}
      initialInspectSkillId={inspectSkillId}
    />
  );
};
