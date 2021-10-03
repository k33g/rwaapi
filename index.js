const fastify = require('fastify')({ logger: true })
const path = require('path')

// Serve the static assets
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/'
})

const wasmProcesses = {}

fastify.register(require('./routes/functions.js'), {})
fastify.register(require('./routes/functions.fork.js'), {
  wasmProcesses: wasmProcesses
})

const start = async () => {
  try {
    await fastify.listen(8080, "0.0.0.0")
    fastify.log.info(`server listening on ${fastify.server.address().port}`)

  } catch (error) {
    fastify.log.error(error)
  }
}
start()
