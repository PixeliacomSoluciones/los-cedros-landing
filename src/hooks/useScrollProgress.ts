import { useState, useEffect } from 'react'
import { ScrollState } from '@/types'

export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    direction: 'down',
    scrollY: 0,
  })

  useEffect(() => {
    let prevScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const progress = maxScroll > 0 ? scrollY / maxScroll : 0
          const direction = scrollY > prevScrollY ? 'down' : 'up'

          setScrollState({
            progress,
            direction,
            scrollY,
          })

          prevScrollY = scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollState
}
