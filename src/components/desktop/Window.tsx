import React, { useState, useRef, useEffect } from 'react';
import { useWindowStore, WindowInstance } from '../../state/useWindowStore';
import styles from './Desktop.module.css';

interface WindowProps {
  window: WindowInstance;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window: win, children }) => {
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const activeWindowId = useWindowStore((s) => s.activeWindowId);
  const updateWindowBounds = useWindowStore((s) => s.updateWindowBounds);

  const [pos, setPos] = useState(win.position);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });

  useEffect(() => {
    setPos(win.position);
  }, [win.position]);

  const handleMouseDown = () => {
    focusWindow(win.id);
  };

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: pos.x,
      initialY: pos.y
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = moveEvent.clientX - dragStart.current.x;
      const dy = moveEvent.clientY - dragStart.current.y;
      const newX = Math.max(0, dragStart.current.initialX + dx);
      const newY = Math.max(34, dragStart.current.initialY + dy);
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      updateWindowBounds(win.id, { position: pos });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const isFocused = activeWindowId === win.id;

  const style: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        top: '34px',
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 34px - 60px)',
        zIndex: win.zIndex,
        borderRadius: 0
      }
    : {
        position: 'absolute',
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: '96vw',
        maxHeight: 'calc(100vh - 120px)',
        zIndex: win.zIndex
      };

  return (
    <div
      className={`${styles.floatingWindow} ${isFocused ? styles.focused : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      <div onMouseDown={handleTitleBarMouseDown} style={{ cursor: win.isMaximized ? 'default' : 'move' }}>
        {/* Title bar drag handle */}
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
