import React from 'react';
import styles from './Terminal.module.css';

interface AutoCompleteDropdownProps {
  matches: string[];
  selectedIndex: number;
  onSelect: (match: string) => void;
}

export const AutoCompleteDropdown: React.FC<AutoCompleteDropdownProps> = ({
  matches,
  selectedIndex,
  onSelect
}) => {
  if (matches.length === 0) return null;

  return (
    <div className={styles.autocompleteOverlay}>
      <div className={styles.autocompleteHeader}>
        TAB AUTOCOMPLETE SUGGESTIONS ({matches.length})
      </div>
      <div className={styles.autocompleteGrid}>
        {matches.map((match, idx) => (
          <button
            key={match}
            type="button"
            className={`${styles.autocompleteItem} ${idx === selectedIndex ? styles.selected : ''}`}
            onClick={() => onSelect(match)}
          >
            {match}
          </button>
        ))}
      </div>
    </div>
  );
};
