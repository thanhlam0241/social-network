// import { socketClient } from '~/service/socket-client/socketClient'
// import React, { useState, useEffect } from 'react'
// import { ConnectionState } from '~/components/components/ChatComponent/ConnectionState'
// import { ConnectionManager } from '~/components/components/ChatComponent/ConnectionManager'
// import { MyForm } from '~/components/components/ChatComponent/MyForm'
// import { Events } from '~/components/components/ChatComponent/Event'

// export default function AppSocket() {
//   const [isConnected, setIsConnected] = useState(socketClient.connected)
//   const [fooEvents, setFooEvents] = useState<string[]>([])

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true)
//     }

//     function onDisconnect() {
//       setIsConnected(false)
//     }

//     function onFooEvent(value: string) {
//       setFooEvents((previous) => [...previous, value])
//     }

//     socketClient.on('connect', onConnect)
//     socketClient.on('disconnect', onDisconnect)
//     socketClient.on('foo', onFooEvent)

//     return () => {
//       socketClient.off('connect', onConnect)
//       socketClient.off('disconnect', onDisconnect)
//       socketClient.off('foo', onFooEvent)
//     }
//   }, [])

//   return (
//     <div className='App'>
//       <ConnectionState isConnected={isConnected} />
//       <Events events={fooEvents} />
//       <ConnectionManager />
//       <MyForm />
//     </div>
//   )
// }
