import { theme } from '@murley/shared';
import { useServerStatus } from './useServerStatus';

const { colours, fonts } = theme;

export function App() {
  const { connected, status } = useServerStatus();
  const room = new URLSearchParams(window.location.search).get('room')?.toUpperCase();
  return (
    <main style={{ padding: 24, textAlign: 'center' }}>
      <h1
        style={{
          fontFamily: fonts.heading,
          fontWeight: 800,
          fontSize: 44,
          margin: '32px 0 8px',
          color: colours.navy,
          textShadow: `3px 3px 0 ${colours.maroon}`,
        }}
      >
        THE MURLEY SHOW!
      </h1>
      <p style={{ fontSize: 20 }}>Phone controller - scaffold is working.</p>
      {room && <p style={{ fontFamily: fonts.score, fontSize: 32 }}>Room: {room}</p>}
      <p style={{ fontFamily: fonts.score, color: connected ? colours.green : colours.orange }}>
        {connected ? 'CONNECTED' : 'CONNECTING...'}
      </p>
      {status && (
        <p>
          TVs: {status.tvs} - Phones: {status.phones}
        </p>
      )}
    </main>
  );
}
