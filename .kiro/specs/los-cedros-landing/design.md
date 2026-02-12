# Design Document: Los Cedros Luxury Landing Page

## Overview

The Los Cedros landing page is a single-page React application that delivers an immersive, award-winning digital experience through advanced animations, scroll-based interactions, and micro-interactions. The architecture prioritizes performance, maintainability, and visual excellence.

### Technology Stack Decision

**Core Framework:** React 18+ with TypeScript
- Component-based architecture for maintainability
- TypeScript for type safety and developer experience
- Hooks for state management and lifecycle

**Animation Libraries:**
- **Framer Motion**: Primary animation engine for entrance animations, scroll-triggered animations, and layout animations
- **GSAP (GreenSock)**: Advanced scroll-based animations, parallax effects, and complex timeline orchestration
- **React Three Fiber + Three.js**: Optional 3D elements and WebGL effects
- **Lenis**: Smooth scroll library for buttery-smooth scrolling experience

**Styling:**
- **Tailwind CSS**: Utility-first styling with custom luxury design tokens
- **CSS Modules**: Component-scoped styles for complex animations

**Performance:**
- **Vite**: Fast build tool with optimized bundling
- **React Lazy + Suspense**: Code splitting for route and component-level lazy loading
- **Sharp/Next Image**: Image optimization pipeline

### Design Rationale

This stack combines the best tools for different animation needs:
- Framer Motion excels at React-native animations with declarative syntax
- GSAP provides unmatched performance for complex scroll animations
- Lenis ensures smooth, momentum-based scrolling
- React Three Fiber enables optional 3D enhancements without complexity

## Architecture

### Component Hierarchy

```
App
├── ScrollProvider (Lenis smooth scroll context)
├── AnimationProvider (Global animation state)
├── Navigation
│   └── NavBar (sticky, animated)
├── HeroSection
│   ├── BackgroundMedia (video/image with Ken Burns)
│   ├── HeroTitle (clipping mask animation)
│   └── ScrollIndicator
├── ProjectNarrative (sticky scroll section)
│   ├── StickyImage (fixed house render)
│   └── ScrollingFeatures
│       ├── SecurityFeature
│       ├── FinishesFeature
│       └── EnvironmentFeature
├── ParallaxSection
│   ├── ParallaxLayer (background)
│   ├── ParallaxLayer (midground)
│   └── ParallaxLayer (foreground)
├── ImmersiveGallery
│   ├── DraggableContainer
│   └── GalleryImage[] (with inertia)
├── AmenitiesGrid
│   └── AmenityCard[] (hover effects)
├── Footer
│   ├── CTAHeading
│   └── ContactForm
└── ReducedMotionProvider (accessibility)
```

### State Management

**Global State:**
- Scroll position and direction (via Lenis)
- Current active section (for navigation highlighting)
- Reduced motion preference (from media query)
- Loading state for assets

**Local State:**
- Gallery drag position and velocity
- Hovered amenity card
- Form input values
- Video playback state

### Animation Architecture

**Scroll-Triggered Animations:**
```typescript
// Using GSAP ScrollTrigger for complex scroll animations
ScrollTrigger.create({
  trigger: element,
  start: "top 80%",
  end: "bottom 20%",
  onEnter: () => animateIn(),
  onLeave: () => animateOut(),
  scrub: true // for parallax
});
```

**Entrance Animations:**
```typescript
// Using Framer Motion for declarative entrance animations
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

**Micro-Interactions:**
```typescript
// Magnetic effect using mouse position tracking
const { x, y } = useMousePosition();
const magneticX = (x - elementCenter.x) * 0.3;
const magneticY = (y - elementCenter.y) * 0.3;
```

## Components and Interfaces

### Core Components

#### 1. HeroSection Component

**Purpose:** Full-screen opening section with background media and animated title

**Props:**
```typescript
interface HeroSectionProps {
  mediaType: 'video' | 'image';
  mediaSrc: string;
  title: string;
  subtitle?: string;
}
```

**Behavior:**
- Renders full viewport height (100vh)
- Applies Ken Burns effect to background media (slow zoom from scale 1.0 to 1.1 over 20s)
- Animates title with clipping mask (text rises from y: 100% to y: 0%)
- Delays navigation appearance by 1000ms
- Includes scroll indicator with bounce animation

**Animation Timeline:**
1. 0ms: Background media starts Ken Burns effect
2. 500ms: Title clipping mask animation begins (1200ms duration)
3. 1000ms: Navigation fades in (600ms duration)
4. 1500ms: Subtitle fades in (600ms duration)
5. 2000ms: Scroll indicator appears with bounce

#### 2. ParallaxSection Component

**Purpose:** Creates depth through differential scroll speeds

**Props:**
```typescript
interface ParallaxSectionProps {
  layers: ParallaxLayer[];
  children: React.ReactNode;
}

interface ParallaxLayer {
  id: string;
  imageSrc: string;
  speed: number; // 0.0 (fixed) to 1.0 (normal scroll)
  zIndex: number;
}
```

**Behavior:**
- Tracks scroll position using Lenis
- Applies transform: translateY based on scroll * (1 - speed)
- Background layer: speed 0.3 (slow)
- Midground layer: speed 0.6 (medium)
- Foreground layer: speed 1.0 (normal)
- Uses CSS transform for GPU acceleration
- Respects prefers-reduced-motion (sets all speeds to 1.0)

**Performance Optimization:**
- Uses `will-change: transform` on parallax layers
- Throttles scroll calculations to 60fps using requestAnimationFrame
- Lazy loads background images

#### 3. StickyScrollSection Component

**Purpose:** Keeps house image fixed while features scroll beside it

**Props:**
```typescript
interface StickyScrollSectionProps {
  stickyImage: string;
  features: Feature[];
  layout: 'image-left' | 'image-right';
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}
```

**Behavior:**
- Uses CSS `position: sticky` for image container
- Image container: `position: sticky; top: 10vh; height: 80vh`
- Features container: scrolls normally with padding to create scroll distance
- Each feature: min-height of 100vh for proper scroll pacing
- Active feature detection: highlights feature when in viewport center
- Smooth transitions between active states (300ms ease-out)

**Layout:**
```
Desktop (> 1024px):
[Sticky Image 50%] [Scrolling Features 50%]

Tablet (768px - 1024px):
[Sticky Image 40%] [Scrolling Features 60%]

Mobile (< 768px):
[Image (not sticky)]
[Feature 1]
[Feature 2]
[Feature 3]
```

#### 4. ImmersiveGallery Component

**Purpose:** Draggable gallery with inertia and smooth transitions

**Props:**
```typescript
interface ImmersiveGalleryProps {
  images: GalleryImage[];
  autoPlayInterval?: number;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}
```

**Behavior:**
- Implements custom drag handler with mouse/touch events
- Calculates velocity during drag: `velocity = (currentX - previousX) / deltaTime`
- On release: continues movement with decay `position += velocity * 0.95` per frame
- Applies subtle 3D perspective transform during drag: `rotateY(dragDelta * 0.05deg)`
- Snaps to nearest image when velocity drops below threshold
- Cursor changes to grab/grabbing during interaction

**Physics:**
```typescript
const friction = 0.92; // Decay rate
const snapThreshold = 0.5; // Velocity threshold for snapping

function updateInertia() {
  velocity *= friction;
  position += velocity;
  
  if (Math.abs(velocity) < snapThreshold) {
    snapToNearest();
  }
}
```

**Visual Effects:**
- Images scale slightly on drag (scale: 0.98)
- Adjacent images have reduced opacity (0.6)
- Active image: opacity 1.0, scale 1.0
- Smooth transitions using cubic-bezier(0.4, 0.0, 0.2, 1)

#### 5. AmenityCard Component

**Purpose:** Interactive card with hover expansion and background reveal

**Props:**
```typescript
interface AmenityCardProps {
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
  hoverColor?: string;
}
```

**Behavior:**
- Default state: white background, icon, title visible
- Hover state: expands by 5% (scale: 1.05), reveals background image with overlay
- Background image fades in with opacity transition (0 → 0.3 over 400ms)
- Text color inverts for contrast (dark → light)
- Applies subtle glow effect: `box-shadow: 0 20px 60px rgba(0,0,0,0.15)`
- Magnetic effect: card moves toward cursor by max 10px

**Animation Timing:**
```typescript
transition: {
  scale: { duration: 0.4, ease: "easeOut" },
  backgroundColor: { duration: 0.4 },
  boxShadow: { duration: 0.4 }
}
```

#### 6. MagneticButton Component

**Purpose:** Button with magnetic effect and shine animation

**Props:**
```typescript
interface MagneticButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary';
  magneticStrength?: number; // 0.0 to 1.0, default 0.3
}
```

**Behavior:**
- Tracks mouse position relative to button center
- Applies transform based on distance: `translate(deltaX * strength, deltaY * strength)`
- Max magnetic distance: 100px from button center
- On hover: applies gradient shine effect moving from left to right
- Shine animation: 1.5s duration, infinite loop
- On click: brief scale down (0.95) then spring back

**Shine Effect:**
```css
background: linear-gradient(
  90deg,
  transparent 0%,
  rgba(255,255,255,0.3) 50%,
  transparent 100%
);
animation: shine 1.5s infinite;
```

#### 7. ClippingMaskText Component

**Purpose:** Text animation where characters rise from below a mask

**Props:**
```typescript
interface ClippingMaskTextProps {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number; // Delay between characters
}
```

**Behavior:**
- Wraps each character in a span with overflow: hidden parent
- Initial state: characters at translateY(100%)
- Animates to: translateY(0%)
- Staggers animation across characters (50ms delay between each)
- Uses cubic-bezier(0.65, 0, 0.35, 1) for smooth easing

**Implementation:**
```typescript
{text.split('').map((char, i) => (
  <motion.span
    key={i}
    initial={{ y: '100%' }}
    animate={{ y: '0%' }}
    transition={{
      delay: delay + (i * stagger),
      duration: duration,
      ease: [0.65, 0, 0.35, 1]
    }}
  >
    {char}
  </motion.span>
))}
```

#### 8. ContactForm Component

**Purpose:** Minimalist form with elegant focus animations

**Props:**
```typescript
interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
```

**Behavior:**
- Floating label design: label moves up on focus/fill
- Input underline expands from center on focus (width: 0% → 100%)
- Validation feedback appears smoothly below inputs
- Submit button disabled until form valid
- Loading state during submission with spinner
- Success/error messages fade in below form

**Focus Animation:**
```typescript
<motion.div
  className="input-underline"
  initial={{ scaleX: 0 }}
  animate={{ scaleX: isFocused ? 1 : 0 }}
  transition={{ duration: 0.3 }}
/>
```

### Utility Hooks

#### useScrollProgress

**Purpose:** Track scroll progress through the page

```typescript
function useScrollProgress(): {
  progress: number; // 0.0 to 1.0
  direction: 'up' | 'down';
  scrollY: number;
}
```

#### useReducedMotion

**Purpose:** Detect user's motion preference

```typescript
function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  
  return prefersReducedMotion;
}
```

#### useMagneticEffect

**Purpose:** Create magnetic effect for interactive elements

```typescript
function useMagneticEffect(
  ref: RefObject<HTMLElement>,
  strength: number = 0.3
): { x: number; y: number } {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      
      if (distance < 100) {
        setPosition({
          x: deltaX * strength,
          y: deltaY * strength
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', () => setPosition({ x: 0, y: 0 }));
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref, strength]);
  
  return position;
}
```

## Data Models

### Page Content Model

```typescript
interface PageContent {
  hero: HeroContent;
  narrative: NarrativeContent;
  gallery: GalleryContent;
  amenities: AmenitiesContent;
  footer: FooterContent;
}

interface HeroContent {
  mediaType: 'video' | 'image';
  mediaSrc: string;
  mediaAlt?: string;
  title: string;
  subtitle?: string;
}

interface NarrativeContent {
  stickyImage: string;
  features: Feature[];
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface GalleryContent {
  images: GalleryImage[];
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string; // For lazy loading
}

interface AmenitiesContent {
  title: string;
  amenities: Amenity[];
}

interface Amenity {
  id: string;
  title: string;
  description: string;
  icon: string;
  backgroundImage: string;
}

interface FooterContent {
  ctaHeading: string;
  ctaSubheading?: string;
  formFields: FormField[];
  contactInfo?: ContactInfo;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required: boolean;
  placeholder?: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}
```

### Animation Configuration Model

```typescript
interface AnimationConfig {
  reducedMotion: boolean;
  parallaxEnabled: boolean;
  kenBurnsSpeed: number; // Scale change per second
  entranceDuration: number; // Default entrance animation duration (ms)
  staggerDelay: number; // Default stagger between elements (ms)
  magneticStrength: number; // 0.0 to 1.0
}

const defaultAnimationConfig: AnimationConfig = {
  reducedMotion: false,
  parallaxEnabled: true,
  kenBurnsSpeed: 0.005, // 1.0 to 1.1 over 20 seconds
  entranceDuration: 800,
  staggerDelay: 100,
  magneticStrength: 0.3
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidations to eliminate redundancy:

**Consolidations:**
- Properties 6.1 and 6.4 (button hover effects) can be combined into one comprehensive property about button hover feedback
- Properties 3.3 and 3.4 (text and image entrance animations) can be combined into one property about element animation types
- Properties 4.1 and 4.2 (parallax speed differences) can be combined into one property about layer speed relationships
- Properties 8.2 and 8.3 (amenity card hover effects) can be combined into one property about card hover transformations
- Properties 13.4 and 13.5 (keyboard accessibility and ARIA labels) can be combined into one comprehensive accessibility property

**Unique Properties Retained:**
- Animation timing and choreography properties (3.1, 3.2, 3.5, 6.5)
- Sticky scroll behavior properties (5.1, 5.2, 5.4, 5.5)
- Gallery interaction properties (7.2, 7.3, 7.5)
- Responsive behavior properties (12.1, 12.4)
- Accessibility properties (4.5, 13.1, 13.2, 13.3)
- Performance optimization properties (11.3, 14.2, 14.5)

### Correctness Properties

#### Property 1: Hero Section Full Viewport Height
*For any* viewport size, the Hero Section should render at exactly 100% of the viewport height
**Validates: Requirements 2.1**

#### Property 2: Navigation Delayed Appearance
*For any* page load, the Navigation component should not be visible before 1000ms and should be visible after 1000ms
**Validates: Requirements 2.4**

#### Property 3: Universal Element Animation
*For any* section that enters the viewport, all child elements within that section should have entrance animations triggered
**Validates: Requirements 3.1**

#### Property 4: Staggered Animation Timing
*For any* group of elements with entrance animations, the animation start times should be staggered (not all elements should start at the same time)
**Validates: Requirements 3.2**

#### Property 5: Element Animation Type Validation
*For any* visible element (text or image), it should use one of the approved animation types (fade-in, slide-in, clipping mask, scale, or parallax)
**Validates: Requirements 3.3, 3.4**

#### Property 6: No Instant Appearance
*For any* element that becomes visible on the page, it should have an animation configuration (no element should appear instantly without transition)
**Validates: Requirements 3.5**

#### Property 7: Parallax Layer Speed Hierarchy
*For any* parallax section with multiple layers, background layers should have slower scroll speeds than foreground layers (speed_background < speed_foreground)
**Validates: Requirements 4.1, 4.2**

#### Property 8: Reduced Motion Disables Parallax
*For any* parallax layer, when prefers-reduced-motion is enabled, all layers should have the same scroll speed (no differential movement)
**Validates: Requirements 4.5**

#### Property 9: Sticky Image Position Constancy
*For any* scroll position within the Sticky Scroll Section bounds, the house image position should remain constant (fixed) while text content position changes
**Validates: Requirements 5.1, 5.2**

#### Property 10: Active Feature Highlighting
*For any* feature description in the Sticky Scroll Section, when it enters the active viewport area (vertical center), it should receive visual emphasis (highlight state)
**Validates: Requirements 5.4**

#### Property 11: Sticky Release After Section
*For any* scroll position beyond the Sticky Scroll Section, the house image should no longer be in sticky position (should scroll normally)
**Validates: Requirements 5.5**

#### Property 12: Button Hover Feedback
*For any* button element, hovering should trigger visual feedback effects (scale, glow, shine, or color change) with smooth transitions
**Validates: Requirements 6.1, 6.4**

#### Property 13: Interactive Card Hover Effects
*For any* interactive card, hovering should trigger transformation effects (scale, glow, or color shift)
**Validates: Requirements 6.2**

#### Property 14: Magnetic Effect on Proximity
*For any* interactive element with magnetic effect enabled, when the cursor is within proximity threshold (100px), the element position should shift toward the cursor
**Validates: Requirements 6.3**

#### Property 15: Micro-Interaction Duration Limit
*For any* micro-interaction animation (hover, focus, click), the animation duration should be less than or equal to 300ms
**Validates: Requirements 6.5**

#### Property 16: Gallery Inertia After Drag
*For any* gallery drag interaction, after mouse/touch release, the gallery position should continue changing with decreasing velocity (inertia decay)
**Validates: Requirements 7.2**

#### Property 17: Gallery Transition Effects
*For any* gallery image transition, visual effects (deformation, perspective, or scale) should be applied during the transition
**Validates: Requirements 7.3**

#### Property 18: Gallery Interaction Feedback
*For any* gallery interaction (drag start, dragging), visual feedback should be provided (cursor change or visual cue)
**Validates: Requirements 7.5**

#### Property 19: Amenity Card Hover Transformation
*For any* amenity card, hovering should trigger both expansion (scale increase) and background change (color or image reveal) with smooth transitions
**Validates: Requirements 8.2, 8.3**

#### Property 20: Amenity Card Hover Reversal
*For any* amenity card in hover state, when the cursor moves away, the card should smoothly return to its original state (reverse all hover effects)
**Validates: Requirements 8.5**

#### Property 21: Form Field Focus Animations
*For any* form input field, receiving focus should trigger visual animations (underline expansion, label movement, or glow effect)
**Validates: Requirements 9.5**

#### Property 22: Lazy Loading for Large Assets
*For any* image or video asset above a size threshold, lazy loading should be implemented (loading attribute or intersection observer)
**Validates: Requirements 11.3**

#### Property 23: Responsive Layout Adaptation
*For any* viewport width, the layout should adapt to the appropriate breakpoint configuration (mobile < 768px, tablet 768-1024px, desktop > 1024px)
**Validates: Requirements 12.1**

#### Property 24: Responsive Typography Scaling
*For any* text element, the font size should adjust based on viewport width (smaller sizes for mobile, larger for desktop)
**Validates: Requirements 12.4**

#### Property 25: Reduced Motion Disables Animations
*For any* animation configuration, when prefers-reduced-motion is enabled, the animation should be disabled or have duration reduced to near-zero
**Validates: Requirements 13.1**

#### Property 26: Content Accessibility Without Animations
*For any* content element, when animations are disabled (reduced motion), the content should still be visible and accessible (no content hidden behind animations)
**Validates: Requirements 13.2**

#### Property 27: Text Color Contrast Compliance
*For any* text element, the color contrast ratio between text and background should meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
**Validates: Requirements 13.3**

#### Property 28: Comprehensive Keyboard Accessibility
*For any* interactive element (button, link, form field, card), it should be reachable and operable via keyboard navigation (tab, enter, space) and have appropriate ARIA labels
**Validates: Requirements 13.4, 13.5**

#### Property 29: Graceful Feature Degradation
*For any* advanced feature (3D, WebGL, advanced CSS), when unsupported by the browser, a functional alternative should be provided (fallback rendering)
**Validates: Requirements 14.2, 14.5**

## Error Handling

### Animation Errors

**Scenario:** Animation library fails to load or initialize
- **Handling:** Detect library load failure, disable all animations, render static content
- **User Experience:** Page remains functional with all content visible, no broken animations
- **Implementation:** Try-catch blocks around animation initialization, fallback to CSS-only transitions

**Scenario:** Performance drops below 30fps during animations
- **Handling:** Detect frame rate drops using Performance API, automatically reduce animation complexity
- **User Experience:** Smoother experience with simplified animations rather than janky complex ones
- **Implementation:** Monitor requestAnimationFrame timing, disable parallax/3D effects if threshold exceeded

### Media Loading Errors

**Scenario:** Hero background video fails to load
- **Handling:** Catch video load error, fall back to static image with Ken Burns effect
- **User Experience:** Seamless fallback, user may not notice video was intended
- **Implementation:** Video onError handler, preload fallback image

**Scenario:** Gallery images fail to load
- **Handling:** Display placeholder with elegant loading state, retry failed images
- **User Experience:** Graceful loading indicators, no broken image icons
- **Implementation:** Image onError handler, placeholder component with retry logic

### Form Submission Errors

**Scenario:** Contact form submission fails (network error)
- **Handling:** Display error message, preserve form data, offer retry
- **User Experience:** Clear error communication, no data loss, easy recovery
- **Implementation:** Catch fetch errors, store form state in localStorage, retry button

**Scenario:** Form validation fails
- **Handling:** Display inline validation messages, highlight invalid fields
- **User Experience:** Clear guidance on what needs correction
- **Implementation:** Real-time validation with debouncing, accessible error messages

### Browser Compatibility Errors

**Scenario:** Intersection Observer API unavailable (old browsers)
- **Handling:** Polyfill or fallback to scroll event listeners
- **User Experience:** Animations still trigger, slightly less performant
- **Implementation:** Feature detection, conditional polyfill loading

**Scenario:** CSS Grid unsupported
- **Handling:** Fall back to Flexbox layouts
- **User Experience:** Layout remains functional, may be slightly different
- **Implementation:** CSS feature queries (@supports), progressive enhancement

### Accessibility Errors

**Scenario:** User has prefers-reduced-motion but animations still play
- **Handling:** Double-check media query, force disable all animations
- **User Experience:** Respect user preference absolutely
- **Implementation:** Multiple checks, animation config override

**Scenario:** Keyboard navigation breaks due to animation state
- **Handling:** Ensure focus management works regardless of animation state
- **User Experience:** Keyboard users can always navigate
- **Implementation:** Focus trap management, skip links, proper tab order

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit tests and property-based tests as complementary approaches:

**Unit Tests** focus on:
- Specific examples of component rendering
- Edge cases (empty states, error states, boundary conditions)
- Integration points between components
- Form validation logic
- Error handling scenarios
- Browser compatibility fallbacks

**Property-Based Tests** focus on:
- Universal animation behaviors across all components
- Responsive behavior across continuous viewport ranges
- Accessibility compliance across all interactive elements
- Performance characteristics under varied conditions
- State consistency during interactions

### Property-Based Testing Configuration

**Library Selection:** fast-check (JavaScript/TypeScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tag format: `// Feature: los-cedros-landing, Property {N}: {property description}`

**Example Property Test Structure:**
```typescript
// Feature: los-cedros-landing, Property 6: No Instant Appearance
test('all visible elements have animation configuration', () => {
  fc.assert(
    fc.property(
      fc.array(elementGenerator, { minLength: 1, maxLength: 20 }),
      (elements) => {
        const rendered = renderElements(elements);
        const visibleElements = getVisibleElements(rendered);
        
        return visibleElements.every(el => 
          hasAnimationConfig(el) && getAnimationDuration(el) > 0
        );
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Focus Areas

**Component Rendering:**
- Hero section renders with correct media type
- Navigation appears after delay
- Sticky scroll section has correct layout
- Gallery initializes with drag handlers
- Amenity cards render in grid
- Footer contains form elements

**Edge Cases:**
- Empty gallery (no images)
- Single feature in sticky section
- Form with all fields empty
- Form with invalid email format
- Missing media assets
- Extremely long text content

**Error Conditions:**
- Video load failure triggers fallback
- Form submission network error
- Invalid form data submission
- Animation library load failure

**Integration:**
- Scroll triggers section animations
- Form submission updates UI state
- Gallery drag updates position
- Hover triggers card transformations

### Testing Tools

**Unit Testing:**
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing with user-centric queries
- **@testing-library/user-event**: Realistic user interaction simulation

**Property-Based Testing:**
- **fast-check**: Property-based testing with generators

**Visual Regression:**
- **Playwright**: E2E testing with screenshot comparison
- **Percy** or **Chromatic**: Visual regression service

**Performance Testing:**
- **Lighthouse CI**: Automated performance audits
- **Web Vitals**: Core Web Vitals monitoring

**Accessibility Testing:**
- **axe-core**: Automated accessibility testing
- **jest-axe**: Accessibility assertions in tests
- **Manual testing**: Screen reader testing (NVDA, JAWS, VoiceOver)

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── HeroSection.test.tsx
│   │   ├── ParallaxSection.test.tsx
│   │   ├── StickyScrollSection.test.tsx
│   │   ├── ImmersiveGallery.test.tsx
│   │   ├── AmenityCard.test.tsx
│   │   └── ContactForm.test.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.test.ts
│   │   ├── useReducedMotion.test.ts
│   │   └── useMagneticEffect.test.ts
│   └── utils/
│       ├── animation.test.ts
│       └── validation.test.ts
├── property/
│   ├── animation-properties.test.ts
│   ├── accessibility-properties.test.ts
│   ├── responsive-properties.test.ts
│   └── interaction-properties.test.ts
├── integration/
│   ├── scroll-animations.test.tsx
│   ├── form-submission.test.tsx
│   └── gallery-interaction.test.tsx
└── e2e/
    ├── full-page-flow.spec.ts
    ├── mobile-experience.spec.ts
    └── accessibility.spec.ts
```

### Coverage Goals

- **Unit Test Coverage:** 80%+ for component logic
- **Property Test Coverage:** All 29 correctness properties implemented
- **Accessibility Coverage:** 100% of interactive elements tested
- **Browser Coverage:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Device Coverage:** Desktop (1920x1080, 1366x768), Tablet (768x1024), Mobile (375x667, 414x896)

### Continuous Integration

**Pre-commit:**
- Lint checks (ESLint, Prettier)
- Type checking (TypeScript)
- Unit tests (fast subset)

**Pull Request:**
- Full unit test suite
- Property-based tests (100 iterations)
- Accessibility tests
- Build verification

**Main Branch:**
- Full test suite
- E2E tests
- Visual regression tests
- Performance audits
- Deployment to staging

### Performance Benchmarks

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Animation frame rate: 60fps (16.67ms per frame)

**Monitoring:**
- Real User Monitoring (RUM) for production metrics
- Synthetic monitoring for consistent baseline
- Performance budgets enforced in CI
- Alerts for metric degradation
