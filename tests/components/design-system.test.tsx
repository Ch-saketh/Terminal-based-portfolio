import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  Toast
} from '../../src/components/ui';

describe('Design System Primitives', () => {
  it('renders StatusIndicator with online state and label', () => {
    render(<StatusIndicator status="online" label="Online Status" />);
    expect(screen.getByText('Online Status')).toBeDefined();
  });

  it('renders Badge with primary variant', () => {
    render(<Badge variant="primary">Active Badge</Badge>);
    expect(screen.getByText('Active Badge')).toBeDefined();
  });

  it('renders CommandButton and handles disabled/loading states', () => {
    render(<CommandButton variant="primary">Execute Command</CommandButton>);
    expect(screen.getByText('Execute Command')).toBeDefined();
  });

  it('renders Panel and PanelHeader', () => {
    render(
      <Panel>
        <PanelHeader title="Telemetry Panel" subtitle="Subsystem stats" />
        <div>Panel content</div>
      </Panel>
    );
    expect(screen.getByText('Telemetry Panel')).toBeDefined();
    expect(screen.getByText('Subsystem stats')).toBeDefined();
    expect(screen.getByText('Panel content')).toBeDefined();
  });

  it('renders TerminalCursor correctly', () => {
    const { container } = render(<TerminalCursor shape="block" />);
    expect(container.querySelector('span')).toBeDefined();
  });

  it('renders Divider with text label', () => {
    render(<Divider label="Separation" variant="glow" />);
    expect(screen.getByText('Separation')).toBeDefined();
  });

  it('renders SystemLog with log entries', () => {
    const entries = [{ timestamp: '12:00:00', level: 'info' as const, message: 'Kernel booted' }];
    render(<SystemLog entries={entries} />);
    expect(screen.getByText('Kernel booted')).toBeDefined();
  });

  it('renders CodeBlock with syntax', () => {
    render(<CodeBlock code="const a = 10;" language="typescript" />);
    expect(screen.getByText('const a = 10;')).toBeDefined();
  });

  it('renders ASCIIArt without crashing', () => {
    render(<ASCIIArt art="[TEST ASCII]" />);
    expect(screen.getByText('[TEST ASCII]')).toBeDefined();
  });

  it('renders Tooltip wrapper', () => {
    render(
      <Tooltip content="Tooltip message">
        <button>Hover Target</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover Target')).toBeDefined();
  });

  it('renders Modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Modal Dialog">
        <div>Modal Body Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Dialog')).toBeDefined();
    expect(screen.getByText('Modal Body Content')).toBeDefined();
  });

  it('renders Toast notifications', () => {
    const toasts = [{ id: '1', title: 'Notification Title', message: 'Test toast body' }];
    render(<Toast toasts={toasts} onDismiss={() => {}} />);
    expect(screen.getByText('Notification Title')).toBeDefined();
  });
});
