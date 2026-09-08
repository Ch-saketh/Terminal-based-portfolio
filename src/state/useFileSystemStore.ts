import { create } from 'zustand';
import { vfsInstance } from '../core/vfs/vfs';

interface FileSystemState {
  cwd: string;
  changeDirectory: (path: string) => { success: boolean; error?: string };
  resetCwd: () => void;
}

export const useFileSystemStore = create<FileSystemState>((set, get) => ({
  cwd: vfsInstance.homeDir,
  changeDirectory: (path: string) => {
    const res = vfsInstance.changeDirectory(path, get().cwd);
    if (res.success && res.newCwd) {
      set({ cwd: res.newCwd });
      return { success: true };
    }
    return { success: false, error: res.error };
  },
  resetCwd: () => set({ cwd: vfsInstance.homeDir })
}));
