'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      setPost(data)
    }
    fetchPost()
  }, [slug])

  if (!post) return (
    <div style={{
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center',
      height:         '100vh',
      color:          '#64748B',
    }}>
      Loading...
    </div>
  )

  return (
    <div style={{
      maxWidth: '720px',
      margin:   '0 auto',
      padding:  '140px 40px 80px',
    }}>
      <Link href="/blog" style={{
        color:          '#64748B',
        textDecoration: 'none',
        fontSize:       '14px',
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '8px',
        marginBottom:   '48px',
      }}>
        ← All Posts
      </Link>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(post.tags || []).map(tag => (
          <span key={tag} style={{
            background:   '#EFF6FF',
            color:        '#1D4ED8',
            fontSize:     '12px',
            fontWeight:   '600',
            padding:      '4px 14px',
            borderRadius: '100px',
            border:       '1px solid #BFDBFE',
          }}>
            {tag}
          </span>
        ))}
      </div>

      <h1 style={{
        fontSize:      'clamp(32px, 5vw, 52px)',
        fontWeight:    '700',
        letterSpacing: '-2px',
        color:         '#0A0A0A',
        fontFamily:    'Clash Display, sans-serif',
        marginBottom:  '16px',
        lineHeight:    '1.1',
      }}>
        {post.title}
      </h1>

      <p style={{
        fontSize:     '17px',
        color:        '#64748B',
        marginBottom: '16px',
        lineHeight:   '1.7',
      }}>
        {post.excerpt}
      </p>

      <p style={{
        fontSize:     '13px',
        color:        '#64748B',
        fontFamily:   'JetBrains Mono, monospace',
        marginBottom: '48px',
        paddingBottom:'24px',
        borderBottom: '1px solid #E2E8F0',
      }}>
        {new Date(post.created_at).toLocaleDateString('en-IN', {
          weekday:'long', day:'numeric', month:'long', year:'numeric'
        })}
      </p>

      {/* Blog Content */}
      <div style={{
        fontSize:   '17px',
        lineHeight: '1.9',
        color:      '#374151',
        whiteSpace: 'pre-wrap',
      }}>
        {post.content}
      </div>
    </div>
  )
}
