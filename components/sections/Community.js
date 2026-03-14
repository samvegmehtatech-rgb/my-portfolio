'use client'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const COMMUNITY = [
  {
    icon: '🏫',
    title: 'Underprivileged Tech Ed',
    org: 'Ahemdabad Tech Foundation',
    date: 'Jan 2024',
    description: 'Spearheaded an initiative to teach foundational programming skills to 50+ students from low-income communities.',
    impact: '50+ students taught',
  },
  {
    icon: '🌊',
    title: 'Beach Cleanup Drive',
    org: 'Clean Ahemdabad NGO',
    date: 'Dec 2023',
    description: 'Volunteered for and helped coordinate a massive cleanup drive across Juhu beach. Handled volunteer registration logistics.',
    impact: '200 volunteers involved',
  },
  {
    icon: '💡',
    title: 'Introduction to Web Dev',
    org: 'DJ Sanghvi Coding Club',
    date: 'Oct 2023',
    description: 'Hosted a 2-day immersive workshop covering HTML, CSS, JavaScript, and an introduction to React for freshman engineering students.',
    impact: '120 attendees',
  },
]

const IMPACT_STATS = [
  { number: '500+', label: 'People Impacted' },
  { number: '10+', label: 'Events Organized' },
  { number: '3+', label: 'NGOs Collaborated' },
  { number: '2+', label: 'Years of Service' },
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
      </div>
    </section>
  )
}
