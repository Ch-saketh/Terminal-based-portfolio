import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  showLineNumbers = false,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`${styles.codeBlockWrapper} ${className}`}>
      <div className={styles.header}>
        <span className={styles.language}>{language}</span>
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          title="Copy code to clipboard"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} color="var(--accent-primary)" />
              <span className={styles.copiedText}>COPIED</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      <pre className={styles.pre}>
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className={styles.lineRow}>
              {showLineNumbers && <span className={styles.lineNumber}>{idx + 1}</span>}
              <span className={styles.lineContent}>{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
