import { AnimationProvider } from './providers/AnimationProvider'
import { ReducedMotionProvider } from './providers/ReducedMotionProvider'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import StickyScrollSection from './components/StickyScrollSection'
import ImmersiveGallery from './components/ImmersiveGallery'
import AmenitiesGrid from './components/AmenitiesGrid'
import Footer from './components/Footer'
import { heroContent, features, galleryImages, amenities, stickyImage } from './data/content'

function App() {
  return (
    <ReducedMotionProvider>
      <AnimationProvider>
        <div className="min-h-screen">
          <Navigation />
          <HeroSection {...heroContent} />
          <StickyScrollSection stickyImage={stickyImage} features={features} />
          <ImmersiveGallery images={galleryImages} />
          <AmenitiesGrid amenities={amenities} />
          <Footer />
        </div>
      </AnimationProvider>
    </ReducedMotionProvider>
  )
}

export default App
