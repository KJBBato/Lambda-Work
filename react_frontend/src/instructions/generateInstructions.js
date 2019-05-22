import React from 'react'
import Styles from '../styles'

class GenerateInstructions extends React.Component {
  render() {
    const instruction = 'Welcome';
    return(
      <div style={Styles.instructionSize}>
        these are the generate app instrutions
      </div>
    )
  }
}

export default GenerateInstructions