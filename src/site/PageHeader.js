import React from 'react'
import {Link} from 'react-router-dom'

const PageHeader = (props) => {
  return <div className='page-header'>
    <h1><Link to='/'>{props.page.title}</Link></h1>
    <header>
      {props.page.date && (
        <time>
          {(new Date(props.page.date)).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      )}
    </header>
  </div>
}

export default PageHeader
