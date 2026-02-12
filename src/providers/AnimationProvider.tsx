import { createContext, useContext, ReactNode } from 'react'
import { useReducedMotion } from './ReducedMotionProvider'
import { AnimationConfig } from '@/types'

const defaultAnimationConfig: AnimationConfig = {
  reducedMotion: false,
  parallaxEnabled: true,
  kenBurnsSpeed: 0.005, // 1.0 to 1.1 over 20 seconds
  entranceDuration: 800,
  staggerDelay: 100,
  magneticStrength: 0.3,
}

const AnimationContext = createContext<AnimationConfig>(defaultAnimationConfig)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  const config: AnimationConfig = {
    ...defaultAnimationConfig,
    reducedMotion: prefersReducedMotion,
    parallaxEnabled: !prefersReducedMotion,
    entranceDuration: prefersReducedMotion ? 0 : defaultAnimationConfig.entranceDuration,
    staggerDelay: prefersReducedMotion ? 0 : defaultAnimationConfig.staggerDelay,
  }

  return (
    <AnimationContext.Provider value={config}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationConfig() {
  return useContext(AnimationContext)
}
