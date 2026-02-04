import React, { useState } from 'react';

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function StatCard({ title, value, icon, color = '#2dd4bf' }) {
  const [hover, setHover] = useState(false);
  const bg = hexToRgba(color, 0.12);

  return (
    <div
      className="card stat-card p-3"
      style={{
        transition: 'transform .15s ease, box-shadow .15s ease',
        transform: hover ? 'translateY(-5px)' : 'none',
        cursor: 'default',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="d-flex align-items-center">
        <div
          className="me-3 d-flex align-items-center justify-content-center"
          style={{ width: 50, height: 50, borderRadius: 50, background: bg }}
        >
          <div style={{ color: color, fontSize: 20 }}>{icon}</div>
        </div>

        <div>
          <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)' }}>{value}</div>
          <div className="text-muted" style={{ textTransform: 'uppercase', fontSize: 12 }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
