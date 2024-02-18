import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();
app.use('*', serveStatic({ root: './public/' }));

const port = 3000;
console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
