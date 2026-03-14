import './globals.css'
import SmoothScroll   from '../components/SmoothScroll'
import CustomCursor   from '../components/CustomCursor'
import ScrollProgress from '../components/ScrollProgress'
import Navbar         from '../components/Navbar'
import Footer         from '../components/Footer'
import ScrollToTop    from '../components/ScrollToTop'

export const metadata = {
  title:       'Samveg Mehta — Software Developer',
  description: 'Portfolio of Samveg Mehta, a Software Developer & IT Engineer based in Gujarat, India. Building scalable web applications and contributing to community.',
  keywords:    'software developer, engineer, Gujarat, React, Next.js, MERN, Django, portfolio, Samveg Mehta',
  authors:     [{ name: 'Samveg Mehta' }],
  creator:     'Samveg Mehta',

  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://samvegmehta.vercel.app',
    title:       'Samveg Mehta — Software Developer',
    description: 'Software Developer based in Gujarat, India. Enthusiastic IT student with a keen interest in software development.',
    siteName:    'Samveg Mehta Portfolio',
    images: [{
      url:    'https://samvegmehta.vercel.app/og-image.png',
      width:  1200,
      height: 630,
      alt:    'Samveg Mehta — Software Developer Portfolio',
    }],
  },

  // Twitter card
  twitter: {
    card:        'summary_large_image',
    title:       'Samveg Mehta — Software Developer',
    description: 'Software Developer based in Gujarat, India.',
    images:      ['https://samvegmehta.vercel.app/og-image.png'],
  },

  // Robots — allow Google to index
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-image-preview': 'large',
    },
  },

  // Favicon
  icons: {
    icon:   '/favicon.ico',
    apple:  '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  )
}
