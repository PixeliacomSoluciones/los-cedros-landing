import { useScroll } from '@/providers/ScrollProvider'
import { ScrollState } from '@/types'

export function useScrollProgress(): ScrollState {
  const { progress, direction, scrollY } = useScroll()
  
  return {
    progress,
    direction,
    scrollY,
  }
}
