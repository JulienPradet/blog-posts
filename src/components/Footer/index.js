import React from 'react'
import Svg from 'react-svg-inline'
import twitterSvg from '../icons/iconmonstr-twitter-1.svg'
import styles from './index.css'

const Footer = (props, {metadata : {pkg}}) => (
  <footer className={styles.footer}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <a
          href={`https://twitter.com/${pkg.twitter}`}
        >
          <Svg svg={twitterSvg} cleanup />
          @{pkg.twitter}
        </a>
      </li>
      <li className={styles.item}>
        <a
          href={process.env.PHENOMIC_HOMEPAGE}
          className={styles.phenomicReference}
        >
          { 'using ' }
          <span className={styles.phenomicReferenceName}>
            { `<${process.env.PHENOMIC_NAME} />` }
          </span>
        </a>
      </li>
    </ul>
  </footer>
)

Footer.contextTypes = {
  metadata: React.PropTypes.object.isRequired
}

export default Footer
