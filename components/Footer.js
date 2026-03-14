'use client'
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop:      '1px solid #E2E8F0',
      padding:        '40px',
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      background:     '#FFFFFF',
    }}>
      <p style={{
        fontSize: '14px',
        color:    '#64748B',
      }}>
        © {year} Your Name. Built with passion in Mumbai.
      </p>
      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: 'GitHub',   href: 'https://github.com/yourusername'        },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername'   },
          { label: 'Email',    href: 'mailto:your@email.com'                  },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize:       '14px',
              color:          '#64748B',
              textDecoration: 'none',
              transition:     'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#2563EB'}
            onMouseLeave={e => e.target.style.color = '#64748B'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
