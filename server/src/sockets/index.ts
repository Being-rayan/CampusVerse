import type { Server } from 'socket.io'
import { randomUUID } from 'node:crypto'

export function registerSocketHandlers(io: Server) {
  io.on('connection', (socket) => {
    socket.emit('notification:new', {
      title: 'CampusVerse online',
      body: 'Real-time channel connected.',
    })

    socket.on('room:join', (roomId: string) => {
      socket.join(roomId)
    })

    socket.on('chat:message', ({ roomId, message }: { roomId: string; message: string }) => {
      io.to(roomId).emit('chat:message', {
        id: randomUUID(),
        roomId,
        message,
        createdAt: new Date().toISOString(),
      })
    })
  })
}
