import { RefObject, useEffect, useState, useRef } from 'react'

interface MagneticPosition {
  x: number;
  y: number;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  strength: number = 0.3
): MagneticPosition {
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Throttle with RAF
      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

        // Only apply magnetic effect within 100px
        if (distance < 100) {
          setPosition({
            x: deltaX * strength,
            y: deltaY * strength,
          })
        } else {
          setPosition({ x: 0, y: 0 })
        }
      })
    }

    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      setPosition({ x: 0, y: 0 })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, strength])

  return position
}
