import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { open, SQLite3 } from 'https://deno.land/x/sqlite/mod.ts';
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
  .get('/contact/:id', show)
  .post('/contact', create);

app.use(router.routes());
app.use(router.allowedMethods());

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

async function create(ctx) {
  const body = ctx.request.body();
  if (body.type === "json") {
    const contact = await body.value;

    const db = new SQLite3(DB_PATH);
    db.query(
      'INSERT INTO contacts (name, tel) VALUES (?, ?)',
      contact.name,
      contact.tel
    );
    db.close();

    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000');
await app.listen({ port: 8000 });
