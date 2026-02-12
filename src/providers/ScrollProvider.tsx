import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'
import { ScrollState } from '@/types'

interface ScrollContextValue extends ScrollState {
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    direction: 'down',
    scrollY: 0,
  })
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenis(lenisInstance)

    let prevScrollY = 0
    let rafId: number
    let ticking = false

    function raf(time: number) {
      lenisInstance.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    lenisInstance.on('scroll', ({ scroll }: { scroll: number }) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight
          const progress = maxScroll > 0 ? scroll / maxScroll : 0
          const direction = scroll > prevScrollY ? 'down' : 'up'

          setScrollState({
            progress,
            direction,
            scrollY: scroll,
          })

          prevScrollY = scroll
          ticking = false
        })
        ticking = true
      }
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance.destroy()
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ ...scrollState, lenis }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within ScrollProvider')
  }
  return context
}
