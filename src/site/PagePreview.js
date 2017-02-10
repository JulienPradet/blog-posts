import React from 'react'
import {Link} from 'react-router-dom'

const PagePreview = ({page}) => (
  <div className='page-preview'>
    <Link to={page.location} className='page-preview__title'>
      {page.title}
    </Link>
    <div className='page-preview__meta'>
      {page.date && (
        <time key={page.date.toISOString()}>
          {page.date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      )}
    </div>
    <div className='page-preview__description'>
      {page.description}
      {' '}
    </div>
    <Link to={page.location} className='page-preview__read-more'>
      Lire la suite →
    </Link>
  </div>
)

export default PagePreview
