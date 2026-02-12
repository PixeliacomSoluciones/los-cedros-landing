import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ParallaxLayerProps {
  imageSrc: string;
  speed: number; // 0.0 (fixed) to 1.0 (normal scroll)
  zIndex: number;
  className?: string;
  children?: React.ReactNode;
}

export default function ParallaxLayer({ 
  imageSrc, 
  speed, 
  zIndex, 
  className = '',
  children 
}: ParallaxLayerProps) {
  const { scrollY } = useScrollProgress()
  const reducedMotion = useReducedMotion()
  const [translateY, setTranslateY] = useState(0)
  const layerRef = useRef<HTMLDivElement>(null)
  const elementTopRef = useRef<number>(0)
  const isInViewportRef = useRef(false)

  // Calculate element position once on mount and resize
  useEffect(() => {
    const updateElementPosition = () => {
      if (!layerRef.current) return
      const rect = layerRef.current.getBoundingClientRect()
      elementTopRef.current = rect.top + window.scrollY
    }

    updateElementPosition()
    window.addEventListener('resize', updateElementPosition)
    
    return () => {
      window.removeEventListener('resize', updateElementPosition)
    }
  }, [])

  // Use Intersection Observer for viewport detection
  useEffect(() => {
    if (!layerRef.current || reducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewportRef.current = entry.isIntersecting
        })
      },
      { rootMargin: '100px' }
    )

    observer.observe(layerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [reducedMotion])

  // Update parallax position only when scrollY changes and element is in viewport
  useEffect(() => {
    if (reducedMotion) {
      setTranslateY(0)
      return
    }

    if (!isInViewportRef.current) return

    const offset = (scrollY - elementTopRef.current) * (1 - speed)
    setTranslateY(offset)
  }, [scrollY, speed, reducedMotion])

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        zIndex,
        transform: `translateY(${translateY}px) translateZ(0)`,
        backfaceVisibility: 'hidden',
        willChange: isInViewportRef.current ? 'transform' : 'auto',
      }}
    >
      {imageSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      )}
      {children}
    </div>
  )
}
