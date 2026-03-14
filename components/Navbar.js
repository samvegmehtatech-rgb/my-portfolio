'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Community', href: '#community' },
  { label: 'Life Feed', href: '#lifefeed' },
  { label: 'Blog', href: '/blog' },
  { label: 'Guestbook', href: '#guestbook' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(255,255,255,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid #E2E8F0'
          : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#0A0A0A',
        textDecoration: 'none',
        fontFamily: 'Clash Display, sans-serif',
        letterSpacing: '-0.5px',
      }}>
        SM<span style={{ color: '#2563EB' }}>.</span>
      </Link>

      {/* Desktop Links */}
      <div style={{
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
      }}
        className="hide-mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            style={{
              fontSize: '14px',
              color: '#64748B',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => e.target.style.color = '#0A0A0A'}
            onMouseLeave={e => e.target.style.color = '#64748B'}
          >
            {link.label}
          </Link>
        ))}
        <Link href="#contact" style={{
          background: '#0A0A0A',
          color: '#FFFFFF',
          padding: '10px 24px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: '500',
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          Hire Me
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
        }}
        className="show-mobile"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '16px',
                color: '#0A0A0A',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
