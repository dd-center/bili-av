const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 2230
  } = nuxt.options.server

  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    if (/^\/api\/.+/.test(ctx.request.url.toLowerCase())) {
      await next()
    } else {
      ctx.status = 200
      ctx.respond = false
      ctx.req.ctx = ctx
      nuxt.render(ctx.req, ctx.res)
    }
  })

  app.listen(port, host)
}

start()
