import React, { useRef, useState, useEffect } from 'react';
import { useTerminalStore } from '../../state/useTerminalStore';
import { useFileSystemStore } from '../../state/useFileSystemStore';
import { TerminalPrompt } from './TerminalPrompt';
import { getAutocompleteSuggestions } from '../../core/cli/autocomplete';
import { AutoCompleteDropdown } from './AutoCompleteDropdown';
import { soundEngine } from '../../core/audio/soundEngine';
import styles from './Terminal.module.css';

export const TerminalInput: React.FC = () => {
  const input = useTerminalStore((s) => s.input);
  const setInput = useTerminalStore((s) => s.setInput);
  const executeCommand = useTerminalStore((s) => s.executeCommand);
  const navigateHistory = useTerminalStore((s) => s.navigateHistory);
  const clearLines = useTerminalStore((s) => s.clearLines);
  const cwd = useFileSystemStore((s) => s.cwd);

  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [autoCompleteMatches, setAutoCompleteMatches] = useState<string[]>([]);
  const [selectedMatchIdx, setSelectedMatchIdx] = useState(0);

  // Keep input focused automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundEngine.playKeyClick();

    // Ctrl+L: Clear terminal
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      clearLines();
      return;
    }

    // Ctrl+C: Cancel current input
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      useTerminalStore.getState().appendLine({
        type: 'command',
        content: `${input}^C`,
        cwd
      });
      setInput('');
      setAutoCompleteMatches([]);
      return;
    }

    // Tab: Autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const res = getAutocompleteSuggestions(input, cwd);
      if (res && res.matches.length > 0) {
        if (res.matches.length === 1) {
          // Exact single match
          const tokens = input.trimEnd().split(' ');
          tokens[tokens.length - 1] = res.suggestion;
          const completed = tokens.join(' ');
          setInput(completed);
          setAutoCompleteMatches([]);
        } else {
          // Multiple matches
          setAutoCompleteMatches(res.matches);
          setSelectedMatchIdx(0);
        }
      }
      return;
    }

    // Arrow Up / Down for history or autocomplete navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (autoCompleteMatches.length > 0) {
        setSelectedMatchIdx((prev) => (prev > 0 ? prev - 1 : autoCompleteMatches.length - 1));
      } else {
        navigateHistory('up');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (autoCompleteMatches.length > 0) {
        setSelectedMatchIdx((prev) => (prev < autoCompleteMatches.length - 1 ? prev + 1 : 0));
      } else {
        navigateHistory('down');
      }
      return;
    }

    // Escape: close autocomplete
    if (e.key === 'Escape') {
      setAutoCompleteMatches([]);
      return;
    }

    // Enter: execute
    if (e.key === 'Enter') {
      e.preventDefault();
      if (autoCompleteMatches.length > 0) {
        // Apply selected autocomplete
        const selected = autoCompleteMatches[selectedMatchIdx];
        const tokens = input.trimEnd().split(' ');
        tokens[tokens.length - 1] = selected;
        setInput(`${tokens.join(' ')} `);
        setAutoCompleteMatches([]);
        return;
      }

      const toExec = input;
      executeCommand(toExec);
      setAutoCompleteMatches([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setCursorPos(e.target.selectionStart || 0);
    if (autoCompleteMatches.length > 0) {
      setAutoCompleteMatches([]);
    }
  };

  const handleSelectAutocomplete = (match: string) => {
    const tokens = input.trimEnd().split(' ');
    tokens[tokens.length - 1] = match;
    setInput(`${tokens.join(' ')} `);
    setAutoCompleteMatches([]);
    inputRef.current?.focus();
  };

  // Emulated text before, at, and after cursor
  const textBefore = input.slice(0, cursorPos);
  const charAtCursor = input.slice(cursorPos, cursorPos + 1) || ' ';
  const textAfter = input.slice(cursorPos + 1);

  return (
    <div className={styles.inputRowContainer} onClick={handleContainerClick}>
      <TerminalPrompt cwd={cwd} />

      <div className={styles.inputDisplayWrapper}>
        <span className={styles.typedText}>{textBefore}</span>
        <span className={styles.activeCursorChar}>{charAtCursor}</span>
        <span className={styles.typedText}>{textAfter}</span>

        {/* Hidden native input capturing keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSelect={(e) => setCursorPos(e.currentTarget.selectionStart || 0)}
          className={styles.hiddenNativeInput}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </div>

      {autoCompleteMatches.length > 0 && (
        <AutoCompleteDropdown
          matches={autoCompleteMatches}
          selectedIndex={selectedMatchIdx}
          onSelect={handleSelectAutocomplete}
        />
      )}
    </div>
  );
};
