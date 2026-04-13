'use client';

import { useAuth } from '@/components/AuthProvider';

interface MapWatermarkProps {
  className?: string;
}

export default function MapWatermark({ className }: MapWatermarkProps) {
  const { user } = useAuth();

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 overflow-hidden ${className ?? ''}`}>
      {/* Repeating diagonal watermark */}
      <div className="absolute inset-0" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        transform: 'rotate(-25deg)',
        transformOrigin: 'center',
        width: '200%',
        height: '200%',
        left: '-50%',
        top: '-50%',
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-full text-center py-8" style={{ whiteSpace: 'nowrap' }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.15)',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '2px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              userSelect: 'none',
            }}>
              PROPERTY OF AGREDA CONTACT 09182624068
              {user?.email ? `  \u2022  ${user.email}` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
