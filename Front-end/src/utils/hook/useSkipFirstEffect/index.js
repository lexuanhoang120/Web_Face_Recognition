import { useEffect, useRef } from 'react'

function useEffectSkipFirst(callback, dependencies) {
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    callback()
  }, dependencies)
}

export default useEffectSkipFirst