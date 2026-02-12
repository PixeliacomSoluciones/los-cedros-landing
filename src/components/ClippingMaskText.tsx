import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ClippingMaskTextProps {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function ClippingMaskText({
  text,
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  className = '',
}: ClippingMaskTextProps) {
  const reducedMotion = useReducedMotion()

  // Split text into words and characters
  const words = text.split(' ')

  return (
    <div className={`flex flex-wrap justify-center gap-x-4 ${className}`}>
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="overflow-hidden inline-block">
          <div className="flex">
            {word.split('').map((char, charIndex) => {
              const totalDelay = delay + (wordIndex * words.length + charIndex) * stagger
              
              return (
                <div key={charIndex} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: reducedMotion ? 0 : '100%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      delay: reducedMotion ? 0 : totalDelay,
                      duration: reducedMotion ? 0 : duration,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
