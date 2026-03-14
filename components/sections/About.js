'use client'
import { useState, useRef } from 'react'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const SKILLS = [
  'JavaScript', 'React.js', 'Node.js', 'Express.js',
  'MongoDB', 'Python', 'Django', 'PHP', 'Java', 'SQL',
  'HTML', 'CSS', 'Bootstrap', 'ASP.NET Core',
  'Android Dev', 'WordPress', 'Magento', 'Git',
  'Azure', 'REST APIs'
]

const AI_TOOLS = [
  { name: 'Claude',        desc: 'Anthropic'        },
  { name: 'ChatGPT',       desc: 'OpenAI'           },
  { name: 'V0',            desc: 'Vercel'           },
  { name: 'Cursor',        desc: 'AI Code Editor'   },
  { name: 'GitHub Copilot',desc: 'Microsoft'        },
  { name: 'Midjourney',    desc: 'Image Gen'        },
  { name: 'Gemini',        desc: 'Google'           },
  { name: 'Perplexity',    desc: 'AI Search'        },
  { name: 'Bolt.new',      desc: 'StackBlitz'       },
  { name: 'Runway',        desc: 'AI Video'         },
]

const VALUES = [
  {
    icon: '🌱', title: 'Continuous Learning',
    desc: 'Every day is a chance to know something new'
  },
  {
    icon: '🤝', title: 'Community First',
    desc: 'Technology should lift people up, not leave them behind'
  },
  {
    icon: '🎯', title: 'Impact Driven',
    desc: 'I build things that solve real problems for real people'
  },
  {
    icon: '✨', title: 'Craft & Quality',
    desc: 'Details matter — good enough is never good enough'
  },
  {
    icon: '🤖', title: 'AI-First Mindset',
    desc: 'I embrace AI as a superpower — using it to build faster, think deeper, and create things that once took entire teams.'
  },
]

export default function About() {
  const [tab, setTab] = useState('engineer')
  const sectionRef = useScrollAnimation({ y: 40, duration: 0.9 })

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Section Label */}
      <p style={{
        fontSize: '12px',
        letterSpacing: '0.2em',
        color: '#2563EB',
        fontWeight: '600',
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>
        About Me
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
        More than just<br />
        <span style={{ color: '#2563EB' }}>a developer.</span>
      </h2>

      {/* Toggle Tabs */}
      <div style={{
        display: 'inline-flex',
        background: '#F8F9FA',
        borderRadius: '100px',
        padding: '4px',
        marginBottom: '48px',
        border: '1px solid #E2E8F0',
      }}>
        {['engineer', 'human'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 28px',
              borderRadius: '100px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: tab === t ? '#0A0A0A' : 'transparent',
              color: tab === t ? '#FFFFFF' : '#64748B',
              letterSpacing: '0.02em',
            }}
          >
            {t === 'engineer' ? '⚙️ The Engineer' : '🧠 The Human'}
          </button>
        ))}
      </div>

      {/* Engineer Tab */}
      {tab === 'engineer' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          <div>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#64748B',
              marginBottom: '32px',
            }}>
              I am a Software Developer based in Gujarat, India
              with a passion for building clean, performant, and
              scalable applications. Currently pursuing my Master's
              in Information Technology at Ganpat University with
              a CGPA of 9.25, while actively building real-world
              projects and interning at Ansi ByteCode LLP.
            </p>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.8',
              color: '#64748B',
            }}>
              I specialize in the MERN Stack and Django, and I
              believe great software is built at the intersection
              of technical excellence and deep empathy for the user.
              I bring a focused mindset and strong sense of
              responsibility to every project I take on.
            </p>
          </div>

          {/* Skills Grid */}
          <div>
            <p style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              color: '#64748B',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}>
              Tech Stack
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {SKILLS.map((skill) => (
                <span key={skill} style={{
                  background: '#F8F9FA',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#0A0A0A',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'all 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.target.style.background = '#EFF6FF'
                    e.target.style.borderColor = '#2563EB'
                    e.target.style.color = '#2563EB'
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = '#F8F9FA'
                    e.target.style.borderColor = '#E2E8F0'
                    e.target.style.color = '#0A0A0A'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* ── AI Tools Section ── */}
            <div style={{ marginTop: '48px' }}>

              {/* Section Label */}
              <p style={{
                fontSize:      '12px',
                letterSpacing: '0.15em',
                color:         '#64748B',
                marginBottom:  '8px',
                textTransform: 'uppercase',
                fontWeight:    '600',
              }}>
                AI Tools & Platforms
              </p>

              {/* Subtitle — smart line */}
              <p style={{
                fontSize:     '14px',
                color:        '#64748B',
                lineHeight:   '1.7',
                marginBottom: '20px',
                maxWidth:     '480px',
                fontStyle:    'italic',
              }}>
                I don't just use AI — I build with it.
                From prompting to production, I leverage
                these tools to ship faster, smarter, and
                better than ever before.
              </p>

              {/* AI Tools Grid */}
              <div style={{
                display:  'flex',
                flexWrap: 'wrap',
                gap:      '10px',
              }}>
                {AI_TOOLS.map((tool) => (
                  <div key={tool.name} style={{
                    background:    '#F8F9FA',
                    border:        '1px solid #E2E8F0',
                    borderRadius:  '10px',
                    padding:       '8px 16px',
                    display:       'flex',
                    flexDirection: 'column',
                    alignItems:    'flex-start',
                    gap:           '2px',
                    transition:    'all 0.2s ease',
                    cursor:        'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background   = '#EFF6FF'
                    e.currentTarget.style.borderColor  = '#2563EB'
                    e.currentTarget.style.transform    = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background   = '#F8F9FA'
                    e.currentTarget.style.borderColor  = '#E2E8F0'
                    e.currentTarget.style.transform    = 'translateY(0)'
                  }}
                  >
                    <span style={{
                      fontSize:   '13px',
                      fontWeight: '600',
                      color:      '#0A0A0A',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}>
                      {tool.name}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      color:    '#64748B',
                    }}>
                      {tool.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* AI Builder Badge */}
              <div style={{
                marginTop:    '24px',
                display:      'inline-flex',
                alignItems:   'center',
                gap:          '10px',
                background:   'linear-gradient(135deg, #EFF6FF, #F5F3FF)',
                border:       '1px solid #BFDBFE',
                borderRadius: '12px',
                padding:      '14px 20px',
              }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <div>
                  <p style={{
                    fontSize:   '14px',
                    fontWeight: '700',
                    color:      '#0A0A0A',
                    margin:     0,
                  }}>
                    AI-Powered Developer
                  </p>
                  <p style={{
                    fontSize:   '12px',
                    color:      '#64748B',
                    margin:     0,
                    lineHeight: '1.5',
                    maxWidth:   '320px',
                  }}>
                    Capable of building complete, production-ready
                    projects end-to-end using AI tools —
                    from idea to deployed product, fully independently.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Human Tab */}
      {tab === 'human' && (
        <div>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#64748B',
            marginBottom: '48px',
            maxWidth: '600px',
          }}>
            Beyond the code, I am a person who believes in the
            power of community, exploration, and human connection.
            I volunteer, I travel, I learn — and I bring all of
            that back into everything I build.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
          }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{
                background: '#F8F9FA',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '28px',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB'
                  e.currentTarget.style.background = '#EFF6FF'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0'
                  e.currentTarget.style.background = '#F8F9FA'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {v.icon}
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#0A0A0A',
                  marginBottom: '8px',
                }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
