import React, { PropTypes } from 'react'

import Page from '../Page'

import styles from './index.css'

const PageError = ({ error, errorText }) => (
  <Page head={{}}>
    <div className={styles.container}>
      <div className={styles.oops}>{ '😱 Oooops!' }</div>
      <div className={styles.text}>
        <p className={styles.title}>
          <strong>{ error }</strong>
          { ' ' }
          { errorText }
        </p>
        {
          error === 404 &&
            <div>
              { 'Le lien est cassé. ' }
              { 'Désolé. ' }
              <br />
              N'hésitez pas à me prévenir pour que je corrige ça&nbsp;!
            </div>
        }
      </div>
    </div>
  </Page>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string
}

PageError.defaultProps = {
  error: 404,
  errorText: 'Page Not Found'
}

export default PageError
