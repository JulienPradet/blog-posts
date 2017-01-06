import React, { PropTypes } from 'react'

import './index.global.css'
import './highlight.global.css'

import Container from './components/Container'
import DefaultHeadMeta from './components/DefaultHeadMeta'
import Content from './components/Content'
import Footer from './components/Footer'

const AppContainer = (props) => (
  <Container>
    <DefaultHeadMeta />
    <Content>
      { props.children }
    </Content>
    <Footer />
  </Container>
)

AppContainer.propTypes = {
  children: PropTypes.node
}

export default AppContainer
