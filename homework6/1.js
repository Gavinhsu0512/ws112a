import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import session from "session/mod.ts";

const peopleMap = new Map();
const sessions = new Map();

peopleMap.set("john", {
  name: "john",
  tel: "082-123456",
});

const router = new Router();
1
const sessionMiddleware = new session.SessionMiddleware({
  store: new session.MemoryStore(),
});
app.use(sessionMiddleware.use);

router
  .get("/", (ctx) => {
    ctx.response.body = "Welcome to the Address Book!";
  })
  .get("/people", (ctx) => {
    ctx.response.body = Array.from(peopleMap.values());
  })
  .post("/people/add", async (ctx) => {
    const body = ctx.request.body();

    if (body.type === "form") {
      const pairs = await body.value;
      const params = {};

      for (const [key, value] of pairs) {
        params[key] = value;
      }

      const name = params['name'];
      const tel = params['tel'];

      ctx.response.type = 'text/html';

      const session = await ctx.state.session.get("user");
      if (!session) {
        ctx.response.body = `<p>Please log in first!</p><p><a href="/public/">Address Book</a></p>`;
        return;
      }

      if (peopleMap.get(name)) {
        ctx.response.body = `<p>Username already exists!</p><p><a href="/public/">Address Book</a></p>`;
      } else {
        peopleMap.set(name, { name, tel });
        ctx.response.body = `<p>New user (${name}, ${tel}) registered successfully</p><p><a href="/public/">Address Book</a></p>`;
      }
    }
  })
  .get("/login", async (ctx) => {
    const user = { username: "john" }; 
    await ctx.state.session.set("user", user);
    ctx.response.body = "Logged in successfully!";
  })
  .get("/logout", async (ctx) => {
    await ctx.state.session.delete("user");
    ctx.response.body = "Logged out successfully!";
  })
  .get("/public/(.*)", async (ctx) => {
    const filePath = ctx.params[0];
    
    await send(ctx, filePath, {
      root: Deno.cwd() + "/public/",
      index: "index.html",
    });
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server is running at: http://127.0.0.1:8000/public/');

await app.listen({ port: 8000 });
