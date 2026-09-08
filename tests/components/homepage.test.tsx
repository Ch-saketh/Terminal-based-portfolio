import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BiosBootScreen } from '../../src/components/boot/BiosBootScreen';
import { HomeView } from '../../src/components/home/HomeView';

describe('Phase 4 — SAKETH.OS Homepage & Boot Component Tests', () => {
  it('renders BIOS Boot Screen correctly with skip interaction', () => {
    const onBootComplete = vi.fn();
    render(<BiosBootScreen onBootComplete={onBootComplete} />);

    expect(screen.getByText(/SAKETH.OS BIOS/i)).toBeDefined();
    expect(screen.getByText(/skip/i)).toBeDefined();

    fireEvent.click(screen.getByRole('dialog'));
    expect(onBootComplete).toHaveBeenCalled();
  });

  it('renders HomeView with primary developer identity and roles', () => {
    render(<HomeView />);

    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByText(/> Developer/i)).toBeDefined();
    expect(screen.getByText(/> Problem Solver/i)).toBeDefined();
    expect(screen.getByText(/> AI Enthusiast/i)).toBeDefined();
    expect(screen.getByText(/> Lifelong Learner/i)).toBeDefined();
  });

  it('renders discoverable navigation tabs and commands', () => {
    render(<HomeView />);

    expect(screen.getAllByText('home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('about').length).toBeGreaterThan(0);
    expect(screen.getAllByText('projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('contact').length).toBeGreaterThan(0);
  });

  it('renders bottom HUD matrix panels', () => {
    render(<HomeView />);

    expect(screen.getByText(/SYSTEM METRICS/i)).toBeDefined();
    expect(screen.getByText(/RECENT ACTIVITY/i)).toBeDefined();
    expect(screen.getByText(/QUICK ACCESS/i)).toBeDefined();
    expect(screen.getByText(/NOW PLAYING/i)).toBeDefined();
  });
});
