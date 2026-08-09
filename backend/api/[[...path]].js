import { createApp } from "../src/app.js";

// Vercel treats /api as a reserved, filesystem-routed namespace: requests
// under /api/* are matched directly against files here before vercel.json's
// rewrites are even considered. Naming this file with the optional catch-all
// syntax "[[...path]].js" makes it match every path under /api (including
// the bare "/api" itself), so every /api/* route the Express app defines
// (GET /api/countries, POST /api/orders, etc.) resolves natively - no
// rewrite needed for anything under /api. vercel.json only needs to rewrite
// the handful of non-/api paths (like "/health") to this same function.
//
// No app.listen() here, just the Express app itself - Express apps are
// callable as (req, res) handlers, which is exactly what the Node.js
// Serverless Function runtime expects.
export default createApp();
