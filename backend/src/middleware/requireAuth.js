const getSupabaseConfig = () => ({
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY,
});

const requireAuth = async (req, res, next) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";

  if (!token) {
    return res.status(401).json({ message: "Sign in to access your notes." });
  }

  const { url, key } = getSupabaseConfig();
  if (!url || !key) {
    return res.status(503).json({ message: "Authentication is not configured on the server." });
  }

  try {
    const response = await fetch(url.replace(/\/$/, "") + "/auth/v1/user", {
      headers: {
        apikey: key,
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      return res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
    }

    const user = await response.json();
    if (!user?.id) {
      return res.status(401).json({ message: "Unable to verify your account." });
    }

    req.user = { id: user.id, email: user.email || null };
    return next();
  } catch (error) {
    console.error("Supabase token verification failed:", error.message);
    return res.status(503).json({ message: "Authentication service is temporarily unavailable." });
  }
};

export default requireAuth;