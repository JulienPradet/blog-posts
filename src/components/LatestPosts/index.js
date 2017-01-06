import React, { PropTypes } from 'react'
import enhanceCollection from 'phenomic/lib/enhance-collection'

import PagesList from '../../components/PagesList'

const defaultNumberOfPosts = 2

const LatestPosts = ({numberOfPosts = defaultNumberOfPosts}, { collection }) => {
  let posts = enhanceCollection(collection, {
    filter: { layout: 'Post' },
    sort: 'date',
    reverse: true
  })

  if (numberOfPosts) {
    posts = posts.slice(0, numberOfPosts)
  }

  return (
    <div>
      <PagesList pages={posts} />
    </div>
  )
}

LatestPosts.propTypes = {
  numberOfPosts: PropTypes.number
}

LatestPosts.contextTypes = {
  collection: PropTypes.array.isRequired
}

export default LatestPosts
