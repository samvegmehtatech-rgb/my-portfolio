'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

const AVATAR_COLORS = [
  '#2563EB', '#7C3AED', '#DB2777', '#DC2626',
  '#D97706', '#059669', '#0891B2', '#4F46E5',
]

export default function Guestbook() {
  const [messages, setMessages] = useState([])
  const [name,     setName]     = useState('')
  const [message,  setMessage]  = useState('')
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  // Fetch messages
  useEffect(() => {
    async function fetchMessages() {
      const { data } = await supabase
        .from('guestbook')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
      setMessages(data || [])
    }
    fetchMessages()

    // Realtime subscription
    const channel = supabase
      .channel('guestbook-changes')
      .on('postgres_changes', {
        event:  'INSERT',
        schema: 'public',
        table:  'guestbook',
      }, (payload) => {
        setMessages(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return
    setLoading(true)

    const color = AVATAR_COLORS[
      Math.floor(Math.random() * AVATAR_COLORS.length)
    ]

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message, avatar_color: color }])

    if (!error) {
      setName('')
      setMessage('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <section id="guestbook" style={{
      padding:    '120px 40px',
      background: '#F8F9FA',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div ref={headerRef}>
          <p style={{
            fontSize:      '12px',
            letterSpacing: '0.2em',
            color:         '#2563EB',
            fontWeight:    '600',
            marginBottom:  '16px',
            textTransform: 'uppercase',
          }}>
            Guestbook
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
            Leave your<br />
            <span style={{ color: '#2563EB' }}>mark.</span>
          </h2>
          <p style={{
            fontSize:     '17px',
            color:        '#64748B',
            marginBottom: '48px',
          }}>
            You visited. Say something — anything. 
            It means the world.
          </p>
        </div>

        {/* Submit Form */}
        <div style={{
          background:   '#FFFFFF',
          border:       '1px solid #E2E8F0',
          borderRadius: '20px',
          padding:      '32px',
          marginBottom: '48px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px',
          }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                padding:      '14px 18px',
                border:       '1px solid #E2E8F0',
                borderRadius: '12px',
                fontSize:     '15px',
                outline:      'none',
                fontFamily:   'Satoshi, sans-serif',
                transition:   'border-color 0.2s',
                color:        '#0A0A0A',
                background:   '#F8F9FA',
              }}
              onFocus={e  => e.target.style.borderColor = '#2563EB'}
              onBlur={e   => e.target.style.borderColor = '#E2E8F0'}
            />
            <div />
          </div>

          <textarea
            placeholder="Write something nice... or honest. Both work."
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            style={{
              width:        '100%',
              padding:      '14px 18px',
              border:       '1px solid #E2E8F0',
              borderRadius: '12px',
              fontSize:     '15px',
              outline:      'none',
              fontFamily:   'Satoshi, sans-serif',
              resize:       'vertical',
              marginBottom: '16px',
              transition:   'border-color 0.2s',
              color:        '#0A0A0A',
              background:   '#F8F9FA',
              boxSizing:    'border-box',
            }}
            onFocus={e => e.target.style.borderColor = '#2563EB'}
            onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
          />

          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '16px',
          }}>
            <button
              onClick={handleSubmit}
              disabled={loading || !name || !message}
              style={{
                background:  loading ? '#E2E8F0' : '#0A0A0A',
                color:       loading ? '#64748B' : '#FFFFFF',
                padding:     '14px 32px',
                borderRadius:'100px',
                border:      'none',
                fontSize:    '15px',
                fontWeight:  '600',
                cursor:      loading ? 'not-allowed' : 'pointer',
                transition:  'all 0.2s',
                fontFamily:  'Satoshi, sans-serif',
              }}
              onMouseEnter={e => {
                if (!loading) e.target.style.background = '#2563EB'
              }}
              onMouseLeave={e => {
                if (!loading) e.target.style.background = '#0A0A0A'
              }}
            >
              {loading ? 'Posting...' : 'Leave a Message ✨'}
            </button>

            {success && (
              <span style={{
                color:     '#166534',
                fontSize:  '14px',
                fontWeight:'500',
              }}>
                ✅ Message posted! Thank you.
              </span>
            )}
          </div>
        </div>

        {/* Messages Wall */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap:                 '16px',
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              background:   '#FFFFFF',
              border:       '1px solid #E2E8F0',
              borderRadius: '16px',
              padding:      '24px',
              transition:   'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2563EB'
              e.currentTarget.style.transform   = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E2E8F0'
              e.currentTarget.style.transform   = 'translateY(0)'
            }}
            >
              <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '12px',
                marginBottom: '12px',
              }}>
                {/* Avatar */}
                <div style={{
                  width:          '40px',
                  height:         '40px',
                  borderRadius:   '50%',
                  background:     msg.avatar_color || '#2563EB',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  color:          '#FFFFFF',
                  fontWeight:     '700',
                  fontSize:       '16px',
                  flexShrink:     0,
                }}>
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{
                    fontSize:  '15px',
                    fontWeight:'700',
                    color:     '#0A0A0A',
                  }}>
                    {msg.name}
                  </p>
                  <p style={{
                    fontSize:   '12px',
                    color:      '#64748B',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    {new Date(msg.created_at).toLocaleDateString('en-IN', {
                      day:'numeric', month:'short', year:'numeric'
                    })}
                  </p>
                </div>
              </div>
              <p style={{
                fontSize:  '14px',
                color:     '#374151',
                lineHeight:'1.7',
              }}>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
