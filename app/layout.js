import './globals.css'
import SmoothScroll   from '../components/SmoothScroll'
import CustomCursor   from '../components/CustomCursor'
import ScrollProgress from '../components/ScrollProgress'
import Navbar         from '../components/Navbar'
import Footer         from '../components/Footer'

export const metadata = {
  title:       'Your Name — Software Developer',
  description: 'Portfolio of Your Name, Software Developer & Engineer based in Mumbai.',
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
        </SmoothScroll>
      </body>
    </html>
  )
}
