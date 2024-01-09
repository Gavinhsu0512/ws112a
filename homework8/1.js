import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { SQLite3 } from 'https://deno.land/x/sqlite/mod.ts';
import * as render from './render.js';

const DB_PATH = 'contacts.db'; 

const router = new Router();
const app = new Application();

const db = new SQLite3(DB_PATH);
db.query(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    tel TEXT
  );
`);
db.close();

router.get('/', list)
  .get('/contact/new', add)
  .get('/contact/:id', show);

app.use(router.routes());
app.use(router.allowedMethods());

app.ws('/ws', async (ctx) => {
  const ws = await ctx.upgrade();

  for await (const ev of ws) {
    if (isWebSocketCloseEvent(ev)) {
      console.log("WebSocket closed:", ev);
      break;
    }
  }
});

async function list(ctx) {
  const db = new SQLite3(DB_PATH);
  const posts = db.query('SELECT * FROM contacts');
  db.close();
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const id = ctx.params.id;
  const db = new SQLite3(DB_PATH);
  const post = db.queryOne('SELECT * FROM contacts WHERE id = ?', id);
  db.close();

  if (!post) ctx.throw(404, 'Invalid contact id');
  ctx.response.body = await render.show(post);
}

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
