import { createApp } from "../src/app.js";

// Vercel treats /api as a reserved, filesystem-routed namespace: requests
// under /api/* are matched directly against files here, natively, with no
// rewrite involved. "[...path].js" is Vercel's required catch-all filename
// convention (one or more path segments) - it's supported for plain
// Serverless Functions generally, not just Next.js apps, which the
// double-bracket "optional" catch-all variant is not reliably. Every route
// this Express app actually serves has at least one segment under /api
// (GET /api/countries, GET /api/countries/:slug, POST /api/orders, etc.),
// so the required (rather than optional) catch-all covers all of them.
//
// No app.listen() here, just the Express app itself - Express apps are
// callable as (req, res) handlers, which is exactly what the Node.js
// Serverless Function runtime expects.
export default createApp();
