import React from "react"
//Components
import Layout from "../components/layout"
import HomeBanner from '../components/homePage/homeBanner'
import HomeContent from '../components/homePage/homeContent'
import HomeFeatured from '../components/homePage/homeFeatured'
import HomeAbout from '../components/homePage/homeAbout'
//Context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext'

const IndexPage = props => {

  const {cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType || false)
    dispatch({ type: 'CURSOR_TYPE', cursorType: cursorType })
  }

  return (
    <Layout>
      <HomeBanner />
      <HomeContent/>
      <HomeFeatured onCursor={onCursor}/>
      <HomeAbout onCursor={onCursor}/>
    </Layout>
  )
}

export default IndexPage
