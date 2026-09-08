export type VFSNodeType = 'file' | 'directory' | 'symlink';

export interface BaseVFSNode {
  name: string;
  type: VFSNodeType;
  permissions?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VFSFile extends BaseVFSNode {
  type: 'file';
  content: string;
  extension?: string;
  sizeBytes?: number;
}

export interface VFSDirectory extends BaseVFSNode {
  type: 'directory';
  children: Record<string, VFSNode>;
}

export interface VFSSymlink extends BaseVFSNode {
  type: 'symlink';
  targetPath: string;
}

export type VFSNode = VFSFile | VFSDirectory | VFSSymlink;
