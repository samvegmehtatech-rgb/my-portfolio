'use client'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const EDUCATION = [
  {
    year:        '2019 – 2021',
    type:        'School',
    institution: 'Sakar English School',
    location:    'Gujarat, India',
    description: 'Completed Higher Secondary Education with Science stream. Built a strong foundation in mathematics and computers that sparked my passion for technology and software development.',
    highlight:   'Higher Secondary — Science Stream',
    icon:        '🏫',
  },
  {
    year:        '2021 – 2024',
    type:        "Bachelor's Degree",
    institution: 'Ganpat University',
    location:    'Gujarat, India',
    description: "Completed Bachelor's in Information Technology with exceptional academic performance. Built multiple real-world projects including a Healthcare Appointment Booking System and a MERN Stack Experience Listing Website. Awarded the Gold Medal for Highest Academic Merit.",
    highlight:   'B.IT — CGPA 9.35 | 🏅 Gold Medal',
    icon:        '🎓',
  },
  {
    year:        '2024 – Present',
    type:        "Master's Degree",
    institution: 'Ganpat University',
    location:    'Gujarat, India',
    description: "Currently pursuing Master's in Information Technology. Deepening expertise in full-stack development, cloud infrastructure, AI/ML, and system design while working on production-grade projects.",
    highlight:   "M.IT — CGPA 9.25 (Ongoing)",
    icon:        '🎓',
  },
]

function TimelineItem({ item, index }) {
  const ref = useScrollAnimation({
    y: 50,
    duration: 0.7,
    delay: index * 0.15,
  })

  return (
    <div ref={ref} style={{
      display: 'flex',
      gap: '32px',
      position: 'relative',
    }}>
      {/* Left: Year */}
      <div style={{
        width: '100px',
        flexShrink: 0,
        textAlign: 'right',
        paddingTop: '4px',
      }}>
        <span style={{
          fontSize: '12px',
          color: '#64748B',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: '500',
        }}>
          {item.year}
        </span>
      </div>

      {/* Center: Dot + Line */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#EFF6FF',
          border: '2px solid #2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
          zIndex: 1,
        }}>
          {item.icon}
        </div>
        <div style={{
          width: '2px',
          flexGrow: 1,
          background: 'linear-gradient(180deg, #2563EB, #E2E8F0)',
          minHeight: '60px',
          marginTop: '8px',
        }} />
      </div>

      {/* Right: Content */}
      <div style={{
        flex: 1,
        paddingBottom: '48px',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          color: '#2563EB',
          fontWeight: '600',
          textTransform: 'uppercase',
        }}>
          {item.type}
        </span>
        <h3 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#0A0A0A',
          margin: '6px 0 4px',
          fontFamily: 'Clash Display, sans-serif',
        }}>
          {item.institution}
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#64748B',
          marginBottom: '12px',
        }}>
          📍 {item.location}
        </p>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#64748B',
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
          {item.highlight}
        </span>
      </div>
    </div>
  )
}

export default function Education() {
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  return (
    <section id="education" style={{
      padding: '120px 40px',
      background: '#F8F9FA',
    }}>
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
            Education
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            letterSpacing: '-2px',
            color: '#0A0A0A',
            fontFamily: 'Clash Display, sans-serif',
            marginBottom: '64px',
            lineHeight: '1.1',
          }}>
            My learning<br />
            <span style={{ color: '#2563EB' }}>journey.</span>
          </h2>
        </div>

        {EDUCATION.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
