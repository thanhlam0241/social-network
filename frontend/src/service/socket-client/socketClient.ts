import { io, Socket } from 'socket.io-client'

const URL = 'http://localhost:3500'
interface messageInfor {
  room?: string
  text: string
  sender: string
}
export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  connected: () => void
  'receive-message': (messageInfor: messageInfor) => void
  'join-room': (room?: string) => void
}

export interface ClientToServerEvents {
  hello: () => void
  setup: (userData: any) => void
  'join-room': (room?: string) => void
  'send-message': (messageInfor: messageInfor) => void
}

const createSocket = (token: string) =>
  io(URL, {
    autoConnect: true,
    //retries: 1,
    ackTimeout: 3000,
    auth: {
      token: token
    },
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000
  })

export default createSocket
