import React from 'react'
import ReactDOM from 'react-dom'
import LoginApp from './apps/loginApp'

class Index extends React.Component {
  render() {
    return (
      <LoginApp/>
    )
  }
}

ReactDOM.render(<Index/>, document.getElementById('root'))