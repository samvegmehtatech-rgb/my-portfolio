'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../lib/useScrollAnimation'

function BlogCard({ post, index }) {
  const ref = useScrollAnimation({ y: 40, duration: 0.6, delay: index * 0.1 })

  return (
    <div ref={ref}>
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
        <div style={{
          background:   '#FFFFFF',
          border:       '1px solid #E2E8F0',
          borderRadius: '20px',
          overflow:     'hidden',
          transition:   'all 0.3s ease',
          height:       '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform   = 'translateY(-6px)'
          e.currentTarget.style.borderColor = '#2563EB'
          e.currentTarget.style.boxShadow   =
            '0 24px 64px rgba(37,99,235,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform   = 'translateY(0)'
          e.currentTarget.style.borderColor = '#E2E8F0'
          e.currentTarget.style.boxShadow   = 'none'
        }}
        >
          {/* Cover image */}
          <div style={{
            height:     '200px',
            background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
            overflow:   'hidden',
          }}>
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
              />
            )}
          </div>

          <div style={{ padding: '28px' }}>
            {/* Tags */}
            <div style={{
              display:      'flex',
              gap:          '8px',
              flexWrap:     'wrap',
              marginBottom: '16px',
            }}>
              {(post.tags || []).slice(0, 2).map(tag => (
                <span key={tag} style={{
                  background:   '#EFF6FF',
                  color:        '#1D4ED8',
                  fontSize:     '11px',
                  fontWeight:   '600',
                  padding:      '4px 12px',
                  borderRadius: '100px',
                  border:       '1px solid #BFDBFE',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <h3 style={{
              fontSize:     '20px',
              fontWeight:   '700',
              color:        '#0A0A0A',
              marginBottom: '12px',
              fontFamily:   'Clash Display, sans-serif',
              lineHeight:   '1.3',
            }}>
              {post.title}
            </h3>

            <p style={{
              fontSize:     '14px',
              color:        '#64748B',
              lineHeight:   '1.7',
              marginBottom: '20px',
            }}>
              {post.excerpt}
            </p>

            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
            }}>
              <span style={{
                fontSize:   '12px',
                color:      '#64748B',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {new Date(post.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </span>
              <span style={{
                color:      '#2563EB',
                fontSize:   '14px',
                fontWeight: '600',
              }}>
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function Blog() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const headerRef = useScrollAnimation({ y: 30, duration: 0.8 })

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3)
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <section id="blog" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div ref={headerRef} style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'flex-end',
          marginBottom:   '64px',
          flexWrap:       'wrap',
          gap:            '24px',
        }}>
          <div>
            <p style={{
              fontSize:      '12px',
              letterSpacing: '0.2em',
              color:         '#2563EB',
              fontWeight:    '600',
              marginBottom:  '16px',
              textTransform: 'uppercase',
            }}>
              Blog
            </p>
            <h2 style={{
              fontSize:      'clamp(32px, 5vw, 56px)',
              fontWeight:    '700',
              letterSpacing: '-2px',
              color:         '#0A0A0A',
              fontFamily:    'Clash Display, sans-serif',
              lineHeight:    '1.1',
            }}>
              Thoughts &<br />
              <span style={{ color: '#2563EB' }}>writings.</span>
            </h2>
          </div>
          <Link href="/blog" style={{
            background:     '#0A0A0A',
            color:          '#FFFFFF',
            padding:        '14px 32px',
            borderRadius:   '100px',
            fontSize:       '14px',
            fontWeight:     '600',
            textDecoration: 'none',
            transition:     'background 0.2s',
            height:         'fit-content',
          }}
          onMouseEnter={e => e.target.style.background = '#2563EB'}
          onMouseLeave={e => e.target.style.background = '#0A0A0A'}
          >
            All Posts →
          </Link>
        </div>

        {loading ? (
          <p style={{ color: '#64748B', textAlign: 'center' }}>
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <p style={{ color: '#64748B', textAlign: 'center' }}>
            No posts yet. Write your first blog from the admin panel!
          </p>
        ) : (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap:                 '24px',
          }}>
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
