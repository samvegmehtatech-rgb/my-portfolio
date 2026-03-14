'use client'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const COMMUNITY = [
  {
    icon:        '💻',
    title:       'Tech Workshop at University',
    org:         'Ganpat University',
    date:        'Mar 2024',
    description: 'Conducted a technical workshop for fellow students on web development fundamentals and modern JavaScript frameworks.',
    impact:      '50+ students attended',
  },
  {
    icon:        '🏆',
    title:       'Hackathon Participant',
    org:         'Ganpat University',
    date:        'Feb 2024',
    description: 'Participated in university-level hackathon, building a working prototype within 24 hours as part of a 4-member team.',
    impact:      '4 member team',
  },
  {
    icon:        '🌱',
    title:       'Community Development Initiative',
    org:         'Local NGO',
    date:        'Jan 2024',
    description: 'Actively participated in community development activities combining technology and social responsibility.',
    impact:      '500+ people impacted',
  },
]

const IMPACT_STATS = [
  { number: '500+', label: 'People Impacted'    },
  { number: '5+',   label: 'Events Organized'   },
  { number: '2+',   label: 'Years of Service'   },
  { number: '9.35', label: 'Academic CGPA'      },
]

export default function Community() {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  return (
    <section id="community" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div ref={headerRef}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#2563EB',
            fontWeight: '600',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}>
            Social Work
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            letterSpacing: '-2px',
            color: '#0A0A0A',
            fontFamily: 'Clash Display, sans-serif',
            marginBottom: '24px',
            lineHeight: '1.1',
          }}>
            Giving back to the<br />
            <span style={{ color: '#2563EB' }}>community.</span>
          </h2>
          <p style={{
            fontSize: '17px',
            color: '#64748B',
            lineHeight: '1.7',
            marginBottom: '64px',
            maxWidth: '600px',
          }}>
            Technology is a privilege. I use mine to serve,
            teach, and uplift the communities around me.
          </p>
        </div>

        {/* Impact Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          marginBottom: '64px',
        }}>
          {IMPACT_STATS.map((stat, i) => {
            const ref = useScrollAnimation({ y: 20, delay: i * 0.1 })
            return (
              <div key={stat.label} ref={ref} style={{
                background: '#F8F9FA',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 'clamp(32px, 4vw, 44px)',
                  fontWeight: '700',
                  color: '#2563EB',
                  fontFamily: 'Clash Display, sans-serif',
                  letterSpacing: '-1px',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#64748B',
                  marginTop: '6px',
                }}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Community Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {COMMUNITY.map((item, i) => {
            const ref = useScrollAnimation({ y: 40, delay: i * 0.1 })
            return (
              <div key={i} ref={ref} style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow =
                    '0 20px 60px rgba(37,99,235,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#0A0A0A',
                  marginBottom: '6px',
                  fontFamily: 'Clash Display, sans-serif',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#2563EB',
                  fontWeight: '600',
                  marginBottom: '4px',
                }}>
                  {item.org}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#64748B',
                  marginBottom: '16px',
                }}>
                  {item.date}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: '1.7',
                  marginBottom: '16px',
                }}>
                  {item.description}
                </p>
                <span style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '13px',
                  color: '#1D4ED8',
                  fontWeight: '500',
                }}>
                  🎯 {item.impact}
                </span>
              </div>
            )
          })}
        </div>

        {/* --- ACHIEVEMENTS SECTION --- */}
        <div style={{ marginTop: '80px' }}>

          {/* Section Header */}
          <p style={{
            fontSize:      '12px',
            letterSpacing: '0.2em',
            color:         '#2563EB',
            fontWeight:    '600',
            marginBottom:  '16px',
            textTransform: 'uppercase',
          }}>
            Awards & Recognition
          </p>
          <h3 style={{
            fontSize:      'clamp(24px, 4vw, 40px)',
            fontWeight:    '700',
            letterSpacing: '-1px',
            color:         '#0A0A0A',
            fontFamily:    'Clash Display, sans-serif',
            marginBottom:  '48px',
            lineHeight:    '1.1',
          }}>
            Achievements that<br />
            <span style={{ color: '#2563EB' }}>define me.</span>
          </h3>

          {/* Gold Medal Card */}
          <div style={{
            maxWidth:     '560px',
            margin:       '0 auto 40px',
            background:   '#FFFFFF',
            borderRadius: '24px',
            padding:      '40px',
            border:       '3px solid transparent',
            backgroundClip: 'padding-box',
            boxShadow:    '0 8px 40px rgba(245,158,11,0.15)',
            position:     'relative',
            textAlign:    'center',
          }}>
            {/* Gold gradient border effect */}
            <div style={{
              position:     'absolute',
              inset:        0,
              borderRadius: '24px',
              padding:      '3px',
              background:   'linear-gradient(135deg, #F59E0B, #FCD34D, #D97706, #F59E0B)',
              WebkitMask:   'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              maskComposite:'exclude',
              zIndex:       0,
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                🏅
              </div>
              <h4 style={{
                fontSize:     '22px',
                fontWeight:   '700',
                color:        '#0A0A0A',
                marginBottom: '8px',
                fontFamily:   'Clash Display, sans-serif',
              }}>
                Gold Medal — Academic Excellence
              </h4>
              <p style={{
                fontSize:     '15px',
                color:        '#D97706',
                fontWeight:   '600',
                marginBottom: '4px',
              }}>
                Highest Merit in B.IT
              </p>
              <p style={{
                fontSize:     '13px',
                color:        '#64748B',
                marginBottom: '16px',
              }}>
                Ganpat University · 2024
              </p>
              <p style={{
                fontSize:   '15px',
                color:      '#64748B',
                lineHeight: '1.7',
              }}>
                Awarded the Gold Medal for achieving the
                Highest Academic Merit in Bachelor of Science
                in Information Technology with a CGPA of 9.35.
              </p>
            </div>
          </div>

          {/* Certificate Cards */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap:                 '20px',
            maxWidth:            '560px',
            margin:              '0 auto',
          }}>
            {[
              {
                icon:   '🎗️',
                title:  'MongoDB Node.js Developer Path',
                issuer: 'Offered by MongoDB',
                color:  '#00ED64',
                border: '#BBF7D0',
                bg:     '#F0FDF4',
              },
              {
                icon:   '🎗️',
                title:  'Google Cloud Infrastructure',
                issuer: 'Offered by Google',
                color:  '#2563EB',
                border: '#BFDBFE',
                bg:     '#EFF6FF',
              },
            ].map((cert) => (
              <div key={cert.title} style={{
                background:   cert.bg,
                border:       `2px solid ${cert.border}`,
                borderRadius: '16px',
                padding:      '28px 24px',
                textAlign:    'center',
                transition:   'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform  = 'translateY(-4px)'
                e.currentTarget.style.boxShadow  =
                  '0 12px 40px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = 'translateY(0)'
                e.currentTarget.style.boxShadow  = 'none'
              }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                  {cert.icon}
                </div>
                <h4 style={{
                  fontSize:     '15px',
                  fontWeight:   '700',
                  color:        '#0A0A0A',
                  marginBottom: '8px',
                  fontFamily:   'Clash Display, sans-serif',
                  lineHeight:   '1.3',
                }}>
                  {cert.title}
                </h4>
                <p style={{
                  fontSize:  '13px',
                  color:     '#64748B',
                  fontWeight:'500',
                }}>
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
