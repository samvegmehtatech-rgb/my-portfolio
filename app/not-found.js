'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '40px',
      background: '#FFFFFF',
    }}>
      <p style={{
        fontSize: '120px',
        fontWeight: '700',
        color: '#E2E8F0',
        fontFamily: 'Clash Display, sans-serif',
        lineHeight: 1,
        marginBottom: '0',
        letterSpacing: '-4px',
      }}>
        404
      </p>
      <h1 style={{
        fontSize: 'clamp(24px, 4vw, 40px)',
        fontWeight: '700',
        color: '#0A0A0A',
        fontFamily: 'Clash Display, sans-serif',
        marginBottom: '16px',
        marginTop: '-16px',
      }}>
        Page not found.
      </h1>
      <p style={{
        color: '#64748B',
        fontSize: '17px',
        marginBottom: '40px',
        maxWidth: '400px',
        lineHeight: '1.7',
      }}>
        Looks like this page went exploring without telling me.
      </p>
      <Link href="/" style={{
        background: '#0A0A0A',
        color: '#FFFFFF',
        padding: '14px 32px',
        borderRadius: '100px',
        fontSize: '15px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'background 0.2s',
      }}
        onMouseEnter={e => e.target.style.background = '#2563EB'}
        onMouseLeave={e => e.target.style.background = '#0A0A0A'}
      >
        ← Back to Portfolio
      </Link>
    </div>
  )
}
