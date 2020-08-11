import React, { useEffect, useRef } from 'react'
//Components
import {
  Banner,
  Video,
  Canvas,
  BannerTitle,
  Headline
} from '../../styles/homeStyle'
//Custom hooks
import useWindowSize from '../../hooks/useWindowSize'
//Context
import { useGlobalStateContext } from '../../context/globalContext'


const HomeBanner = () => {
  let canvas = useRef(null)
  const size = useWindowSize()
  const { currentTheme } = useGlobalStateContext()

  useEffect(() => {
    let renderingElement = canvas.current
    let drawingElement = renderingElement.cloneNode()

    let drawingCtx = drawingElement.getContext('2d')
    let renderingCtx = renderingElement.getContext('2d')

    let lastX
    let lastY

    let moving = false

    renderingCtx.globalCompositeOperation = 'source-over'
    renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff'
    renderingCtx.fillRect(0, 0, size.width, size.height)

    renderingElement.addEventListener('mouseover', event => {
      moving = true
      lastX = event.pageX - renderingElement.offsetLeft
      lastY = event.pageY - renderingElement.offsetTop
    })

    renderingElement.addEventListener('mouseup', event => {
      moving = false
      lastX = event.pageX - renderingElement.offsetLeft
      lastY = event.pageY - renderingElement.offsetTop
    })

    renderingElement.addEventListener('mousemove', event => {
      if (moving) {
        drawingCtx.globalCompositeOperation = 'source-over'
        renderingCtx.globalCompositeOperation = 'destination-out'
        let currentX = event.pageX - renderingElement.offsetLeft
        let currentY = event.pageY - renderingElement.offsetTop
        drawingCtx.lineJoin = 'round'
        drawingCtx.moveTo(lastX, lastY)
        drawingCtx.lineTo(currentX, currentY)
        drawingCtx.closePath()
        drawingCtx.lineWidth = 120
        drawingCtx.stroke()
        lastX = currentX
        lastY = currentY
        renderingCtx.drawImage(drawingElement, 0, 0)
      }
    })
  }, [currentTheme])

  const parent = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const child = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [.6, .05, -.01, .9]
      }
    }
  }

  return (
    <Banner>
      <Video>
        <video
          height='100%'
          width='100%'
          loop
          autoPlay
          >
            <source src={require('../../assets/video/video.mp4')} type='video/mp4'/>
          </video>
      </Video>
      <Canvas
        ref={canvas}
        height={size.height}
        width={size.width}
      />
      <BannerTitle
        variants={parent}
        initial='initial'
        animate='animate'>
        <Headline variants={child}>DIG</Headline>
        <Headline variants={child}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner