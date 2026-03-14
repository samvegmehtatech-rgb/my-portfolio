import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'Samveg Mehta — Software Developer'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background:     '#FFFFFF',
        width:          '100%',
        height:         '100%',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        fontFamily:     'sans-serif',
        position:       'relative',
      }}>
        {/* Blue accent top bar */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '6px',
          background: '#2563EB',
        }} />

        {/* Grid pattern */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: `radial-gradient(
            ellipse 80% 50% at 50% 50%,
            rgba(37,99,235,0.05) 0%,
            transparent 70%
          )`,
        }} />

        {/* Content */}
        <div style={{
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '16px',
        }}>
          {/* Avatar circle */}
          <div style={{
            width:          '100px',
            height:         '100px',
            borderRadius:   '50%',
            background:     '#EFF6FF',
            border:         '3px solid #2563EB',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '48px',
          }}>
            👨‍💻
          </div>

          <h1 style={{
            fontSize:      '64px',
            fontWeight:    '700',
            color:         '#0A0A0A',
            margin:        0,
            letterSpacing: '-2px',
          }}>
            Samveg Mehta
          </h1>

          <p style={{
            fontSize: '28px',
            color:    '#64748B',
            margin:   0,
          }}>
            Software Developer & Engineer
          </p>

          <div style={{
            display:       'flex',
            gap:           '24px',
            marginTop:     '8px',
          }}>
            {['React', 'Next.js', 'Node.js', 'Ahmedabad'].map(tag => (
              <span key={tag} style={{
                background:   '#EFF6FF',
                border:       '1px solid #BFDBFE',
                borderRadius: '100px',
                padding:      '8px 20px',
                fontSize:     '18px',
                color:        '#1D4ED8',
                fontWeight:   '500',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute',
          bottom:   '32px',
          fontSize: '18px',
          color:    '#94A3B8',
        }}>
          samvegmehta.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
