'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function BlogPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchAll() {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
      setPosts(data || [])
    }
    fetchAll()
  }, [])

  return (
    <div style={{
      maxWidth: '800px',
      margin:   '0 auto',
      padding:  '140px 40px 80px',
    }}>
      <Link href="/" style={{
        color:          '#64748B',
        textDecoration: 'none',
        fontSize:       '14px',
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '8px',
        marginBottom:   '48px',
      }}>
        ← Back to Portfolio
      </Link>

      <h1 style={{
        fontSize:      'clamp(36px, 6vw, 64px)',
        fontWeight:    '700',
        letterSpacing: '-2px',
        color:         '#0A0A0A',
        fontFamily:    'Clash Display, sans-serif',
        marginBottom:  '16px',
      }}>
        All Writings
      </h1>
      <p style={{
        fontSize:     '17px',
        color:        '#64748B',
        marginBottom: '64px',
      }}>
        Thoughts, learnings, and stories from my journey.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              padding:      '28px',
              border:       '1px solid #E2E8F0',
              borderRadius: '16px',
              background:   '#FFFFFF',
              transition:   'all 0.3s ease',
              display:      'flex',
              justifyContent:'space-between',
              alignItems:   'center',
              gap:          '24px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2563EB'
              e.currentTarget.style.transform   = 'translateX(8px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E2E8F0'
              e.currentTarget.style.transform   = 'translateX(0)'
            }}
            >
              <div>
                <h2 style={{
                  fontSize:     '20px',
                  fontWeight:   '700',
                  color:        '#0A0A0A',
                  marginBottom: '8px',
                  fontFamily:   'Clash Display, sans-serif',
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color:    '#64748B',
                  lineHeight:'1.6',
                }}>
                  {post.excerpt}
                </p>
              </div>
              <span style={{
                color:     '#2563EB',
                fontSize:  '24px',
                flexShrink: 0,
              }}>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
