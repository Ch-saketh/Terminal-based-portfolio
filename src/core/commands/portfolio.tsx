import { CommandDefinition } from '../../types/terminal';
import { profileData } from '../../content/profile';
import { WhoamiRenderer } from '../../components/terminal/renderers/WhoamiRenderer';
import { AboutRenderer } from '../../components/terminal/renderers/AboutRenderer';
import { ProjectsRenderer } from '../../components/terminal/renderers/ProjectsRenderer';
import { SkillsRenderer } from '../../components/terminal/renderers/SkillsRenderer';
import { ExperienceRenderer } from '../../components/terminal/renderers/ExperienceRenderer';
import { AchievementsRenderer } from '../../components/terminal/renderers/AchievementsRenderer';
import { ContactRenderer } from '../../components/terminal/renderers/ContactRenderer';

export const portfolioCommands: CommandDefinition[] = [
  {
    name: 'whoami',
    aliases: ['bio', 'profile'],
    description: 'Display developer profile, background, and summary statistics',
    usage: 'whoami',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <WhoamiRenderer />
    })
  },
  {
    name: 'about',
    aliases: ['bio-extended', 'about-me'],
    description: 'Detailed developer biography, education, philosophies, focus, and profile.json',
    usage: 'about [--json|--overview]',
    category: 'portfolio',
    options: [
      { flag: '--json', description: 'Render interactive profile.json data schema' },
      { flag: '--overview', description: 'Render overview system summary' }
    ],
    execute: (ctx) => {
      const isJson = !!ctx.flags.json;
      const isOverview = !!ctx.flags.overview;
      const initialTab = isJson ? 'json' : isOverview ? 'overview' : 'md';

      return {
        type: 'custom',
        component: <AboutRenderer initialTab={initialTab} />
      };
    }
  },
  {
    name: 'projects',
    aliases: ['work', 'showcase-projects'],
    description: 'Explore engineering projects, architecture decisions, and metrics',
    usage: 'projects [--featured] [--tag=ai|rust|go] [slug]',
    category: 'portfolio',
    options: [
      { flag: '--featured', description: 'Show only featured flagship projects' },
      { flag: '--tag', description: 'Filter projects by tech stack (e.g. --tag=rust)' }
    ],
    execute: (ctx) => {
      const slugArg = ctx.args[0];
      const featured = !!ctx.flags.featured;
      const tag = typeof ctx.flags.tag === 'string' ? ctx.flags.tag : undefined;

      return {
        type: 'custom',
        component: <ProjectsRenderer filterSlug={slugArg} featuredOnly={featured} tagFilter={tag} />
      };
    }
  },
  {
    name: 'skills',
    aliases: ['stack', 'tech', 'competencies', 'matrix'],
    description: 'Display categorized engineering skill graph, diagnostics, and stack matrix',
    usage: 'skills [backend|ai|databases|frontend|tools|languages|cloud|devops|cs] [--inspect=<tech>]',
    category: 'portfolio',
    options: [
      { flag: '--inspect', description: 'Deep inspect a specific technology' },
      { flag: '--category', description: 'Filter by specific engineering category' }
    ],
    execute: (ctx) => {
      const categoryArg = ctx.args[0] || (typeof ctx.flags.category === 'string' ? ctx.flags.category : undefined);
      const inspectArg = typeof ctx.flags.inspect === 'string' ? ctx.flags.inspect : undefined;

      return {
        type: 'custom',
        component: <SkillsRenderer category={categoryArg} inspectSkillId={inspectArg} />
      };
    }
  },
  {
    name: 'inspect',
    aliases: ['stack-inspect', 'tech-inspect'],
    description: 'Deep inspect a specific technology (e.g. inspect spring-boot, inspect qdrant)',
    usage: 'inspect <technology-id>',
    category: 'portfolio',
    execute: (ctx) => {
      const techId = ctx.args[0];
      if (!techId) {
        return {
          type: 'error',
          text: 'inspect: missing technology identifier. Usage: inspect <technology> (e.g. inspect spring-boot, inspect qdrant, inspect python)'
        };
      }

      return {
        type: 'custom',
        component: <SkillsRenderer inspectSkillId={techId} />
      };
    }
  },
  {
    name: 'experience',
    aliases: ['career', 'jobs'],
    description: 'View career history, achievements, and impact metrics',
    usage: 'experience',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <ExperienceRenderer />
    })
  },
  {
    name: 'achievements',
    aliases: ['honors', 'awards'],
    description: 'Display recognized engineering achievements, scale milestones, and awards',
    usage: 'achievements',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <AchievementsRenderer />
    })
  },
  {
    name: 'contact',
    aliases: ['email', 'reach', 'message'],
    description: 'Open communication channels and interactive message relay',
    usage: 'contact',
    category: 'portfolio',
    execute: () => ({
      type: 'custom',
      component: <ContactRenderer />
    })
  },
  {
    name: 'resume',
    aliases: ['cv'],
    description: 'Download or open official software engineer resume (PDF)',
    usage: 'resume',
    category: 'portfolio',
    execute: () => {
      window.open('/saketh-resume.pdf', '_blank');
      return {
        type: 'success',
        text: 'Opening resume payload [/saketh-resume.pdf] in background tab...'
      };
    }
  },
  {
    name: 'github',
    aliases: ['gh'],
    description: 'Open GitHub profile or display repository stats',
    usage: 'github',
    category: 'portfolio',
    execute: () => {
      window.open(profileData.github, '_blank');
      return {
        type: 'info',
        text: `Navigating to ${profileData.github}`
      };
    }
  }
];
