import React from 'react'
import {List} from 'immutable'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'
import SpacedListView from '../format/spacedListView.js'

class ShortAnswerSubmit extends React.Component {

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
      studentAnswer: undefined,
      answer: undefined,
      value: undefined,
      index: undefined,
      type: undefined
    }
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  submitAnswer(e){
    e.preventDefault()
    const data = {
      answer: this.state.answer
    }
    console.log(data)
  }

  render() {
    const value = List([
      'Question: ' + this.state.value
    ])
    return (
      <div>
        <SpacedListView list={value}/>
        <Row>
          Type your Answer:
        </Row>
        <Row>
          <textarea
            style={Styles.textareaSimple}
            value={this.state.answer}/>
        </Row>
      </div>
    )
  }
}

export default ShortAnswerSubmit