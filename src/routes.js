import React from 'react'
import { Route } from 'react-router'
import { PageContainer as PhenomicPageContainer } from 'phenomic'

import AppContainer from './AppContainer'
import Page from './layouts/Page'
import PageError from './layouts/PageError'
import Homepage from './layouts/Homepage'
import Post from './layouts/Post'

import InjectDataExample from './examples/injecter-des-donnees-react'

const PageContainer = (props) => (
  <PhenomicPageContainer
    {...props}
    layouts={{
      Page,
      PageError,
      Homepage,
      Post
    }}
  />
)

export default (
  <Route component={AppContainer}>
    <Route path='/wip/injecter-des-donnees-react/exemple' component={InjectDataExample} />
    <Route path='*' component={PageContainer} />
  </Route>
)
