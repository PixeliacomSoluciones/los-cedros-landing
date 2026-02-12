export interface ScrollState {
  progress: number; // 0.0 to 1.0
  direction: 'up' | 'down';
  scrollY: number;
}

export interface AnimationConfig {
  reducedMotion: boolean;
  parallaxEnabled: boolean;
  kenBurnsSpeed: number;
  entranceDuration: number;
  staggerDelay: number;
  magneticStrength: number;
}

export interface ParallaxLayer {
  id: string;
  imageSrc: string;
  speed: number; // 0.0 (fixed) to 1.0 (normal scroll)
  zIndex: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
}
