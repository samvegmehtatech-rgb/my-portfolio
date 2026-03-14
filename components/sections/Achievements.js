'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const CATEGORIES = [
  'All', 'Award', 'Certificate',
  'Community', 'Event', 'Hackathon', 'Personal'
]

const CATEGORY_STYLES = {
  Award:       { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
  Certificate: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
  Community:   { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  Event:       { bg: '#FDF4FF', border: '#E9D5FF', text: '#7E22CE' },
  Hackathon:   { bg: '#FFF1F2', border: '#FECDD3', text: '#BE123C' },
  Personal:    { bg: '#F8F9FA', border: '#E2E8F0', text: '#64748B' },
}

function AchievementCard({ item, index }) {
  const ref = useScrollAnimation({
    y: 40, duration: 0.6, delay: index * 0.08
  })
  const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Personal
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        background:   '#FFFFFF',
        border:       '1px solid #E2E8F0',
        borderRadius: '20px',
        overflow:     'hidden',
        breakInside:  'avoid',
        marginBottom: '20px',
        transition:   'all 0.3s ease',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow:    hovered
          ? '0 24px 64px rgba(0,0,0,0.10)'
          : 'none',
        borderColor:  hovered ? '#2563EB' : '#E2E8F0',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      {item.image_url && (
        <div style={{
          position:   'relative',
          overflow:   'hidden',
          height:     item.featured ? '280px' : '200px',
        }}>
          <img
            src={item.image_url}
            alt={item.title}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              transition: 'transform 0.5s ease',
              transform:  hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {/* Gradient overlay on image */}
          <div style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '80px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
          }} />
          {/* Featured badge on image */}
          {item.featured && (
            <div style={{
              position:     'absolute',
              top:          '12px',
              right:        '12px',
              background:   'rgba(0,0,0,0.7)',
              backdropFilter:'blur(8px)',
              color:        '#FFFFFF',
              fontSize:     '11px',
              fontWeight:   '600',
              padding:      '4px 12px',
              borderRadius: '100px',
              letterSpacing:'0.05em',
            }}>
              ⭐ FEATURED
            </div>
          )}
        </div>
      )}

      {/* No image placeholder */}
      {!item.image_url && (
        <div style={{
          height:         '120px',
          background:     `linear-gradient(135deg, ${style.bg}, #FFFFFF)`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '48px',
          borderBottom:   `1px solid ${style.border}`,
        }}>
          {item.category === 'Award'       ? '🏅' :
           item.category === 'Certificate' ? '🎗️' :
           item.category === 'Community'   ? '🤝' :
           item.category === 'Event'       ? '🎪' :
           item.category === 'Hackathon'   ? '💻' : '✨'}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '20px' }}>

        {/* Category Badge */}
        <span style={{
          background:    style.bg,
          border:        `1px solid ${style.border}`,
          color:         style.text,
          fontSize:      '11px',
          fontWeight:    '600',
          padding:       '3px 10px',
          borderRadius:  '100px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          {item.category}
        </span>

        <h3 style={{
          fontSize:     '16px',
          fontWeight:   '700',
          color:        '#0A0A0A',
          margin:       '10px 0 6px',
          fontFamily:   'Clash Display, sans-serif',
          lineHeight:   '1.3',
        }}>
          {item.title}
        </h3>

        {item.description && (
          <p style={{
            fontSize:     '13px',
            color:        '#64748B',
            lineHeight:   '1.6',
            marginBottom: '12px',
          }}>
            {item.description}
          </p>
        )}

        <div style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          flexWrap:       'wrap',
          gap:            '8px',
        }}>
          {item.issuer && (
            <span style={{
              fontSize:  '12px',
              color:     '#2563EB',
              fontWeight:'600',
            }}>
              {item.issuer}
            </span>
          )}
          {item.date && (
            <span style={{
              fontSize:   '12px',
              color:      '#64748B',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {item.date}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const [items,    setItems]    = useState([])
  const [filtered, setFiltered] = useState([])
  const [active,   setActive]   = useState('All')
  const [loading,  setLoading]  = useState(true)
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  useEffect(() => {
    async function fetchAchievements() {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
      setItems(data || [])
      setFiltered(data || [])
      setLoading(false)
    }
    fetchAchievements()
  }, [])

  const filter = (cat) => {
    setActive(cat)
    setFiltered(
      cat === 'All'
        ? items
        : items.filter(i => i.category === cat)
    )
  }

  return (
    <section id="achievements" style={{
      padding:    '120px 40px',
      background: '#FFFFFF',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef}>
          <p style={{
            fontSize:      '12px',
            letterSpacing: '0.2em',
            color:         '#2563EB',
            fontWeight:    '600',
            marginBottom:  '16px',
            textTransform: 'uppercase',
          }}>
            Achievements & Gallery
          </p>
          <h2 style={{
            fontSize:      'clamp(32px, 5vw, 56px)',
            fontWeight:    '700',
            letterSpacing: '-2px',
            color:         '#0A0A0A',
            fontFamily:    'Clash Display, sans-serif',
            marginBottom:  '16px',
            lineHeight:    '1.1',
          }}>
            Moments that<br />
            <span style={{ color: '#2563EB' }}>matter.</span>
          </h2>
          <p style={{
            fontSize:     '17px',
            color:        '#64748B',
            lineHeight:   '1.7',
            marginBottom: '48px',
            maxWidth:     '500px',
          }}>
            Awards, certificates, community work,
            and the moments I am most proud of —
            all in one place.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display:      'flex',
          gap:          '10px',
          flexWrap:     'wrap',
          marginBottom: '48px',
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => filter(cat)}
              style={{
                padding:      '8px 20px',
                borderRadius: '100px',
                border:       '1px solid',
                borderColor:  active === cat ? '#0A0A0A' : '#E2E8F0',
                background:   active === cat ? '#0A0A0A' : '#FFFFFF',
                color:        active === cat ? '#FFFFFF'  : '#64748B',
                fontSize:     '13px',
                fontWeight:   '500',
                cursor:       'pointer',
                transition:   'all 0.2s',
                fontFamily:   'Satoshi, sans-serif',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <p style={{ color: '#64748B', textAlign: 'center',
            padding: '40px' }}>
            Loading achievements...
          </p>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign:  'center',
            padding:    '80px 40px',
            background: '#F8F9FA',
            borderRadius:'20px',
            border:     '1px solid #E2E8F0',
          }}>
            <p style={{ fontSize:'48px', marginBottom:'16px' }}>
              🏆
            </p>
            <p style={{ color:'#64748B', fontSize:'16px' }}>
              No achievements yet.
              Add your first from the admin panel!
            </p>
          </div>
        ) : (
          <div style={{
            columns:   '3 280px',
            columnGap: '20px',
          }}>
            {filtered.map((item, i) => (
              <AchievementCard
                key={item.id}
                item={item}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
