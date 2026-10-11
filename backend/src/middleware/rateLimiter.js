const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;
const CLEANUP_INTERVAL = 500;

const requests = new Map();
let totalRequests = 0;

const rateLimiter = (req, res, next) => {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  let entry = requests.get(key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    requests.set(key, entry);
  }

  entry.count += 1;
  totalRequests += 1;

  // Periodically remove expired entries so the map stays bounded over time.
  if (totalRequests % CLEANUP_INTERVAL === 0) {
    for (const [ip, bucket] of requests) {
      if (now >= bucket.resetAt) {
        requests.delete(ip);
      }
    }
  }

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    res.set("Retry-After", String(retryAfter));

    return res.status(429).json({
      message: "Too many requests. Please try again later.",
    });
  }

  return next();
};

export default rateLimiter;
