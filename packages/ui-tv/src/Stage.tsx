import { useEffect, useState, type ReactNode } from 'react';
import { theme } from '@murley/shared';
import { fitScale } from './fitScale';

/** White 1920 x 1080 stage, centred and scaled to fit the screen. */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(() => fitScale(window.innerWidth, window.innerHeight));
  useEffect(() => {
    const onResize = () => setScale(fitScale(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: theme.colours.white, overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: theme.tv.width,
          height: theme.tv.height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
