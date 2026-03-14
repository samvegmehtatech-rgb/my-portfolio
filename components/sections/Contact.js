'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

export default function Contact() {
  const [form,    setForm]    = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })
  const formRef   = useScrollAnimation({ y: 40, duration: 0.8, delay: 0.2 })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setError('')

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert([form])

    if (dbError) {
      setError('Something went wrong. Please try again.')
    } else {
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }
    setLoading(false)
  }

  const inputStyle = {
    width:        '100%',
    padding:      '14px 18px',
    border:       '1px solid #E2E8F0',
    borderRadius: '12px',
    fontSize:     '15px',
    outline:      'none',
    fontFamily:   'Satoshi, sans-serif',
    color:        '#0A0A0A',
    background:   '#F8F9FA',
    boxSizing:    'border-box',
    transition:   'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '120px 40px' }}>
      <div style={{
        maxWidth: '1100px',
        margin:   '0 auto',
        display:  'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap:      '80px',
        alignItems:'start',
      }}>

        {/* Left: Info */}
        <div ref={headerRef}>
          <p style={{
            fontSize:      '12px',
            letterSpacing: '0.2em',
            color:         '#2563EB',
            fontWeight:    '600',
            marginBottom:  '16px',
            textTransform: 'uppercase',
          }}>
            Contact
          </p>
          <h2 style={{
            fontSize:      'clamp(32px, 5vw, 56px)',
            fontWeight:    '700',
            letterSpacing: '-2px',
            color:         '#0A0A0A',
            fontFamily:    'Clash Display, sans-serif',
            marginBottom:  '24px',
            lineHeight:    '1.1',
          }}>
            Let us build<br />
            <span style={{ color: '#2563EB' }}>something.</span>
          </h2>
          <p style={{
            fontSize:     '17px',
            color:        '#64748B',
            lineHeight:   '1.7',
            marginBottom: '48px',
          }}>
            Have a project in mind? Want to collaborate?
            Or just want to say hi? My inbox is always open.
          </p>

          {/* Contact Details */}
          {[
            { icon: '📧', label: 'Email',    value: 'your@email.com'              },
            { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/yourusername' },
            { icon: '🐙', label: 'GitHub',   value: 'github.com/yourusername'      },
            { icon: '📍', label: 'Location', value: 'Mumbai, India'                },
          ].map((item) => (
            <div key={item.label} style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '16px',
              marginBottom: '20px',
            }}>
              <div style={{
                width:          '48px',
                height:         '48px',
                borderRadius:   '12px',
                background:     '#F8F9FA',
                border:         '1px solid #E2E8F0',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '20px',
                flexShrink:     0,
              }}>
                {item.icon}
              </div>
              <div>
                <p style={{
                  fontSize:  '12px',
                  color:     '#64748B',
                  fontWeight:'600',
                  textTransform:'uppercase',
                  letterSpacing:'0.05em',
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize:  '15px',
                  color:     '#0A0A0A',
                  fontWeight:'500',
                }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Form */}
        <div ref={formRef} style={{
          background:   '#F8F9FA',
          border:       '1px solid #E2E8F0',
          borderRadius: '24px',
          padding:      '40px',
        }}>
          {success ? (
            <div style={{
              textAlign:  'center',
              padding:    '40px 0',
            }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>
                🎉
              </div>
              <h3 style={{
                fontSize:     '24px',
                fontWeight:   '700',
                color:        '#0A0A0A',
                marginBottom: '12px',
                fontFamily:   'Clash Display, sans-serif',
              }}>
                Message Sent!
              </h3>
              <p style={{ color: '#64748B', fontSize: '16px' }}>
                Thank you for reaching out. I will get back
                to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '16px',
              }}>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#2563EB'}
                  onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#2563EB'}
                  onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
                />
              </div>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                style={{ ...inputStyle, marginBottom: '16px' }}
                onFocus={e => e.target.style.borderColor = '#2563EB'}
                onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
              />
              <textarea
                name="message"
                placeholder="Tell me about your project or just say hello..."
                value={form.message}
                onChange={handleChange}
                rows={6}
                style={{
                  ...inputStyle,
                  resize:       'vertical',
                  marginBottom: '24px',
                  display:      'block',
                }}
                onFocus={e => e.target.style.borderColor = '#2563EB'}
                onBlur={e  => e.target.style.borderColor = '#E2E8F0'}
              />

              {error && (
                <p style={{
                  color:        '#DC2626',
                  fontSize:     '14px',
                  marginBottom: '16px',
                }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width:       '100%',
                  background:  loading ? '#E2E8F0' : '#0A0A0A',
                  color:       loading ? '#64748B' : '#FFFFFF',
                  padding:     '16px',
                  borderRadius:'12px',
                  border:      'none',
                  fontSize:    '16px',
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
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
