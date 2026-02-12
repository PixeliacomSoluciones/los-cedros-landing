import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Amenity } from '@/types'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { useAnimationConfig } from '@/providers/AnimationProvider'

interface AmenityCardProps {
  amenity: Amenity;
  index: number;
}

export default function AmenityCard({ amenity, index }: AmenityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { x, y } = useMagneticEffect(cardRef, 0.15)
  const { staggerDelay, entranceDuration } = useAnimationConfig()

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: entranceDuration / 1000,
        delay: index * (staggerDelay / 1000),
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.05,
      }}
      style={{
        x,
        y,
      }}
      className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background Image (revealed on hover) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${amenity.backgroundImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-luxury-sand group-hover:from-luxury-gold/20 group-hover:via-white/90 group-hover:to-luxury-gold/30 transition-all duration-400" />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="w-16 h-16 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 flex items-center justify-center transition-colors duration-400"
        >
          <span className="text-4xl">{amenity.icon}</span>
        </motion.div>

        {/* Text */}
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-luxury-charcoal group-hover:text-luxury-gold transition-colors duration-300 mb-3">
            {amenity.title}
          </h3>
          <p className="text-luxury-charcoal/70 group-hover:text-luxury-charcoal transition-colors duration-300 leading-relaxed">
            {amenity.description}
          </p>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 shadow-[0_20px_60px_rgba(184,149,106,0.15)] pointer-events-none"
      />
    </motion.div>
  )
}
