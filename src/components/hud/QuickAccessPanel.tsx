import React from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { profileData } from '../../content/profile';
import {
  Github,
  Linkedin,
  FileText,
  Mail,
  Code2,
  FolderGit2
} from 'lucide-react';
import styles from './Hud.module.css';

export const QuickAccessPanel: React.FC = () => {
  const executeCommand = useTerminalStore((s) => s.executeCommand);

  const quickLinks = [
    {
      id: 'github',
      label: 'GitHub',
      icon: <Github size={18} />,
      action: () => window.open(profileData.github, '_blank')
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <Linkedin size={18} />,
      action: () => window.open(profileData.linkedin, '_blank')
    },
    {
      id: 'resume',
      label: 'Resume',
      icon: <FileText size={18} />,
      action: () => window.open('/saketh-resume.pdf', '_blank')
    },
    {
      id: 'email',
      label: 'Email',
      icon: <Mail size={18} />,
      action: () => executeCommand('contact', { clearBefore: true, noEcho: true })
    },
    {
      id: 'leetcode',
      label: 'LeetCode',
      icon: <Code2 size={18} />,
      action: () => window.open('https://leetcode.com', '_blank')
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderGit2 size={18} />,
      action: () => executeCommand('projects', { clearBefore: true, noEcho: true })
    }
  ];

  return (
    <div className={styles.panelBox}>
      <div className={styles.panelHeader}>
        <span className={styles.onlineDot} />
        <span>QUICK ACCESS</span>
      </div>

      <div className={styles.quickGrid}>
        {quickLinks.map((item) => (
          <button key={item.id} className={styles.quickBtn} onClick={item.action}>
            <span className={styles.quickIcon}>{item.icon}</span>
            <span className={styles.quickLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
