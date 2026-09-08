import { describe, it, expect, beforeEach } from 'vitest';
import { VirtualFileSystem } from '../../src/core/vfs/vfs';

describe('Virtual File System (VFS)', () => {
  let vfs: VirtualFileSystem;

  beforeEach(() => {
    vfs = new VirtualFileSystem();
  });

  it('should normalize home directory shortcuts', () => {
    const p1 = vfs.normalizePath('~', '/');
    expect(p1).toBe('/home/saketh');

    const p2 = vfs.normalizePath('~/projects', '/');
    expect(p2).toBe('/home/saketh/projects');
  });

  it('should resolve relative parent directory paths', () => {
    const normalized = vfs.normalizePath('../..', '/home/saketh/projects');
    expect(normalized).toBe('/home');
  });

  it('should list directory contents in home', () => {
    const listRes = vfs.listDirectory('/home/saketh', '/');
    expect(listRes.success).toBe(true);
    expect(listRes.nodes?.length).toBeGreaterThan(0);
    const names = listRes.nodes?.map((n) => n.name);
    expect(names).toContain('README.md');
    expect(names).toContain('projects');
  });

  it('should read file content correctly', () => {
    const readRes = vfs.readFile('/home/saketh/README.md', '/');
    expect(readRes.success).toBe(true);
    expect(readRes.content).toContain('SAKETH.OS');
  });

  it('should return error when reading nonexistent file', () => {
    const readRes = vfs.readFile('/nonexistent.txt', '/');
    expect(readRes.success).toBe(false);
  });
});
