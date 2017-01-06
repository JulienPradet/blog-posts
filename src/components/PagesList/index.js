import React, { PropTypes } from 'react'

import PagePreview from '../PagePreview'

import styles from './index.css'

const PagesList = ({ pages }) => {
  return (
    <div>
      <h2>Les derniers articles</h2>
      {
      pages.length
      ? (
        <ul className={styles.list}>
          {
          pages.map((page) => (
            <li key={page.title} className={styles.item}><PagePreview {...page} /></li>
          ))
        }
        </ul>
      )
      : 'Pas d\'article pour le moment.'
    }
    </div>
  )
}

PagesList.propTypes = {
  pages: PropTypes.array.isRequired
}

export default PagesList
