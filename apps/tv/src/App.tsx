import { Stage } from '@murley/ui-tv';
import { theme } from '@murley/shared';
import { useServerStatus } from './useServerStatus';

const { colours, fonts } = theme;

export function App() {
  const { connected, status } = useServerStatus();
  return (
    <Stage>
      <div style={{ padding: '5%', textAlign: 'center' }}>
        <h1
          style={{
            margin: '160px 0 0',
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 150,
            color: colours.navy,
            WebkitTextStroke: `6px ${colours.navy}`,
            textShadow: `6px 6px 0 ${colours.maroon}`,
          }}
        >
          THE MURLEY SHOW!
        </h1>
        <p style={{ fontSize: 56, margin: '40px 0' }}>TV screen - scaffold is working.</p>
        <p
          style={{
            fontFamily: fonts.score,
            fontSize: 56,
            color: connected ? colours.green : colours.orange,
          }}
        >
          {connected ? 'SERVER CONNECTED' : 'CONNECTING...'}
        </p>
        {status && (
          <p style={{ fontSize: 48 }}>
            TVs: {status.tvs} - Phones: {status.phones}
          </p>
        )}
      </div>
    </Stage>
  );
}
