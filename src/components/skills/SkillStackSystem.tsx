import React, { useState, useMemo } from 'react';
import { skillsData } from '../../content/skills';
import { SkillItem } from '../../types/content';
import { useTerminalStore } from '../../state/useTerminalStore';
import { Search, FolderGit2, X, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../terminal/SectionHeader';
import styles from './SkillStackSystem.module.css';

interface SkillStackSystemProps {
  initialCategory?: string;
  initialInspectSkillId?: string;
}

export const SkillStackSystem: React.FC<SkillStackSystemProps> = ({
  initialCategory,
  initialInspectSkillId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingSkill, setInspectingSkill] = useState<SkillItem | null>(() => {
    if (initialInspectSkillId) {
      for (const cat of skillsData) {
        const found = cat.skills.find(
          (s) => s.id.toLowerCase() === initialInspectSkillId.toLowerCase() || s.name.toLowerCase() === initialInspectSkillId.toLowerCase()
        );
        if (found) return found;
      }
    }
    return null;
  });

  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const categories = [
    'All',
    'Languages',
    'Backend',
    'Frontend',
    'AI / ML',
    'Databases',
    'Cloud',
    'DevOps',
    'Tools',
    'Core CS'
  ];

  const filteredCategories = useMemo(() => {
    return skillsData
      .map((cat) => {
        if (selectedCategory !== 'All' && cat.category.toLowerCase() !== selectedCategory.toLowerCase() && cat.slug.toLowerCase() !== selectedCategory.toLowerCase()) {
          return null;
        }

        const filteredSkills = cat.skills.filter((skill) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          const matchName = skill.name.toLowerCase().includes(q) || skill.id.toLowerCase().includes(q);
          const matchUsed = skill.whatUsedFor.toLowerCase().includes(q);
          const matchConcepts = skill.engineeringConcepts.some((c) => c.toLowerCase().includes(q));
          const matchTech = skill.relatedTech.some((t) => t.toLowerCase().includes(q));
          const matchProjects = skill.associatedProjects.some((p) => p.name.toLowerCase().includes(q));
          return matchName || matchUsed || matchConcepts || matchTech || matchProjects;
        });

        if (filteredSkills.length === 0) return null;
        return {
          ...cat,
          skills: filteredSkills
        };
      })
      .filter(Boolean) as typeof skillsData;
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.stackContainer} role="region" aria-label="Engineering Stack Diagnostic System">
      {/* 1. Clean Prominent Section Header */}
      <SectionHeader
        badge="SYS.STACK_DIAGNOSTICS"
        title="SKILLS & TECH STACK"
        subtitle="Categorized engineering competencies, distributed architecture concepts, and toolchain"
        path="saketh@portfolio:~/skills"
      />

      <div className={styles.topBar}>

        <div className={styles.legendRow}>
          <div className={styles.legendItem}>
            <span className={styles.legendDotPrimary}>●</span>
            <span>Primary (Production Core)</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotWorking}>●</span>
            <span>Working Knowledge</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDotExploring}>●</span>
            <span>Exploring</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Category Filters */}
      <div className={styles.searchFilterSection}>
        <div className={styles.searchInputWrap}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search stack by technology, architecture concept, or associated project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryTabBtn} ${selectedCategory.toLowerCase() === cat.toLowerCase() ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Deep Skill Inspector Card (If Active) */}
      {inspectingSkill && (
        <div className={styles.inspectorDetailCard}>
          <div className={styles.inspectorTop}>
            <div className={styles.inspectorTechTitle}>
              <span>{inspectingSkill.name}</span>
              <span
                className={`${styles.classificationBadge} ${
                  inspectingSkill.classification === 'Primary'
                    ? styles.badgePrimary
                    : inspectingSkill.classification === 'Working Knowledge'
                      ? styles.badgeWorking
                      : styles.badgeExploring
                }`}
              >
                [{inspectingSkill.classification.toUpperCase()}]
              </span>
              <span className={styles.asciiMeter}>{inspectingSkill.asciiMeter}</span>
            </div>

            <button className={styles.closeInspectorBtn} onClick={() => setInspectingSkill(null)}>
              <X size={14} style={{ display: 'inline', marginRight: '4px' }} />
              CLOSE [ESC]
            </button>
          </div>

          <div className={styles.inspectorGrid}>
            <div className={styles.inspectorSection}>
              <div className={styles.inspectorSectionTitle}>[01. WHAT I&apos;VE USED IT FOR]</div>
              <p className={styles.inspectorText}>{inspectingSkill.whatUsedFor}</p>
            </div>

            <div className={styles.inspectorSection}>
              <div className={styles.inspectorSectionTitle}>[02. ASSOCIATED PRODUCTION PROJECTS]</div>
              {inspectingSkill.associatedProjects.length === 0 ? (
                <span style={{ fontSize: '11px', color: '#768390' }}>Independent R&amp;D / Tooling</span>
              ) : (
                <div className={styles.projectLinksList}>
                  {inspectingSkill.associatedProjects.map((p) => (
                    <button
                      key={p.slug}
                      className={styles.projectPillBtn}
                      onClick={() => executeCommand(`projects ${p.slug}`)}
                    >
                      <FolderGit2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {p.name}
                      <ExternalLink size={10} style={{ display: 'inline', marginLeft: '4px' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.inspectorSection}>
              <div className={styles.inspectorSectionTitle}>[03. ENGINEERING CONCEPTS &amp; ARCHITECTURE]</div>
              <div className={styles.conceptsList}>
                {inspectingSkill.engineeringConcepts.map((c, i) => (
                  <span key={i} className={styles.conceptTag}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.inspectorSection}>
              <div className={styles.inspectorSectionTitle}>[04. RELATED TECH &amp; ECOSYSTEM]</div>
              <div className={styles.conceptsList}>
                {inspectingSkill.relatedTech.map((t, i) => (
                  <span key={i} className={styles.conceptTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Categorized Diagnostic Skill Grid */}
      <div className={styles.categoryGroupsList}>
        {filteredCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#768390' }}>
            No technologies matched query &quot;{searchQuery}&quot;.
          </div>
        ) : (
          filteredCategories.map((catGroup) => (
            <div key={catGroup.category} className={styles.categoryBlock}>
              <div className={styles.categoryBlockHeader}>
                <span className={styles.categoryName}>{catGroup.category}</span>
                <span className={styles.categoryDesc}>{catGroup.description}</span>
              </div>

              <div className={styles.skillsTable}>
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`${styles.skillRow} ${inspectingSkill?.id === skill.id ? styles.selectedRow : ''}`}
                    onClick={() => setInspectingSkill(skill)}
                  >
                    <div className={styles.skillName}>{skill.name}</div>
                    <div
                      className={`${styles.asciiMeter} ${
                        skill.classification === 'Primary'
                          ? styles.meterPrimary
                          : skill.classification === 'Working Knowledge'
                            ? styles.meterWorking
                            : styles.meterExploring
                      }`}
                    >
                      {skill.asciiMeter}
                    </div>
                    <div
                      className={`${styles.classificationBadge} ${
                        skill.classification === 'Primary'
                          ? styles.badgePrimary
                          : skill.classification === 'Working Knowledge'
                            ? styles.badgeWorking
                            : styles.badgeExploring
                      }`}
                    >
                      {skill.classification}
                    </div>
                    <div className={styles.keyCapPreview}>{skill.keyCapabilities.slice(0, 3).join(' • ')}</div>
                    <button
                      className={styles.inspectActionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingSkill(skill);
                      }}
                    >
                      INSPECT &gt;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 5. Terminal CLI Action Quick Chips */}
      <div className={styles.cliActionRow}>
        <span className={styles.cliLabel}>Execute:</span>
        <button className={styles.cliChip} onClick={() => executeCommand('skills backend')}>
          &gt; skills backend
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('skills ai')}>
          &gt; skills ai
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('skills databases')}>
          &gt; skills databases
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('inspect spring-boot')}>
          &gt; inspect spring-boot
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('inspect qdrant')}>
          &gt; inspect qdrant
        </button>
        <button className={styles.cliChip} onClick={() => executeCommand('inspect python')}>
          &gt; inspect python
        </button>
      </div>
    </div>
  );
};
