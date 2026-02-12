import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Feature } from '@/types'
import FeatureCard from './FeatureCard'

interface StickyScrollSectionProps {
  stickyImage: string;
  features: Feature[];
  layout?: 'image-left' | 'image-right';
}

export default function StickyScrollSection({ 
  stickyImage, 
  features, 
  layout = 'image-right' 
}: StickyScrollSectionProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveFeature(entry.target.id)
          }
        })
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: '-40% 0px -40% 0px', // Center detection
      }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    const observer = observerRef.current
    if (!observer) return

    const featureElements = document.querySelectorAll('[data-feature]')
    featureElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      featureElements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [features])

  return (
    <section id="concepto" className="relative bg-luxury-cream py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`
          grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20
          ${layout === 'image-left' ? 'lg:grid-flow-dense' : ''}
        `}>
          {/* Sticky Image */}
          <div className={`
            relative lg:sticky lg:top-[10vh] lg:h-[80vh]
            ${layout === 'image-left' ? 'lg:col-start-1' : 'lg:col-start-2'}
          `}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="relative h-[50vh] lg:h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={stickyImage}
                alt="Los Cedros House"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Scrolling Features */}
          <div className={`
            space-y-[100vh]
            ${layout === 'image-left' ? 'lg:col-start-2' : 'lg:col-start-1'}
          `}>
            {features.map((feature, index) => (
              <div
                key={feature.id}
                id={feature.id}
                data-feature
                className="min-h-screen flex items-center"
              >
                <FeatureCard
                  feature={feature}
                  isActive={activeFeature === feature.id}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
