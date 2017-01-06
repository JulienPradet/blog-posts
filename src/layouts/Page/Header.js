import React from 'react'
import { Link } from 'phenomic'
import styles from './header.css'

const Header = ({head, header}) => head && (
  <div className={styles.wrapper}>
    <h1 className={styles.heading}>
      <Link to='/' dangerouslySetInnerHTML={{ __html: head.title }} />
    </h1>
    {header}
    {head.subtitle && (
      <p>
        {head.subtitle}
      </p>
    )}
  </div>
)

Header.propTypes = {
  head: React.PropTypes.shape({
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string
  }),
  header: React.PropTypes.node
}

export default Header
