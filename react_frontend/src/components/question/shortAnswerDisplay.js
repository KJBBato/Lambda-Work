import React from 'react'
import {List} from 'immutable'
import Styles from '../../styles'
import SpacedListView from '../format/spacedListView.js'

class ShortAnswerDisplay extends React.Component {

  componentWillMount(props) {
    this.setState({
      answer: this.props.answer,
      value: this.props.value,
      index: this.props.index,
      type: 'short answer'
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      answer: undefined,
      value: undefined,
      index: undefined,
      type: undefined
    }
  }

  render() {
    const values = List([
      'index: ' + this.state.index,
      'type: ' + this.state.type,
      'value: ' + this.state.value,
      'answer: ' + this.state.answer
    ])
    return (
      <div style={Styles.viewText}>
        <SpacedListView list={values}/>
      </div>
    )
  }
}

export default ShortAnswerDisplay