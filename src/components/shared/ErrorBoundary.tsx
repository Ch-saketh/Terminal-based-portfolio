import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw, Trash2, Copy, Check } from 'lucide-react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    copied: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
      copied: false
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });
    // Log to audit logger
    console.error('[SAKETH.OS_KERNEL_PANIC]', error, errorInfo);
  }

  private handleReboot = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('saketh_os_booted');
      window.location.href = '/';
    }
  };

  private handleClearCache = () => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
        localStorage.removeItem('saketh_os_achievements_v1');
      } catch {
        void 0;
      }
      window.location.reload();
    }
  };

  private handleCopyLog = () => {
    const errorText = `SAKETH.OS KERNEL PANIC\nError: ${this.state.error?.message}\nStack: ${this.state.error?.stack}\nComponent Stack: ${this.state.errorInfo?.componentStack}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(errorText).then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      });
    }
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.panicContainer} role="alert" aria-live="assertive">
          <div className={styles.panicCard}>
            <div className={styles.panicHeader}>
              <div className={styles.panicTitle}>
                <AlertOctagon size={20} color="#ef4444" />
                <span>[KERNEL PANIC: EXCEPTION_UNHANDLED]</span>
              </div>
              <span className={styles.panicBadge}>SYSTEM_HALTED</span>
            </div>

            <p className={styles.panicMessage}>
              A runtime component exception occurred in the SAKETH.OS rendering engine.
              The execution thread was isolated to prevent state corruption.
            </p>

            <div className={styles.stackTraceBox}>
              <strong>Fault:</strong> {this.state.error?.toString() || 'Unknown Kernel Fault'}
              {'\n\n'}
              <strong>Component Trace:</strong>
              {this.state.errorInfo?.componentStack || this.state.error?.stack || 'No stack available'}
            </div>

            <div className={styles.actionRow}>
              <button className={styles.rebootBtn} onClick={this.handleReboot}>
                <RotateCcw size={14} style={{ display: 'inline', marginRight: '6px' }} />
                [ 01. REBOOT SAKETH.OS ]
              </button>

              <button className={styles.clearCacheBtn} onClick={this.handleClearCache}>
                <Trash2 size={13} style={{ display: 'inline', marginRight: '6px' }} />
                [ 02. CLEAR CACHE &amp; RESET ]
              </button>

              <button className={styles.clearCacheBtn} onClick={this.handleCopyLog}>
                {this.state.copied ? (
                  <>
                    <Check size={13} color="#00ff88" style={{ display: 'inline', marginRight: '6px' }} />
                    [ LOG COPIED ]
                  </>
                ) : (
                  <>
                    <Copy size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    [ COPY ERROR LOG ]
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
