import { createApp } from "../src/app.js";

// Vercel invokes this file per-request as a Serverless Function - no
// app.listen() here, just the Express app itself (Express apps are callable
// as (req, res) handlers, which is exactly what the Node.js runtime expects).
export default createApp();
