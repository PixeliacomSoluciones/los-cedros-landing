import { useReducedMotion as useReducedMotionContext } from '@/providers/ReducedMotionProvider'

export function useReducedMotion(): boolean {
  return useReducedMotionContext()
}
