import { CommandDefinition } from '../../types/terminal';
import { gitMilestonesData } from '../../content/timeline';
import { GitTimeline } from '../../components/experience/GitTimeline';

export const gitCommands: CommandDefinition[] = [
  {
    name: 'git',
    description: 'Version control CLI & career timeline navigation engine',
    usage: 'git [log|show|status|branch] [--oneline] [--graph]',
    category: 'portfolio',
    options: [
      { flag: '--oneline', description: 'Display concise commit hash and title per line' },
      { flag: '--graph', description: 'Display ASCII branch graph alongside commit history' }
    ],
    execute: (ctx) => {
      const subCommand = ctx.args[0]?.toLowerCase() || 'log';

      if (subCommand === 'status') {
        return {
          type: 'text',
          text: `On branch main\nYour branch is up to date with 'origin/main'.\n\nNothing to commit, working tree clean.`
        };
      }

      if (subCommand === 'branch') {
        return {
          type: 'text',
          text: `* \x1b[32mmain\x1b[0m\n  feature/ai-agents\n  hackathons\n  releases`
        };
      }

      if (subCommand === 'show') {
        const commitHash = ctx.args[1]?.toLowerCase();
        if (!commitHash) {
          return {
            type: 'error',
            text: 'git show: missing commit hash. Usage: git show <commit-hash> (e.g. git show a81f2c7)'
          };
        }

        const match = gitMilestonesData.find(
          (m) => m.hash.toLowerCase().startsWith(commitHash) || m.hash.toLowerCase() === commitHash
        );

        if (!match) {
          return {
            type: 'error',
            text: `fatal: bad object ${commitHash}`
          };
        }

        return {
          type: 'custom',
          component: <GitTimeline initialSelectedHash={match.hash} initialView="graph" />
        };
      }

      if (subCommand === 'log') {
        const isOneline = !!ctx.flags.oneline || ctx.args.includes('--oneline');
        const isGraph = !!ctx.flags.graph || ctx.args.includes('--graph');

        if (isOneline && !isGraph) {
          const lines = gitMilestonesData.map((m, idx) => {
            const headTag = idx === 0 ? ' (HEAD -> main)' : '';
            return `${m.hash} ${m.shortMessage || m.message}${headTag}`;
          });
          return {
            type: 'text',
            text: lines.join('\n')
          };
        }

        if (isGraph) {
          const lines = gitMilestonesData.map((m, idx) => {
            const connector = m.graphConnector || '*   ';
            const headTag = idx === 0 ? ' (HEAD -> main)' : m.branch !== 'main' ? ` (${m.branch})` : '';
            return `${connector}${m.hash}${headTag} ${m.shortMessage || m.message}`;
          });
          return {
            type: 'text',
            text: lines.join('\n')
          };
        }

        // Full Interactive Git Timeline View
        return {
          type: 'custom',
          component: <GitTimeline initialView="graph" />
        };
      }

      return {
        type: 'error',
        text: `git: '${subCommand}' is not a recognized git command. Try: git log, git log --oneline, git log --graph, git show <hash>`
      };
    }
  }
];
