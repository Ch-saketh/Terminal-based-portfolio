import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  const getIcon = (type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} color="var(--accent-primary)" />;
      case 'warning':
        return <AlertTriangle size={16} color="var(--accent-warning)" />;
      case 'error':
        return <AlertCircle size={16} color="var(--accent-error)" />;
      default:
        return <Info size={16} color="var(--accent-secondary)" />;
    }
  };

  return (
    <aside className={styles.toastContainer} aria-live="polite" aria-label="System Notifications">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toastItem} ${styles[t.type || 'info']}`}>
          <div className={styles.icon}>{getIcon(t.type)}</div>
          <div className={styles.content}>
            <div className={styles.title}>{t.title}</div>
            {t.message && <div className={styles.message}>{t.message}</div>}
          </div>
          <button
            className={styles.dismissBtn}
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </aside>
  );
};
