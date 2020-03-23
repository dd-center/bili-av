const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const axios = require('axios').default
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

  router.get('/api/convert', async (ctx) => {
    if ('av' in ctx.request.query) {
      const result = await axios
        .get('http://www.bilibili.com/video/' + ctx.request.query.av, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
          }
        })
        .catch(() => {
          ctx.response.status = 500
          ctx.response.body = ''
        })
      if (!result) return
      ctx.response.status = 200
      ctx.response.body = result.data.match(
        /"videoData":{"bvid":"(\S*)","aid":/
      )[1]
    } else if ('bv' in ctx.request.query) {
      const result = await axios
        .get('http://www.bilibili.com/video/' + ctx.request.query.bv, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
          }
        })
        .catch(() => {
          ctx.response.status = 500
          ctx.response.body = ''
        })
      if (!result) return
      ctx.response.status = 200
      ctx.response.body = result.data.match(/"aid":(\S*),"bvid":"/)[1]
    } else {
      ctx.response.status = 404
      ctx.response.body = ''
    }
  })

  app.use(router.routes()).use(router.allowedMethods())

  app.listen(port, host)
}

start()
