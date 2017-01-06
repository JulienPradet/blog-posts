import React from 'react'

import LatestPosts from '../../components/LatestPosts'
import Page from '../Page'

const Homepage = (props) => {
  return (
    <Page {...props}>
      <LatestPosts numberOfPosts={null} />
    </Page>
  )
}

export default Homepage
