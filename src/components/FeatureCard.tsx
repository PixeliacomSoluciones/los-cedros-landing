import { motion } from 'framer-motion'
import { Feature } from '@/types'
import { useAnimationConfig } from '@/providers/AnimationProvider'

interface FeatureCardProps {
  feature: Feature;
  isActive: boolean;
  index: number;
}

export default function FeatureCard({ feature, isActive, index }: FeatureCardProps) {
  const { entranceDuration, staggerDelay } = useAnimationConfig()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: entranceDuration / 1000,
        delay: index * (staggerDelay / 1000),
        ease: 'easeOut',
      }}
      className={`
        relative p-8 md:p-12 rounded-2xl
        transition-all duration-300 ease-out
        ${isActive 
          ? 'bg-white shadow-2xl scale-105' 
          : 'bg-white/50 shadow-lg scale-100'
        }
      `}
    >
      {/* Icon */}
      {feature.icon && (
        <motion.div
          animate={{
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center">
            <span className="text-3xl">{feature.icon}</span>
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.h3
        animate={{
          color: isActive ? '#B8956A' : '#2C2C2C',
        }}
        transition={{ duration: 0.3 }}
        className="text-heading font-display font-semibold mb-4"
      >
        {feature.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        animate={{
          opacity: isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.3 }}
        className="text-lg text-luxury-charcoal/80 leading-relaxed"
      >
        {feature.description}
      </motion.p>

      {/* Active Indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-1 bg-luxury-gold origin-left"
        style={{ width: '100%' }}
      />
    </motion.div>
  )
}
