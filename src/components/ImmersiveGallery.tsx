import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ImmersiveGalleryProps {
  images: GalleryImage[];
}

export default function ImmersiveGallery({ images }: ImmersiveGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [imageWidth, setImageWidth] = useState(window.innerWidth * 0.7)
  const reducedMotion = useReducedMotion()
  
  const x = useMotionValue(0)
  const velocity = useRef(0)
  const lastX = useRef(0)
  const lastTime = useRef(Date.now())
  const animationFrame = useRef<number>()

  // Update image width on resize
  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth * 0.7)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const springConfig = { damping: 30, stiffness: 200 }
  const xSpring = useSpring(x, springConfig)

  // Inertia physics
  useEffect(() => {
    if (isDragging || reducedMotion) return

    const friction = 0.92
    const snapThreshold = 0.5

    const updateInertia = () => {
      velocity.current *= friction
      const currentX = x.get()
      x.set(currentX + velocity.current)

      if (Math.abs(velocity.current) > snapThreshold) {
        animationFrame.current = requestAnimationFrame(updateInertia)
      } else {
        // Snap to nearest image
        const nearestIndex = Math.round(-currentX / imageWidth)
        const clampedIndex = Math.max(0, Math.min(images.length - 1, nearestIndex))
        setCurrentIndex(clampedIndex)
        x.set(-clampedIndex * imageWidth)
      }
    }

    if (Math.abs(velocity.current) > snapThreshold) {
      animationFrame.current = requestAnimationFrame(updateInertia)
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [isDragging, x, images.length, reducedMotion, imageWidth])

  const handleDragStart = () => {
    setIsDragging(true)
    lastX.current = x.get()
    lastTime.current = Date.now()
  }

  const handleDrag = () => {
    const currentX = x.get()
    const currentTime = Date.now()
    const deltaX = currentX - lastX.current
    const deltaTime = currentTime - lastTime.current

    if (deltaTime > 0) {
      velocity.current = deltaX / deltaTime * 16 // Normalize to 60fps
    }

    lastX.current = currentX
    lastTime.current = currentTime
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <section id="galería" className="relative py-section bg-luxury-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display font-display text-white text-center mb-4"
        >
          Galería
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-center text-lg"
        >
          Arrastra para explorar
        </motion.p>
      </div>

      {/* Gallery Container */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <motion.div
          drag="x"
          dragConstraints={{ left: -(images.length - 1) * imageWidth, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x: xSpring }}
          className={`
            flex gap-8 h-full px-[15vw]
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          `}
        >
          {images.map((image, index) => {
            const isActive = index === currentIndex
            const distance = Math.abs(index - currentIndex)

            return (
              <motion.div
                key={image.id}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: distance > 1 ? 0.3 : isActive ? 1 : 0.6,
                  rotateY: isDragging ? (index - currentIndex) * 5 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="relative flex-shrink-0 w-[70vw] md:w-[50vw] h-full rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
                
                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-lg">{image.caption}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              x.set(-index * imageWidth)
            }}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === currentIndex ? 'bg-luxury-gold w-8' : 'bg-white/30'}
            `}
          />
        ))}
      </div>
    </section>
  )
}
