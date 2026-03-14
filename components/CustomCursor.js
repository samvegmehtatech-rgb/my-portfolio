'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    let mouseX = 0
    let mouseY = 0
    let ringX  = 0
    let ringY  = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows cursor instantly
      dot.style.transform = 
        `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    // Ring follows with smooth lag
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      ring.style.transform = 
        `translate(${ringX - 20}px, ${ringY - 20}px)`

      requestAnimationFrame(animate)
    }

    // Grow ring on hoverable elements
    const onMouseEnter = () => {
      ring.style.width  = '50px'
      ring.style.height = '50px'
      ring.style.borderColor = '#2563EB'
      dot.style.opacity = '0'
    }

    const onMouseLeave = () => {
      ring.style.width  = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = '#0A0A0A'
      dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove)
    animate()

    // Apply hover effect to all links and buttons
    const hoverables = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    )
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        style={{
          position:        'fixed',
          width:           '8px',
          height:          '8px',
          backgroundColor: '#2563EB',
          borderRadius:    '50%',
          pointerEvents:   'none',
          zIndex:          9999,
          transition:      'opacity 0.2s',
          top:             0,
          left:            0,
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position:     'fixed',
          width:        '40px',
          height:       '40px',
          border:       '1.5px solid #0A0A0A',
          borderRadius: '50%',
          pointerEvents:'none',
          zIndex:       9998,
          transition:   'width 0.3s, height 0.3s, border-color 0.3s',
          top:          0,
          left:         0,
        }}
      />
    </>
  )
}
