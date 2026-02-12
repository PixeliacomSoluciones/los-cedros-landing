import { Feature, GalleryImage, Amenity, ParallaxLayer } from '@/types'

export const heroContent = {
  mediaType: 'image' as const,
  mediaSrc: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  title: 'Los Cedros',
  subtitle: '116 Casas Exclusivas de Lujo',
}

export const features: Feature[] = [
  {
    id: 'security',
    title: 'Seguridad Total',
    description: 'Urbanización privada con vigilancia 24/7, control de acceso biométrico y sistema de monitoreo inteligente. Tu tranquilidad y la de tu familia son nuestra prioridad absoluta.',
    icon: '🛡️',
  },
  {
    id: 'finishes',
    title: 'Acabados Premium',
    description: 'Materiales de primera calidad seleccionados cuidadosamente. Pisos de mármol italiano, cocinas europeas equipadas, domótica integrada y diseño arquitectónico contemporáneo.',
    icon: '✨',
  },
  {
    id: 'environment',
    title: 'Entorno Natural',
    description: 'Rodeado de áreas verdes y espacios diseñados para el bienestar. Senderos peatonales, jardines paisajísticos y vistas panorámicas que conectan con la naturaleza.',
    icon: '🌳',
  },
]

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    alt: 'Fachada principal Los Cedros',
    caption: 'Arquitectura contemporánea',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    alt: 'Interior sala de estar',
    caption: 'Espacios amplios y luminosos',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    alt: 'Cocina moderna',
    caption: 'Cocinas equipadas de lujo',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
    alt: 'Dormitorio principal',
    caption: 'Confort y elegancia',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    alt: 'Jardín privado',
    caption: 'Espacios exteriores únicos',
  },
]

export const amenities: Amenity[] = [
  {
    id: 'pool',
    title: 'Piscina',
    description: 'Piscina semi-olímpica climatizada con área de descanso y jacuzzi.',
    icon: '🏊',
    backgroundImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
  },
  {
    id: 'security',
    title: 'Seguridad',
    description: 'Sistema de vigilancia 24/7 con tecnología de última generación.',
    icon: '🔒',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 'gym',
    title: 'Gimnasio',
    description: 'Centro fitness completamente equipado con entrenadores personales.',
    icon: '💪',
    backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    id: 'club',
    title: 'Club House',
    description: 'Salón de eventos y área social para reuniones exclusivas.',
    icon: '🏛️',
    backgroundImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  },
  {
    id: 'playground',
    title: 'Área Infantil',
    description: 'Parque de juegos seguro y moderno para los más pequeños.',
    icon: '🎪',
    backgroundImage: 'https://images.unsplash.com/photo-1587616211892-e5e9b817e4f7?w=800&q=80',
  },
  {
    id: 'green',
    title: 'Áreas Verdes',
    description: 'Jardines paisajísticos y senderos para caminar y relajarse.',
    icon: '🌿',
    backgroundImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  },
]

export const parallaxLayers: ParallaxLayer[] = [
  {
    id: 'background',
    imageSrc: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    speed: 0.3,
    zIndex: 1,
  },
  {
    id: 'midground',
    imageSrc: '',
    speed: 0.6,
    zIndex: 2,
  },
  {
    id: 'foreground',
    imageSrc: '',
    speed: 1.0,
    zIndex: 3,
  },
]

export const stickyImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
