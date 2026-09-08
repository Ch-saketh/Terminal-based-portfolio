import confetti, { Options } from 'canvas-confetti';

export function triggerConfetti(options?: Options): void {
  if (typeof window === 'undefined') return;
  try {
    // Avoid jsdom "Not implemented: HTMLCanvasElement.prototype.getContext" console noise
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      return;
    }
    const testCanvas = document.createElement('canvas');
    if (typeof testCanvas.getContext === 'function') {
      const ctx = testCanvas.getContext('2d');
      if (ctx) {
        confetti(options);
      }
    }
  } catch {
    // Graceful fallback
  }
}
