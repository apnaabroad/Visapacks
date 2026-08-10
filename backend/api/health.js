import { createApp } from "../src/app.js";

// One shim file per real route shape (see README's "Troubleshooting" section
// for why: a single required catch-all file, `[...path].js`, worked for
// this exact one-segment path but not for deeper ones - Vercel's "rest
// parameter" semantics for plain Serverless Functions did not behave the
// way Next.js's do). Every shim just exports the same Express app; Express
// does the real routing internally based on the true request path, which
// Vercel always preserves regardless of which file matched.
export default createApp();
