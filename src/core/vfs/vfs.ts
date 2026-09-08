import { VFSDirectory, VFSNode, VFSFile } from '../../types/vfs';
import { createInitialVFS } from './initial-fs';

export class VirtualFileSystem {
  private root: VFSDirectory;
  public readonly homeDir = '/home/saketh';

  constructor(initialTree?: VFSDirectory) {
    this.root = initialTree || createInitialVFS();
  }

  /**
   * Normalizes path resolving '.', '..', '~', and extra slashes.
   */
  public normalizePath(path: string, cwd: string): string {
    let target = path.trim();
    if (!target) return cwd;

    // Handle home shortcut '~'
    if (target === '~') {
      return this.homeDir;
    }
    if (target.startsWith('~/')) {
      target = `${this.homeDir}/${target.slice(2)}`;
    }

    // Determine if relative or absolute
    let segments: string[];
    if (target.startsWith('/')) {
      segments = target.split('/').filter(Boolean);
    } else {
      const cwdSegments = cwd.split('/').filter(Boolean);
      const targetSegments = target.split('/').filter(Boolean);
      segments = [...cwdSegments, ...targetSegments];
    }

    const resolved: string[] = [];
    for (const seg of segments) {
      if (seg === '.') continue;
      if (seg === '..') {
        resolved.pop();
      } else {
        resolved.push(seg);
      }
    }

    return `/${resolved.join('/')}`;
  }

  /**
   * Finds a node by absolute or relative path.
   */
  public getNode(path: string, cwd: string): VFSNode | null {
    const absPath = this.normalizePath(path, cwd);
    if (absPath === '/' || absPath === '') return this.root;

    const segments = absPath.split('/').filter(Boolean);
    let current: VFSNode = this.root;

    for (const seg of segments) {
      if (current.type !== 'directory') {
        return null;
      }
      const child: VFSNode | undefined = current.children[seg];
      if (!child) return null;
      current = child;
    }

    return current;
  }

  /**
   * Lists the children of a directory.
   */
  public listDirectory(path: string, cwd: string): { success: boolean; nodes?: VFSNode[]; error?: string } {
    const node = this.getNode(path, cwd);
    if (!node) {
      return { success: false, error: `ls: cannot access '${path}': No such file or directory` };
    }
    if (node.type !== 'directory') {
      return { success: true, nodes: [node] };
    }
    const children = Object.values(node.children).sort((a, b) => {
      // Directories first, then alphabetical
      if (a.type === 'directory' && b.type !== 'directory') return -1;
      if (a.type !== 'directory' && b.type === 'directory') return 1;
      return a.name.localeCompare(b.name);
    });
    return { success: true, nodes: children };
  }

  /**
   * Reads a file content by path.
   */
  public readFile(path: string, cwd: string): { success: boolean; content?: string; error?: string } {
    const node = this.getNode(path, cwd);
    if (!node) {
      return { success: false, error: `cat: ${path}: No such file or directory` };
    }
    if (node.type === 'directory') {
      return { success: false, error: `cat: ${path}: Is a directory` };
    }
    return { success: true, content: (node as VFSFile).content };
  }

  /**
   * Validates if a path is a navigable directory for `cd`.
   */
  public changeDirectory(path: string, cwd: string): { success: boolean; newCwd?: string; error?: string } {
    const targetPath = this.normalizePath(path, cwd);
    const node = this.getNode(targetPath, '/');

    if (!node) {
      return { success: false, error: `cd: no such file or directory: ${path}` };
    }
    if (node.type !== 'directory') {
      return { success: false, error: `cd: not a directory: ${path}` };
    }

    return { success: true, newCwd: targetPath };
  }

  /**
   * Recursive tree generator for `tree` command.
   */
  public generateTree(path: string, cwd: string, maxDepth = 3): string {
    const node = this.getNode(path, cwd);
    if (!node || node.type !== 'directory') return '';

    const lines: string[] = [node.name === '/' ? '/' : node.name];

    const traverse = (dir: VFSDirectory, prefix: string, currentDepth: number) => {
      if (currentDepth > maxDepth) return;
      const entries = Object.values(dir.children);
      entries.forEach((child, index) => {
        const isLast = index === entries.length - 1;
        const pointer = isLast ? '└── ' : '├── ';
        const nextPrefix = prefix + (isLast ? '    ' : '│   ');
        const display = child.type === 'directory' ? `${child.name}/` : child.name;
        lines.push(`${prefix}${pointer}${display}`);

        if (child.type === 'directory') {
          traverse(child as VFSDirectory, nextPrefix, currentDepth + 1);
        }
      });
    };

    traverse(node, '', 1);
    return lines.join('\n');
  }
}

export const vfsInstance = new VirtualFileSystem();
