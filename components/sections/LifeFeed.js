'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'
import Skeleton from '../Skeleton'

const CATEGORIES = ['All', 'Travel', 'Community', 'Learning', 'Event', 'Personal']

const CATEGORY_COLORS = {
  Travel:    { bg: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
  Community: { bg: '#F0FDF4', border: '#BBF7D0', text: '#166534' },
  Learning:  { bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
  Event:     { bg: '#FDF4FF', border: '#E9D5FF', text: '#7E22CE' },
  Personal:  { bg: '#FFF1F2', border: '#FECDD3', text: '#BE123C' },
}

function FeedCard({ item, index }) {
  const ref = useScrollAnimation({ y: 40, duration: 0.6, delay: index * 0.08 })
  const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Personal

  return (
    <div ref={ref} style={{
      background:   '#FFFFFF',
      border:       '1px solid #E2E8F0',
      borderRadius: '20px',
      overflow:     'hidden',
      transition:   'all 0.3s ease',
      breakInside:  'avoid',
      marginBottom: '20px',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform  = 'translateY(-6px)'
      e.currentTarget.style.boxShadow  = '0 24px 64px rgba(0,0,0,0.10)'
      e.currentTarget.style.borderColor= '#2563EB'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform  = 'translateY(0)'
      e.currentTarget.style.boxShadow  = 'none'
      e.currentTarget.style.borderColor= '#E2E8F0'
    }}
    >
      {/* Image */}
      {item.image_url && (
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={item.image_url}
            alt={item.title}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        </div>
      )}

      <div style={{ padding: '24px' }}>
        {/* Category Badge */}
        <span style={{
          background:   colors.bg,
          border:       `1px solid ${colors.border}`,
          color:        colors.text,
          fontSize:     '11px',
          fontWeight:   '600',
          padding:      '4px 12px',
          borderRadius: '100px',
          letterSpacing:'0.05em',
          textTransform:'uppercase',
        }}>
          {item.category}
        </span>

        <h3 style={{
          fontSize:     '17px',
          fontWeight:   '700',
          color:        '#0A0A0A',
          margin:       '12px 0 8px',
          fontFamily:   'Clash Display, sans-serif',
          lineHeight:   '1.3',
        }}>
          {item.title}
        </h3>

        {item.description && (
          <p style={{
            fontSize:   '14px',
            color:      '#64748B',
            lineHeight: '1.6',
            marginBottom:'12px',
          }}>
            {item.description}
          </p>
        )}

        <div style={{
          display:    'flex',
          justifyContent:'space-between',
          alignItems: 'center',
          marginTop:  '12px',
        }}>
          {item.location && (
            <span style={{ fontSize:'12px', color:'#64748B' }}>
              📍 {item.location}
            </span>
          )}
          <span style={{
            fontSize:   '12px',
            color:      '#64748B',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            {new Date(item.created_at).toLocaleDateString('en-IN', {
              day:   'numeric',
              month: 'short',
              year:  'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function LifeFeed() {
  const [feed,     setFeed]     = useState([])
  const [filtered, setFiltered] = useState([])
  const [active,   setActive]   = useState('All')
  const [loading,  setLoading]  = useState(true)
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  useEffect(() => {
    async function fetchFeed() {
      const { data } = await supabase
        .from('life_feed')
        .select('*')
        .order('created_at', { ascending: false })
      setFeed(data || [])
      setFiltered(data || [])
      setLoading(false)
    }
    fetchFeed()
  }, [])

  const filterByCategory = (cat) => {
    setActive(cat)
    if (cat === 'All') {
      setFiltered(feed)
    } else {
      setFiltered(feed.filter(item => item.category === cat))
    }
  }

  return (
    <section id="lifefeed" style={{
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
            Life Feed
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
            Beyond the<br />
            <span style={{ color: '#2563EB' }}>code.</span>
          </h2>
          <p style={{
            fontSize:     '17px',
            color:        '#64748B',
            lineHeight:   '1.7',
            marginBottom: '48px',
            maxWidth:     '500px',
          }}>
            A glimpse into my life outside the terminal —
            travels, community work, learning, and everything
            in between.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{
          display:      'flex',
          gap:          '10px',
          flexWrap:     'wrap',
          marginBottom: '48px',
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
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
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {loading ? (
          <div style={{
            columns:     '3 300px',
            columnGap:   '20px',
          }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                background:   '#FFFFFF',
                border:       '1px solid #E2E8F0',
                borderRadius: '20px',
                overflow:     'hidden',
                padding:      '24px',
                marginBottom: '20px',
                breakInside:  'avoid',
              }}>
                <Skeleton height="180px" radius="12px" mb="20px" />
                <Skeleton height="20px" width="30%"   mb="12px" radius="100px" />
                <Skeleton height="24px" width="80%"   mb="16px"  />
                <Skeleton height="16px" width="90%"   mb="8px" />
                <Skeleton height="16px" width="60%"   mb="16px" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ color: '#64748B', textAlign: 'center' }}>
            No posts yet. Add your first life update from admin panel!
          </p>
        ) : (
          <div style={{
            columns:     '3 300px',
            columnGap:   '20px',
          }}>
            {filtered.map((item, i) => (
              <FeedCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
