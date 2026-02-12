# Los Cedros - Luxury Landing Page

Una landing page inmersiva y de alto nivel para Los Cedros, una urbanización privada de 116 casas exclusivas.

## 🚀 Tecnologías

- **React 18** + TypeScript
- **Framer Motion** - Animaciones declarativas
- **GSAP** - Animaciones de scroll complejas
- **Lenis** - Smooth scroll
- **Tailwind CSS** - Estilos utility-first
- **React Three Fiber** - Efectos 3D opcionales
- **Vite** - Build tool

## 📦 Instalación

Primero, asegúrate de tener Node.js instalado (versión 16 o superior).

```bash
# Instalar dependencias
npm install

# O si prefieres usar yarn
yarn install

# O si prefieres usar pnpm
pnpm install
```

## 🎯 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El sitio estará disponible en http://localhost:5173
```

## 🏗️ Build

```bash
# Crear build de producción
npm run build

# Preview del build
npm run preview
```

## ✨ Características

- ✨ **Animaciones de entrada coreografiadas** - Cada elemento tiene su momento
- 🎬 **Efecto parallax** con múltiples capas de profundidad
- 📌 **Sticky scroll section** - Imagen fija con texto desplazable
- 🎨 **Micro-interacciones** y efectos magnéticos en botones
- 🖼️ **Galería draggable** con física de inercia
- 🎭 **Clipping mask animations** para títulos
- ♿ **Accesibilidad** completa (prefers-reduced-motion)
- 📱 **Diseño responsive** para todos los dispositivos
- ⚡ **Optimizado para 60fps** con GPU acceleration

## 🎨 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── HeroSection.tsx
│   ├── Navigation.tsx
│   ├── StickyScrollSection.tsx
│   ├── ImmersiveGallery.tsx
│   ├── AmenitiesGrid.tsx
│   └── Footer.tsx
├── providers/          # Context providers
│   ├── ScrollProvider.tsx
│   ├── AnimationProvider.tsx
│   └── ReducedMotionProvider.tsx
├── hooks/             # Custom hooks
│   ├── useScrollProgress.ts
│   ├── useReducedMotion.ts
│   └── useMagneticEffect.ts
├── types/             # TypeScript types
├── data/              # Contenido estático
└── App.tsx            # Componente principal
```

## 🎯 Secciones

1. **Hero** - Pantalla completa con efecto Ken Burns
2. **Concepto** - Sticky scroll con características
3. **Galería** - Draggable con inercia
4. **Amenidades** - Grid con hover effects
5. **Footer** - CTA y formulario de contacto

## 🛠️ Personalización

Para personalizar el contenido, edita el archivo `src/data/content.ts`:

```typescript
export const heroContent = {
  mediaType: 'image',
  mediaSrc: 'tu-imagen.jpg',
  title: 'Tu Título',
  subtitle: 'Tu Subtítulo',
}
```

## 📝 Notas

- Las imágenes actuales son placeholders de Unsplash
- Reemplaza las URLs con tus propias imágenes
- El formulario de contacto simula el envío (conecta con tu backend)

## 🤝 Contribuir

Este proyecto fue creado como parte de una especificación de desarrollo guiado por IA.
