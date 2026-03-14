'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(el,
      {
        opacity:   0,
        y:         options.y         ?? 50,
        scale:     options.scale     ?? 1,
        x:         options.x         ?? 0,
      },
      {
        opacity:   1,
        y:         0,
        scale:     1,
        x:         0,
        duration:  options.duration  ?? 0.8,
        delay:     options.delay     ?? 0,
        ease:      options.ease      ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start:   options.start    ?? 'top 85%',
          end:     options.end      ?? 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return ref
}
