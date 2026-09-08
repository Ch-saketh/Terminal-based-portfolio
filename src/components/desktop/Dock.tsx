import React from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useWindowStore } from '../../state/useWindowStore';
import { useSystemStore } from '../../state/useSystemStore';
import {
  Terminal as TerminalIcon,
  FolderGit2,
  Cpu,
  Briefcase,
  Activity,
  FileText,
  Mail,
  Binary
} from 'lucide-react';
import styles from './Desktop.module.css';

export const Dock: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const openWindow = useWindowStore((s) => s.openWindow);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const matrixRainActive = useSystemStore((s) => s.matrixRainActive);
  const setMatrixRain = useSystemStore((s) => s.setMatrixRain);

  const dockItems = [
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <TerminalIcon size={20} />,
      action: () => {
        openWindow('terminal');
      }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <FolderGit2 size={20} />,
      action: () => {
        openWindow('terminal');
        executeCommand('projects');
      }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <Cpu size={20} />,
      action: () => {
        openWindow('terminal');
        executeCommand('skills');
      }
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: <Briefcase size={20} />,
      action: () => {
        openWindow('terminal');
        executeCommand('experience');
      }
    },
    {
      id: 'monitor',
      name: 'Telemetry',
      icon: <Activity size={20} />,
      action: () => {
        openWindow('systemMonitor');
      }
    },
    {
      id: 'matrix',
      name: 'Matrix Rain',
      icon: <Binary size={20} />,
      action: () => {
        setMatrixRain(!matrixRainActive);
      }
    },
    {
      id: 'contact',
      name: 'Contact Relay',
      icon: <Mail size={20} />,
      action: () => {
        openWindow('terminal');
        executeCommand('contact');
      }
    },
    {
      id: 'resume',
      name: 'Resume (PDF)',
      icon: <FileText size={20} />,
      action: () => {
        window.open('/saketh-resume.pdf', '_blank');
      }
    }
  ];

  return (
    <nav className={styles.dockContainer} aria-label="System Dock">
      {dockItems.map((item) => {
        const isActive = activeWindowId === item.id || (item.id === 'matrix' && matrixRainActive);

        return (
          <button
            key={item.id}
            className={`${styles.dockItem} ${isActive ? styles.active : ''}`}
            onClick={item.action}
            title={item.name}
          >
            {item.icon}
            {isActive && <div className={styles.dockActiveDot} />}
            <span className={styles.dockTooltip}>{item.name}</span>
          </button>
        );
      })}
    </nav>
  );
};
