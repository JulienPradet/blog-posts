import React from 'react'
import Code from './Code'

class TabCode extends React.Component {
  constructor (props) {
    super()
    this.state = {
      currentTab: 0
    }
  }

  selectTab (index) {
    return this.setState.bind(this, {currentTab: index}, () => {})
  }

  render () {
    return (
      <div className='code-tab'>
        <ul className='code-tab__list'>
          {this.props.tabs.map(({label}, index) => (
            <li key={index}>
              <button onClick={this.selectTab(index)} className={'code-tab__button ' + (index === this.state.currentTab ? 'active' : '')}>
                {label}
              </button>
            </li>
          ))}
        </ul>
        <Code>{this.props.tabs[this.state.currentTab].code}</Code>
      </div>
    )
  }
}

export default TabCode
