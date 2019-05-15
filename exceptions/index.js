module.exports = {
  initApp(app) {
    app.use(async function(ctx, next) {
      await next().catch(err => {
        ctx.body = {
          code: err.code || 500,
          message: err.message
        }
        console.error(ctx.body)
        ctx.app.emit('error', err)
      })
    })
    app.on('error', e => {
      console.error(`APP发生应用错误: ${e.stack}`)
    })
  }
}