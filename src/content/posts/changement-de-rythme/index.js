import React from 'react'
import Page from '../../../site/Page'
import content from './content.md'
import meta from './meta'

const Post = (props) => (
  <Page page={meta} path={props.match.path}>
    <div dangerouslySetInnerHTML={{__html: content}} />
  </Page>
)

Post.propTypes = {
  match: React.PropTypes.shape({
    path: React.PropTypes.string.isRequired
  }).isRequired
}

export default Post
