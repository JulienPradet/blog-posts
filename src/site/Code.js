import React from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import prettier from 'prettier'

class Code extends React.Component {
  constructor () {
    super()
    this.state = {
      width: 70
    }
    this.updatePrintWidth = this.updatePrintWidth.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.updatePrintWidth)
    this.updatePrintWidth()
  }

  componentWillUnmount () {
    window.removeEventListener(this.updatePrintWidth)
  }

  updatePrintWidth () {
    this.setState({
      width: Math.max(
        40,
        Math.floor(
          Math.min(600, this.code.offsetWidth) / 8.5
        )
      )
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.lang !== nextProps.lang ||
      this.props.children !== nextProps.children ||
      this.state.width !== nextState.width
  }

  transformCode (code) {
    return Prism.highlight(
      prettier.format(
        code,
        {
          printWidth: this.state.width,
          tabWidth: 2,
          singleQuote: false,
          trailingComma: false,
          bracketSpacing: true,
          parser: 'babylon'
        }
      ),
      Prism.languages[this.props.lang || 'jsx']
    )
  }

  render () {
    return (
      <pre className={`language-${this.props.lang || 'jsx'}`} ref={(node) => { this.code = node }}>
        <code dangerouslySetInnerHTML={{__html: this.transformCode(this.props.children)}} />
      </pre>
    )
  }
}

export default Code
