const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

(async () => {
  const app = next({ dev: true })
  await app.prepare()

  const expressServer = express()

  const options = { target: 'http://localhost:5000', changeOrigin: true };
  expressServer.use('/api', createProxyMiddleware(options));

  const handle = app.getRequestHandler()
  expressServer.all('*', async (req, res) => {
    await handle(req, res)
  })

  expressServer.listen(3000, (err) => {
    if (err) {
      throw err
    }
    console.log('Server ready on port 3000')
  })
})()
