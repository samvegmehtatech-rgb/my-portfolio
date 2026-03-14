'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'
import Skeleton from '../Skeleton'

function ProjectCard({ project, index }) {
  const ref = useScrollAnimation({
    y: 50, duration: 0.7, delay: index * 0.1
  })

  return (
    <div ref={ref} style={{
      background:   '#FFFFFF',
      border:       '1px solid #E2E8F0',
      borderRadius: '20px',
      overflow:     'hidden',
      transition:   'all 0.3s ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform  = 'translateY(-8px)'
      e.currentTarget.style.boxShadow  = '0 30px 80px rgba(0,0,0,0.12)'
      e.currentTarget.style.borderColor= '#2563EB'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform  = 'translateY(0)'
      e.currentTarget.style.boxShadow  = 'none'
      e.currentTarget.style.borderColor= '#E2E8F0'
    }}
    >
      {/* Image placeholder */}
      <div style={{
        height:     '220px',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:   '48px',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
          />
        ) : (
          <span>💻</span>
        )}
        {project.featured && (
          <span style={{
            position:     'absolute',
            top:          '16px',
            right:        '16px',
            background:   '#0A0A0A',
            color:        '#FFFFFF',
            fontSize:     '11px',
            fontWeight:   '600',
            padding:      '4px 12px',
            borderRadius: '100px',
          }}>
            FEATURED
          </span>
        )}
      </div>

      <div style={{ padding: '28px' }}>
        <h3 style={{
          fontSize:     '20px',
          fontWeight:   '700',
          color:        '#0A0A0A',
          marginBottom: '10px',
          fontFamily:   'Clash Display, sans-serif',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize:     '14px',
          color:        '#64748B',
          lineHeight:   '1.7',
          marginBottom: '20px',
        }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{
          display:      'flex',
          gap:          '8px',
          flexWrap:     'wrap',
          marginBottom: '24px',
        }}>
          {(project.tech_stack || []).map((tech) => (
            <span key={tech} style={{
              background:  '#F8F9FA',
              border:      '1px solid #E2E8F0',
              borderRadius:'6px',
              padding:     '4px 10px',
              fontSize:    '12px',
              fontFamily:  'JetBrains Mono, monospace',
              color:       '#0A0A0A',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {project.live_url && (
            <a href={project.live_url} target="_blank"
              rel="noopener noreferrer"
              style={{
                background:     '#0A0A0A',
                color:          '#FFFFFF',
                padding:        '10px 20px',
                borderRadius:   '100px',
                fontSize:       '13px',
                fontWeight:     '600',
                textDecoration: 'none',
                transition:     'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background='#2563EB'}
              onMouseLeave={e => e.target.style.background='#0A0A0A'}
            >
              Live Demo ↗
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank"
              rel="noopener noreferrer"
              style={{
                background:     'transparent',
                color:          '#0A0A0A',
                padding:        '10px 20px',
                borderRadius:   '100px',
                fontSize:       '13px',
                fontWeight:     '600',
                textDecoration: 'none',
                border:         '1.5px solid #E2E8F0',
                transition:     'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = '#0A0A0A'
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = '#E2E8F0'
              }}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })
      setProjects(data || [])
      setLoading(false)
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" style={{
      padding:    '120px 40px',
      background: '#F8F9FA',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headerRef}>
          <p style={{
            fontSize:      '12px',
            letterSpacing: '0.2em',
            color:         '#2563EB',
            fontWeight:    '600',
            marginBottom:  '16px',
            textTransform: 'uppercase',
          }}>
            Projects
          </p>
          <h2 style={{
            fontSize:      'clamp(32px, 5vw, 56px)',
            fontWeight:    '700',
            letterSpacing: '-2px',
            color:         '#0A0A0A',
            fontFamily:    'Clash Display, sans-serif',
            marginBottom:  '64px',
            lineHeight:    '1.1',
          }}>
            Things I have<br />
            <span style={{ color: '#2563EB' }}>built.</span>
          </h2>
        </div>

        {loading ? (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap:                 '24px',
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                background:   '#FFFFFF',
                border:       '1px solid #E2E8F0',
                borderRadius: '20px',
                overflow:     'hidden',
                padding:      '28px',
              }}>
                <Skeleton height="200px" radius="12px" mb="20px" />
                <Skeleton height="24px" width="70%"   mb="12px" />
                <Skeleton height="16px" width="90%"   mb="8px"  />
                <Skeleton height="16px" width="60%"   mb="20px" />
                <Skeleton height="40px" width="120px" radius="100px" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p style={{ color: '#64748B', textAlign: 'center' }}>
            Projects coming soon. Add them from your admin panel.
          </p>
        ) : (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap:                 '24px',
          }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
