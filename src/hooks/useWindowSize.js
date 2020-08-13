import { useState, useEffect } from 'react'
import {withWindowSize} from 'react-fns'

function useWindowSize({width, height}) {
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

export default withWindowSize(useWindowSize)