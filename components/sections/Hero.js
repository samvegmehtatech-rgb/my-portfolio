'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const ROLES = [
  'Software Developer',
  'Problem Solver',
  'Community Builder',
  'Open Source Contributor',
]

export default function Hero() {
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1))
      }, 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(nameRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power4.out' }
    )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )
  }, [])

  // Bounce animation for scroll arrow
  useEffect(() => {
    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '120px 40px 80px',
      position: 'relative',
      overflow: 'hidden',
      background: '#FFFFFF',
    }}>

      {/* Animated gradient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, 
            rgba(37,99,235,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 60%, 
            rgba(37,99,235,0.04) 0%, transparent 60%)
        `,
        animation: 'gradientShift 8s ease-in-out infinite alternate',
        zIndex: 0,
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>

        {/* Live Badge */}
        {/* <div ref={badgeRef} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: '100px',
          padding: '8px 20px',
          marginBottom: '32px',
          fontSize: '13px',
          color: '#166534',
          fontWeight: '500',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22C55E',
            display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          Currently building at Example Corp
        </div> */}

        {/* Main Name */}
        <div ref={nameRef} style={{ overflow: 'hidden' }}>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: '700',
            letterSpacing: '-3px',
            lineHeight: '1',
            color: '#0A0A0A',
            fontFamily: 'Clash Display, sans-serif',
            marginBottom: '24px',
          }}>
            Hi, I am<br />
            <span style={{ color: '#2563EB' }}>
              Samveg Mehta
            </span>
          </h1>
        </div>

        {/* Typewriter Role */}
        <div ref={subtitleRef} style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          color: '#64748B',
          marginBottom: '48px',
          minHeight: '40px',
          fontWeight: '400',
        }}>
          I am a{' '}
          <span style={{
            color: '#2563EB',
            fontWeight: '600',
            borderRight: '2px solid #2563EB',
            paddingRight: '4px',
          }}>
            {displayed}
          </span>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '80px',
        }}>
          <a href="#projects" style={{
            background: '#0A0A0A',
            color: '#FFFFFF',
            padding: '16px 40px',
            borderRadius: '100px',
            fontSize: '15px',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            letterSpacing: '0.01em',
          }}
            onMouseEnter={e => {
              e.target.style.background = '#2563EB'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.target.style.background = '#0A0A0A'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            View My Work
          </a>
          <a href="/cv.pdf" download style={{
            background: 'transparent',
            color: '#0A0A0A',
            padding: '16px 40px',
            borderRadius: '100px',
            fontSize: '15px',
            fontWeight: '600',
            textDecoration: 'none',
            border: '1.5px solid #E2E8F0',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => {
              e.target.style.borderColor = '#0A0A0A'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = '#E2E8F0'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Download CV
          </a>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '32px 0',
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '64px',
        }}>
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '10+', label: 'Projects Built' },
            { number: '5+', label: 'Community Events' },
            { number: '3+', label: 'Open Source Contrib' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: '700',
                color: '#0A0A0A',
                fontFamily: 'Clash Display, sans-serif',
                letterSpacing: '-1px',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#64748B',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Arrow */}
      <div ref={scrollRef} style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        color: '#64748B',
        fontSize: '12px',
        letterSpacing: '0.1em',
      }}>
        <span>SCROLL</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <path d="M8 0v20M1 13l7 7 7-7"
            stroke="#64748B" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes gradientShift {
          0%   { transform: scale(1)    rotate(0deg);   }
          100% { transform: scale(1.1)  rotate(3deg);   }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1;   transform: scale(1);    }
          50%       { opacity: 0.5; transform: scale(1.2);  }
        }
      `}</style>
    </section>
  )
}
