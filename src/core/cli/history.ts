export class CommandHistoryManager {
  private history: string[] = [];
  private currentIndex: number = -1;
  private readonly maxCapacity: number;

  constructor(maxCapacity = 100) {
    this.maxCapacity = maxCapacity;
  }

  /**
   * Appends a new command string to history with duplicate avoidance.
   */
  public push(command: string): void {
    const trimmed = command.trim();
    if (!trimmed) return;

    // Do not repeat if identical to the immediate predecessor
    const last = this.history[this.history.length - 1];
    if (last !== trimmed) {
      this.history.push(trimmed);
      if (this.history.length > this.maxCapacity) {
        this.history.shift();
      }
    }
    this.currentIndex = -1;
  }

  /**
   * Returns previous command on Arrow Up.
   */
  public navigateUp(currentBuffer: string): string {
    if (this.history.length === 0) return currentBuffer;

    if (this.currentIndex === -1) {
      this.currentIndex = this.history.length - 1;
    } else {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
    }

    return this.history[this.currentIndex] ?? currentBuffer;
  }

  /**
   * Returns next command on Arrow Down.
   */
  public navigateDown(defaultBuffer = ''): string {
    if (this.history.length === 0 || this.currentIndex === -1) return defaultBuffer;

    this.currentIndex += 1;
    if (this.currentIndex >= this.history.length) {
      this.currentIndex = -1;
      return defaultBuffer;
    }

    return this.history[this.currentIndex] ?? defaultBuffer;
  }

  public getHistory(): string[] {
    return [...this.history];
  }

  public clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}
