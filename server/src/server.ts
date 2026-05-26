import http from 'node:http'
import { Server } from 'socket.io'
import { createApp } from './app.js'
import { connectDatabase } from './config/db.js'
import { env } from './config/env.js'
import { registerSocketHandlers } from './sockets/index.js'

const app = createApp()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  },
})

registerSocketHandlers(io)

await connectDatabase()

server.listen(env.PORT, () => {
  console.info(`CampusVerse API running on http://localhost:${env.PORT}`)
})
