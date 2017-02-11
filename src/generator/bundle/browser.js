import React from 'react'
import {render} from 'react-dom'
import {withAsyncComponents} from 'react-async-component'
import App from '../tmp/App'
import {BrowserRouter} from 'react-router-dom'

withAsyncComponents(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
  .then((result) => {
    const {appWithAsyncComponents} = result

    render(
      appWithAsyncComponents,
      document.getElementById('root')
    )
  })
