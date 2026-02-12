import { motion } from 'framer-motion'
import { Amenity } from '@/types'
import AmenityCard from './AmenityCard'

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <section id="amenidades" className="relative py-section bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display font-display text-luxury-charcoal mb-4"
          >
            Amenidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-luxury-charcoal/70 text-lg max-w-2xl mx-auto"
          >
            Diseñadas para elevar tu estilo de vida
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <AmenityCard key={amenity.id} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
