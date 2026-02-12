import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAnimationConfig } from '@/providers/AnimationProvider'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface HeroSectionProps {
  mediaType: 'video' | 'image';
  mediaSrc: string;
  subtitle?: string;
}

export default function HeroSection({ mediaSrc, subtitle }: HeroSectionProps) {
  const { reducedMotion } = useAnimationConfig()
  const { scrollY } = useScrollProgress()
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionTop, setSectionTop] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)

  // Images for the gallery
  const images = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    mediaSrc,
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  ]

  // Calculate section position once
  useEffect(() => {
    const updatePosition = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setSectionTop(rect.top + window.scrollY)
      setSectionHeight(rect.height)
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  // Calculate scroll progress within section
  const scrollProgress = reducedMotion ? 0 : Math.max(0, Math.min(1, (scrollY - sectionTop) / (sectionHeight - window.innerHeight)))

  // Calculate transforms based on scroll progress
  const centerScale = 1 + (scrollProgress * 1.5)
  const sideScale = 1 - (scrollProgress * 0.7)
  const sideX = scrollProgress * 100
  const sideOpacity = 1 - scrollProgress
  const titleOpacity = 1 - (scrollProgress * 1.5)
  const titleY = -(scrollProgress * 50)

  return (
    <section ref={sectionRef} className="relative h-[150vh] w-full overflow-hidden bg-white">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        {/* Images Container */}
        <div className="relative w-full h-full flex items-center justify-center px-4 md:px-12">
          {/* Left Image */}
          <div
            className="absolute left-4 md:left-12 w-[25vw] md:w-[20vw] h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              transform: `scale(${sideScale}) translateX(-${sideX}px)`,
              opacity: sideOpacity,
              willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform, opacity' : 'auto',
            }}
          >
            <img
              src={images[0]}
              alt="Los Cedros Interior 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Image (Main) */}
          <div
            className="relative w-[45vw] md:w-[35vw] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl z-10"
            style={{
              transform: `scale(${centerScale})`,
              willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform' : 'auto',
            }}
          >
            <img
              src={images[1]}
              alt="Los Cedros Main"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Image */}
          <div
            className="absolute right-4 md:right-12 w-[25vw] md:w-[20vw] h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              transform: `scale(${sideScale}) translateX(${sideX}px)`,
              opacity: sideOpacity,
              willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform, opacity' : 'auto',
            }}
          >
            <img
              src={images[2]}
              alt="Los Cedros Interior 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            willChange: scrollProgress > 0 && scrollProgress < 1 ? 'transform, opacity' : 'auto',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[clamp(2rem,8vw,7rem)] font-display font-bold text-luxury-charcoal text-center leading-none mb-4"
          >
            URBANIZACIÓN<br />LOS CEDROS
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-luxury-charcoal/70 text-center max-w-2xl px-6"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-luxury-charcoal/70 text-sm uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-6 h-10 border-2 border-luxury-charcoal/30 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-luxury-charcoal/50 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
