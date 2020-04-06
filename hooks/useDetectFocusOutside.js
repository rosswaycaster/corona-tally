import { useCallback, useEffect, useMemo } from 'react'

// Custom hook that checks if a user clicks outside the ref or a keyboard user navigates outside the ref.
// We use shouldCheck to prevent any unnecessary func calls.
export const useDetectFocusOutside = (refs, func, shouldCheck = true) => {
  // Allow for multiple refs
  const refArray = useMemo(() => (Array.isArray(refs) ? refs : [refs]), [refs])

  const detectClickOutside = useCallback(
    (e) => {
      const isOutside = refArray.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      )
      if (shouldCheck && isOutside) {
        func()
      }
    },
    [func, refArray, shouldCheck]
  )

  const detectKeyboardFocusOutside = useCallback(
    (e) => {
      const isOutside = refArray.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      )
      if (shouldCheck && isOutside) {
        func()
      }
    },
    [func, refArray, shouldCheck]
  )
  useEffect(() => {
    window.addEventListener('click', detectClickOutside)
    window.addEventListener('touchstart', detectClickOutside)
    window.addEventListener('focusin', detectKeyboardFocusOutside)
    return () => {
      window.removeEventListener('click', detectClickOutside)
      window.removeEventListener('touchstart', detectClickOutside)
      window.removeEventListener('focusin', detectKeyboardFocusOutside)
    }
  }, [detectClickOutside, detectKeyboardFocusOutside])
}

export default useDetectFocusOutside
