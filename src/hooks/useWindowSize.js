import { useState, useEffect } from 'react'
import Window from 'window'
const { window} = new Window()
function useWindowSize() {
    function getSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
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

export default useWindowSize