'use client'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollTop}
      style={{
        position:       'fixed',
        bottom:         '32px',
        right:          '32px',
        width:          '48px',
        height:         '48px',
        borderRadius:   '50%',
        background:     '#0A0A0A',
        color:          '#FFFFFF',
        border:         'none',
        fontSize:       '20px',
        cursor:         'pointer',
        zIndex:         999,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        boxShadow:      '0 8px 32px rgba(0,0,0,0.2)',
        transition:     'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = '#2563EB'
        e.currentTarget.style.transform   = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background  = '#0A0A0A'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      ↑
    </button>
  )
}
