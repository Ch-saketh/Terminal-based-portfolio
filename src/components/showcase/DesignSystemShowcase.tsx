import React, { useState } from 'react';
import {
  StatusIndicator,
  Badge,
  CommandButton,
  Panel,
  PanelHeader,
  TerminalCursor,
  Divider,
  SystemLog,
  CodeBlock,
  ASCIIArt,
  Tooltip,
  Modal,
  Toast,
  ToastItem
} from '../ui';
import { useSystemStore, SystemTheme } from '../../state/useSystemStore';
import {
  Terminal as TermIcon,
  Shield,
  Zap,
  Activity,
  Bell,
  Code,
  Layers,
  Palette,
  Eye
} from 'lucide-react';
import styles from './DesignSystemShowcase.module.css';

interface DesignSystemShowcaseProps {
  onClose?: () => void;
}

export const DesignSystemShowcase: React.FC<DesignSystemShowcaseProps> = ({ onClose }) => {
  const theme = useSystemStore((s) => s.theme);
  const setTheme = useSystemStore((s) => s.setTheme);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const triggerToast = (type: 'info' | 'success' | 'warning' | 'error') => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastItem = {
      id,
      type,
      title: `${type.toUpperCase()} Telemetry Event`,
      message: `System notification dispatched at ${new Date().toLocaleTimeString()}`
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const sampleLogs = [
    {
      timestamp: '19:42:01',
      level: 'info' as const,
      subsystem: 'KERNEL',
      message: 'SAKETH.OS v2.4.0 bootstrap complete'
    },
    {
      timestamp: '19:42:02',
      level: 'success' as const,
      subsystem: 'VFS',
      message: 'Mounted /home/saketh with read-write permissions'
    },
    {
      timestamp: '19:42:05',
      level: 'warn' as const,
      subsystem: 'AUDIO',
      message: 'WebAudio autoplay policy unmuted on user gesture'
    },
    {
      timestamp: '19:42:09',
      level: 'info' as const,
      subsystem: 'NET',
      message: 'Listening on virtual WebSocket gateway port 3001'
    }
  ];

  const sampleCode = `// SAKETH.OS Core Tokenizer & Flag Parser
export function parseCommand(raw: string): ParsedCommand {
  const tokens = tokenizeCommandLine(raw);
  const [name, ...args] = tokens;
  return { name: name.toLowerCase(), args, flags: parseFlags(args) };
}`;

  const asciiSample = `
  ███████╗ █████╗ ██╗  ██╗███████╗████████╗██╗  ██╗
  ██╔════╝██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝██║  ██║
  ███████╗███████║█████╔╝ █████╗     ██║   ███████║
  ╚════██║██╔══██║██╔═██╗ ██╔══╝     ██║   ██╔══██║
  ███████║██║  ██║██║  ██╗███████╗   ██║   ██║  ██║
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
`;

  return (
    <div className={styles.showcaseViewport}>
      {/* Toast Manager Layer */}
      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Showcase Header */}
      <header className={styles.header}>
        <div className={styles.headerTitleRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Layers size={20} color="var(--accent-primary)" />
            <h1 className={styles.mainTitle}>SAKETH.OS Design System & Visual Language</h1>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Badge variant="primary" size="md">
              Phase 2 Specification
            </Badge>
            {onClose && (
              <CommandButton variant="outline" size="sm" onClick={onClose}>
                Return to OS
              </CommandButton>
            )}
          </div>
        </div>
        <p className={styles.headerDesc}>
          Monospace-first, dark developer operating system UI primitives, tokens, and interaction
          states.
        </p>
      </header>

      <div className={styles.grid}>
        {/* 1. Theme & Color Tokens */}
        <Panel variant="card">
          <PanelHeader
            title="1. Color Tokens & Active Theme"
            icon={<Palette size={16} />}
            action={
              <div style={{ display: 'flex', gap: 4 }}>
                {(['emerald', 'cyan', 'amber', 'purple'] as SystemTheme[]).map((t) => (
                  <CommandButton
                    key={t}
                    size="sm"
                    variant={theme === t ? 'primary' : 'outline'}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                  </CommandButton>
                ))}
              </div>
            }
          />
          <div className={styles.tokenGrid}>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--bg-primary)' }} />
              <span>Background</span>
            </div>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--accent-primary)' }} />
              <span>Primary Green</span>
            </div>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--accent-secondary)' }} />
              <span>Secondary Cyan</span>
            </div>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--accent-tertiary)' }} />
              <span>Accent Violet</span>
            </div>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--accent-warning)' }} />
              <span>Warning Amber</span>
            </div>
            <div className={styles.swatchCard}>
              <div className={styles.swatch} style={{ background: 'var(--accent-error)' }} />
              <span>Error Red</span>
            </div>
          </div>
        </Panel>

        {/* 2. Status Indicators & Pulses */}
        <Panel variant="card">
          <PanelHeader title="2. Status Indicators & Pulses" icon={<Activity size={16} />} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <StatusIndicator status="online" label="Online / Ready" pulse />
            <StatusIndicator status="busy" label="Kernel Busy" pulse={false} />
            <StatusIndicator status="idle" label="System Idle" />
            <StatusIndicator status="warning" label="High Memory" />
            <StatusIndicator status="error" label="Socket Failure" />
          </div>
        </Panel>

        {/* 3. Badges & Tags */}
        <Panel variant="card">
          <PanelHeader title="3. Semantic Badges & Pills" icon={<Shield size={16} />} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Badge variant="primary" icon={<Zap size={10} />}>
              Primary Emerald
            </Badge>
            <Badge variant="secondary" icon={<Activity size={10} />}>
              Secondary Cyan
            </Badge>
            <Badge variant="accent" icon={<Code size={10} />}>
              Accent Violet
            </Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral Tag</Badge>
          </div>
        </Panel>

        {/* 4. Command Buttons & Interaction States */}
        <Panel variant="card">
          <PanelHeader
            title="4. Command Buttons & Interaction States"
            icon={<TermIcon size={16} />}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <CommandButton variant="primary" size="md">
              Primary Button
            </CommandButton>
            <CommandButton variant="secondary" size="md">
              Secondary Button
            </CommandButton>
            <CommandButton variant="outline" size="md">
              Outline Button
            </CommandButton>
            <CommandButton variant="ghost" size="md">
              Ghost Button
            </CommandButton>
            <CommandButton variant="danger" size="md">
              Danger Action
            </CommandButton>
            <CommandButton isTerminalChip size="sm">
              &gt; terminal chip
            </CommandButton>
            <CommandButton
              variant="primary"
              size="md"
              isLoading={btnLoading}
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 2000);
              }}
            >
              {btnLoading ? 'Executing...' : 'Test Loading State'}
            </CommandButton>
            <CommandButton variant="outline" size="md" disabled>
              Disabled State
            </CommandButton>
          </div>
        </Panel>

        {/* 5. Tooltips & Modals & Dialogs */}
        <Panel variant="card">
          <PanelHeader title="5. Tooltips & Accessible Modal" icon={<Eye size={16} />} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <Tooltip content="HUD Tooltip on Top" position="top">
              <CommandButton size="sm" variant="outline">
                Hover Top Tooltip
              </CommandButton>
            </Tooltip>
            <Tooltip content="HUD Tooltip on Bottom" position="bottom">
              <CommandButton size="sm" variant="outline">
                Hover Bottom Tooltip
              </CommandButton>
            </Tooltip>
            <CommandButton variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
              Open Accessible Modal Dialog
            </CommandButton>
          </div>
        </Panel>

        {/* 6. System Toast Notifications */}
        <Panel variant="card">
          <PanelHeader title="6. Toast Notification Emitter" icon={<Bell size={16} />} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <CommandButton size="sm" variant="outline" onClick={() => triggerToast('success')}>
              Trigger Success Toast
            </CommandButton>
            <CommandButton size="sm" variant="outline" onClick={() => triggerToast('info')}>
              Trigger Info Toast
            </CommandButton>
            <CommandButton size="sm" variant="outline" onClick={() => triggerToast('warning')}>
              Trigger Warning Toast
            </CommandButton>
            <CommandButton size="sm" variant="outline" onClick={() => triggerToast('error')}>
              Trigger Error Toast
            </CommandButton>
          </div>
        </Panel>

        {/* 7. Terminal Cursor & Prompt */}
        <Panel variant="card">
          <PanelHeader title="7. Terminal Cursors & Divider" icon={<TermIcon size={16} />} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 'var(--text-sm)' }}
            >
              <span>
                Block Cursor: <TerminalCursor shape="block" />
              </span>
              <span>
                Line Cursor: <TerminalCursor shape="line" />
              </span>
              <span>
                Underline Cursor: <TerminalCursor shape="underline" />
              </span>
            </div>
            <Divider label="Section Divider with Label" variant="glow" />
          </div>
        </Panel>

        {/* 8. System Telemetry Log Stream */}
        <Panel variant="card">
          <PanelHeader title="8. SystemLog Telemetry Stream" icon={<Activity size={16} />} />
          <SystemLog entries={sampleLogs} maxHeight="140px" />
        </Panel>

        {/* 9. Formatted CodeBlock */}
        <Panel variant="card">
          <PanelHeader
            title="9. Formatted CodeBlock with Clipboard Copy"
            icon={<Code size={16} />}
          />
          <CodeBlock code={sampleCode} language="typescript" showLineNumbers />
        </Panel>

        {/* 10. ASCII Banner Renderer */}
        <Panel variant="card">
          <PanelHeader title="10. ASCII Art Banner" icon={<Layers size={16} />} />
          <ASCIIArt art={asciiSample} color="primary" withGlow />
        </Panel>
      </div>

      {/* Sample Accessible Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="[MODAL] System Diagnostic Inspection"
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <CommandButton size="sm" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CommandButton>
            <CommandButton size="sm" variant="primary" onClick={() => setIsModalOpen(false)}>
              Acknowledge
            </CommandButton>
          </div>
        }
      >
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          This dialog demonstrates the accessible, focus-trapped modal overlay with keyboard{' '}
          <code>Escape</code> listening and dark graphite glassmorphism styling.
        </p>
      </Modal>
    </div>
  );
};
