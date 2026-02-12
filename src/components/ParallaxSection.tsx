import { ReactNode } from 'react'
import ParallaxLayer from './ParallaxLayer'
import { ParallaxLayer as ParallaxLayerType } from '@/types'

interface ParallaxSectionProps {
  layers: ParallaxLayerType[];
  children?: ReactNode;
  className?: string;
  minHeight?: string;
}

export default function ParallaxSection({ 
  layers, 
  children, 
  className = '',
  minHeight = '100vh'
}: ParallaxSectionProps) {
  return (
    <section 
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* Parallax Layers */}
      {layers.map((layer) => (
        <ParallaxLayer
          key={layer.id}
          imageSrc={layer.imageSrc}
          speed={layer.speed}
          zIndex={layer.zIndex}
        />
      ))}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </section>
  )
}
