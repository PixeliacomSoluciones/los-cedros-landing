import { useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface BackgroundMediaProps {
  mediaType: 'video' | 'image';
  mediaSrc: string;
  fallbackImage?: string;
}

export default function BackgroundMedia({ mediaType, mediaSrc, fallbackImage }: BackgroundMediaProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const reducedMotion = useReducedMotion()

  const handleError = () => {
    setHasError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  // If video fails or reduced motion is enabled, show image
  const shouldShowImage = mediaType === 'image' || hasError || reducedMotion

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {shouldShowImage ? (
        <div
          className={`
            absolute inset-0 w-full h-full bg-cover bg-center
            ${!reducedMotion ? 'animate-ken-burns' : ''}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-1000
          `}
          style={{
            backgroundImage: `url(${hasError && fallbackImage ? fallbackImage : mediaSrc})`,
          }}
          onLoad={handleLoad}
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          onError={handleError}
          onLoadedData={handleLoad}
          className={`
            absolute inset-0 w-full h-full object-cover
            ${!reducedMotion ? 'animate-ken-burns' : ''}
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-1000
          `}
        >
          <source src={mediaSrc} type="video/mp4" />
        </video>
      )}

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-luxury-charcoal animate-pulse" />
      )}
    </div>
  )
}
