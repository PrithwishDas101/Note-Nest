import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    return next();
  } catch (error) {
    // Fail open if the external rate-limit service is temporarily unavailable.
    // A Redis outage should not turn every notes request into an HTTP 500.
    console.error("Rate limiter unavailable; allowing request:", error.message);
    return next();
  }
};

export default rateLimiter;