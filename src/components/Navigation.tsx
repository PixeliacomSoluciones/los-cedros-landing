import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useMemo } from 'react'

export default function Navigation() {
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScrollProgress()
  
  // Memoize to prevent re-renders on every pixel scroll
  const isScrolled = useMemo(() => scrollY > 50, [scrollY > 50])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reducedMotion ? 0 : 1, // Appears after 1 second
        duration: reducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      }}
      className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6
        transition-all duration-300
        ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl md:text-3xl font-display font-semibold"
        >
          <span className={isScrolled ? 'text-luxury-charcoal' : 'text-white'}>
            Los Cedros
          </span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Concepto', 'Galería', 'Amenidades', 'Contacto'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ scale: 1.05 }}
              className={`
                text-sm uppercase tracking-wider font-medium
                transition-colors duration-300
                ${isScrolled ? 'text-luxury-charcoal hover:text-luxury-gold' : 'text-white hover:text-luxury-gold-light'}
              `}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-6 py-2 rounded-full text-sm uppercase tracking-wider font-medium
            transition-all duration-300
            ${isScrolled 
              ? 'bg-luxury-gold text-white hover:bg-luxury-gold-light' 
              : 'bg-white text-luxury-charcoal hover:bg-luxury-cream'
            }
          `}
        >
          Agendar Visita
        </motion.button>
      </div>
    </motion.nav>
  )
}
