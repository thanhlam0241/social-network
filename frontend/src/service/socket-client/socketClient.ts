import { io, Socket } from 'socket.io-client'

const URL = 'http://localhost:3500'

interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

interface ClientToServerEvents {
  hello: () => void
}

const socketClient: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
  retries: 3,
  ackTimeout: 3000,
  auth: {
    token: null
  },
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000
})

socketClient.on('connect', () => {
  console.log('connected')
})

socketClient.on('disconnect', () => {
  console.log('disconnected')
})
