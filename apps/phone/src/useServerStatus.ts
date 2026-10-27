import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { events, type ServerStatus } from '@murley/shared';

/** Connects to the server as a phone and reports the latest status. */
export function useServerStatus() {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<ServerStatus | null>(null);
  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      setConnected(true);
      socket.emit(events.phoneHello);
    });
    socket.on('disconnect', () => setConnected(false));
    socket.on(events.roomState, (s: ServerStatus) => setStatus(s));
    return () => {
      socket.disconnect();
    };
  }, []);
  return { connected, status };
}
