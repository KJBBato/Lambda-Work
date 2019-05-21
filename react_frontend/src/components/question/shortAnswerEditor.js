import FormatListView from '../format/formatListView'
import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'

class ShortAnswerEditor extends React.Component {

  componentWillMount() {
    this.setState({
      value: this.props.value,
      answer: this.props.answer
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      answer: undefined
    }
    this.changeText = this.changeText.bind(this)
    this.changeState = this.changeState.bind(this)
    this.updateQuestion = this.updateQuestion.bind(this)
  }

  changeState(obj) {
    return (e) => {
      e.preventDefault()
      this.setState({obj})
    }
  }

  changeText(field) {
    return (e) => {
      e.preventDefault()
      this.setState({
        [field]: e.target.value
      })
    }
  }

  updateQuestion(e) {
    e.preventDefault()
    const data = {
      qValue: this.state.value,
      answer: this.state.answer
    }
    fetch('/questionApi/update/' + this.props.index, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((err) => (
      console.log(err)
    ))
  }

  render() {
    const debugList = []
    return (
      <form onSubmit={this.updateQuestion}
        style={Styles.viewText}>
        <FormatListView list={debugList}/>
        <Row style={Styles.textSize}>
          Value:
        </Row>
        <Row>
          <textarea
            value={this.state.value}
            onChange={this.changeText('value')}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Answer:
        </Row>
        <Row>
          <textarea
            value={this.state.answer}
            onChange={this.changeText('answer')}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row>
          <p/>
        </Row>
        <Row end='xs'>
          <button type={'submit'}
            style={Styles.smallButton}>
            submit
          </button>
        </Row>
      </form>
    )
  }
}

export default ShortAnswerEditor