'use client'
import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current

    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = 
        document.documentElement.scrollHeight - window.innerHeight
      const progress     = (scrollTop / docHeight) * 100
      bar.style.width    = `${progress}%`
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position:   'fixed',
      top:        0,
      left:       0,
      height:     '3px',
      width:      '0%',
      background: 'linear-gradient(90deg, #2563EB, #60A5FA)',
      zIndex:     9997,
      transition: 'width 0.1s linear',
    }}
    ref={barRef}
    />
  )
}
