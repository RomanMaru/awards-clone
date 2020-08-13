import { useState, useEffect } from 'react'


function useWindowSize({ width, height }) {
  if (typeof window !== 'undefined') {
    function getSize() {
      return {
        width: width,
        height: height
      }
    }
    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
      function handleResize() {
        setWindowSize(getSize())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    })
    return windowSize
  }

}

export default useWindowSize