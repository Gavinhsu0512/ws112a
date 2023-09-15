import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
    console.log('pathname=${ctx.request.url.pathname}')

    ctx.response.body = `
    <html>
    <body>
    </body>
    </html>`

    if(ctx.request.url.pathname == "/nqu/")
    {
        ctx.response.body = `
        <html>
        <body>
        <a href="https://www.nqu.edu.tw/">NQU</a>
        </body>
        </html>`
    }

    else if(ctx.request.url.pathname == "/nqu/csie/")
    {
        ctx.response.body = `
        <html>
        <body>
        <a href="https://csie.nqu.edu.tw/">NQU_CSIE</a>
        </body>
        </html>`
    }

    else if(ctx.request.url.pathname == "/to/nqu/")
    {
        ctx.response.redirect = ("https://www.nqu.edu.tw/")
    }

    else if(ctx.request.url.pathname == "/to/nqu/csie/")
    {
        ctx.response.redirect = ("https://csie.nqu.edu.tw/")
    }

    else if(ctx.request.url.pathname == "/404/")
    {
        ctx.response.body = `
        <html>
        <body>
        <h1>404</h1>
        <p>請在127.0.0.1:8000後面加入/ngu、/nug/csie、/to/ngu或/to/nug/csie
        </body>
        </html>`
    }      
  });
  
  console.log('start at : http://127.0.0.1:8000')
  await app.listen({ port: 8000 });