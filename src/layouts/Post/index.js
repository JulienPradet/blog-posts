import React, { PropTypes } from 'react'

import LatestPosts from '../../components/LatestPosts'
import Page from '../Page'

import styles from './index.css'

const followMe = `
Si vous voulez suivre mes publications, il paraît que j'ai un feed <a href='/feed.xml'>RSS</a>
et un <a href='https://twitter.com/JulienPradet'>Twitter</a>.
Si vous pensez à d'autres méthodes que vous voudriez que je mette en place (pigeon
voyageur, avion en papier, etc.), n'hésitez pas à me les proposer :)
`

const Post = (props) => {
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null

  return (
    <Page
      {...props}
      header={
        <div>
          <header className={styles.header}>
            {
              pageDate &&
              <time key={pageDate.toISOString()}>
                { pageDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }
              </time>
            }
          </header>
        </div>
      }
    >
      <hr />
      <span dangerouslySetInnerHTML={{__html: followMe}} />
      <hr />
      <LatestPosts />
    </Page>
  )
}

Post.propTypes = {
  head: PropTypes.object.isRequired
}

export default Post
