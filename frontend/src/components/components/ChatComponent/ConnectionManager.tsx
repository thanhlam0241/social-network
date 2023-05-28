import React from 'react'
import { socketClient } from '~/service/socket-client/socketClient'

export function ConnectionManager() {
  function connect() {
    socketClient.connect()
  }

  function disconnect() {
    socketClient.disconnect()
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  )
}
