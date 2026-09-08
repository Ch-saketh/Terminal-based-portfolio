import { CommandDefinition } from '../../types/terminal';
import { vfsInstance } from '../vfs/vfs';

export const navigationCommands: CommandDefinition[] = [
  {
    name: 'ls',
    aliases: ['ll', 'dir'],
    description: 'List directory contents in virtual POSIX filesystem',
    usage: 'ls [-la] [path]',
    category: 'navigation',
    options: [
      { flag: '-l', description: 'Long listing format with file details' },
      { flag: '-a', description: 'Include hidden files starting with .' }
    ],
    execute: (ctx) => {
      const targetPath = ctx.args[0] || '.';
      const isDetailed = ctx.flags.l || ctx.flags.la || ctx.flags.al || false;
      const showAll = ctx.flags.a || ctx.flags.la || ctx.flags.al || false;

      const res = vfsInstance.listDirectory(targetPath, ctx.cwd);
      if (!res.success || !res.nodes) {
        return { type: 'error', text: res.error || 'Failed to list directory.' };
      }

      let nodes = res.nodes;
      if (!showAll) {
        nodes = nodes.filter((n) => !n.name.startsWith('.'));
      }

      if (nodes.length === 0) {
        return { type: 'text', text: '(empty directory)' };
      }

      if (isDetailed) {
        const lines = nodes.map((n) => {
          const perm = n.permissions || (n.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--');
          const size = (n as any).sizeBytes ? `${(n as any).sizeBytes}B`.padStart(6) : '  4.0K';
          const name = n.type === 'directory' ? `${n.name}/` : n.name;
          return `${perm}  saketh  staff  ${size}  Sep 08 19:42  ${name}`;
        });
        return { type: 'text', text: lines.join('\n') };
      }

      const formatted = nodes
        .map((n) => (n.type === 'directory' ? `${n.name}/` : n.name))
        .join('    ');

      return { type: 'text', text: formatted };
    }
  },
  {
    name: 'cd',
    description: 'Change current working directory in virtual filesystem',
    usage: 'cd <path>',
    category: 'navigation',
    execute: (ctx) => {
      const target = ctx.args[0] || '~';
      const res = ctx.navigateVfs(target);
      if (!res.success) {
        return { type: 'error', text: res.error };
      }
      return { type: 'system' };
    }
  },
  {
    name: 'pwd',
    description: 'Print current working directory',
    usage: 'pwd',
    category: 'navigation',
    execute: (ctx) => ({
      type: 'text',
      text: ctx.cwd
    })
  },
  {
    name: 'cat',
    description: 'Concatenate and print file contents to terminal buffer',
    usage: 'cat <file-path>',
    category: 'navigation',
    execute: (ctx) => {
      if (ctx.args.length === 0) {
        return { type: 'error', text: 'cat: missing file operand. Usage: cat <path>' };
      }
      const target = ctx.args[0];
      const res = vfsInstance.readFile(target, ctx.cwd);
      if (!res.success || res.content === undefined) {
        return { type: 'error', text: res.error || 'Failed to read file.' };
      }
      return { type: 'text', text: res.content };
    }
  },
  {
    name: 'tree',
    description: 'Render visual directory hierarchy tree',
    usage: 'tree [path]',
    category: 'navigation',
    execute: (ctx) => {
      const target = ctx.args[0] || '.';
      const output = vfsInstance.generateTree(target, ctx.cwd);
      if (!output) {
        return { type: 'error', text: `tree: '${target}': No such directory` };
      }
      return { type: 'text', text: output };
    }
  }
];
