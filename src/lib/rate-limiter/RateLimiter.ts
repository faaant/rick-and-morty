interface Params {
  /** Interval between count resets in milis */
  interval: number;
  limit: number;
}

export class RateLimiter {
  private interval: number;
  private limit: number;
  private ipCounts = new Map<string, { count: number; resetTime: number }>();
  constructor({ interval, limit }: Params) {
    this.interval = interval;
    this.limit = limit;
  }

  shouldLimit(clientIp: string) {
    const now = Date.now();
    const resetTime = now + this.interval;

    const record = this.ipCounts.get(clientIp);

    if (!record || now > record.resetTime) {
      this.ipCounts.set(clientIp, { count: 1, resetTime });
      return;
    }

    record.count += 1;
    this.ipCounts.set(clientIp, record);

    if (record.count > this.limit) {
      return true;
    }

    return false;
  }
}
