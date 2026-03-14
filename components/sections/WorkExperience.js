'use client'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const WORK = [
  {
    company: 'Ganpat University',
    role: 'Master\'s Student & Developer',
    duration: '2024 – Present',
    location: 'Gujarat, India',
    type: 'Full Time Student',
    current: true,
    description: 'Pursuing M.IT while actively building real-world projects and expanding expertise in full-stack development.',
    impact: [
      'Maintaining CGPA of 9.25',
      'Building production-grade web applications',
      'Exploring cloud and mobile technologies'
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Python'],
  }
]

function WorkCard({ job, index }) {
  const ref = useScrollAnimation({ y: 40, duration: 0.7, delay: index * 0.1 })

  return (
    <div ref={ref} style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '20px',
      padding: '36px',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#2563EB'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(37,99,235,0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#E2E8F0'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Blue left accent line */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: job.current
          ? 'linear-gradient(180deg, #2563EB, #60A5FA)'
          : '#E2E8F0',
        borderRadius: '4px 0 0 4px',
      }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px',
        paddingLeft: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#0A0A0A',
              fontFamily: 'Clash Display, sans-serif',
            }}>
              {job.role}
            </h3>
            {job.current && (
              <span style={{
                background: '#DCFCE7',
                color: '#166534',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 12px',
                borderRadius: '100px',
                border: '1px solid #BBF7D0',
              }}>
                CURRENT
              </span>
            )}
          </div>
          <p style={{
            fontSize: '16px',
            color: '#2563EB',
            fontWeight: '600',
            marginTop: '4px',
          }}>
            {job.company}
          </p>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            📍 {job.location} · {job.type}
          </p>
        </div>
        <span style={{
          fontSize: '13px',
          color: '#64748B',
          fontFamily: 'JetBrains Mono, monospace',
          background: '#F8F9FA',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          height: 'fit-content',
        }}>
          {job.duration}
        </span>
      </div>

      <p style={{
        fontSize: '15px',
        color: '#64748B',
        lineHeight: '1.7',
        marginBottom: '20px',
        paddingLeft: '16px',
      }}>
        {job.description}
      </p>

      <ul style={{ paddingLeft: '32px', marginBottom: '20px' }}>
        {job.impact.map((point, i) => (
          <li key={i} style={{
            fontSize: '14px',
            color: '#64748B',
            lineHeight: '1.7',
            marginBottom: '6px',
          }}>
            {point}
          </li>
        ))}
      </ul>

      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        paddingLeft: '16px',
      }}>
        {job.tech.map((t) => (
          <span key={t} style={{
            background: '#F8F9FA',
            border: '1px solid #E2E8F0',
            borderRadius: '6px',
            padding: '4px 12px',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            color: '#0A0A0A',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function WorkExperience() {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  return (
    <section id="work" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div ref={headerRef}>
          <p style={{
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#2563EB',
            fontWeight: '600',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}>
            Experience
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            letterSpacing: '-2px',
            color: '#0A0A0A',
            fontFamily: 'Clash Display, sans-serif',
            marginBottom: '48px',
            lineHeight: '1.1',
          }}>
            Where I have<br />
            <span style={{ color: '#2563EB' }}>worked.</span>
          </h2>
        </div>
        {WORK.map((job, i) => (
          <WorkCard key={i} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
