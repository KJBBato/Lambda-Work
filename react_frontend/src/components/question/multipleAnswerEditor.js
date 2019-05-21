import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'

class MultipleAnswerEditor extends React.Component {

  componentWillMount() {
    this.setState({
      value: this.props.value,
      option0: this.props.option0,
      option1: this.props.option1,
      option2: this.props.option2,
      option3: this.props.option3,
      answer: this.props.answer
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      option0: undefined,
      option1: undefined,
      option2: undefined,
      option3: undefined,
      answer: undefined
    }
    this.changeState = this.changeState.bind(this)
    this.changeText = this.changeText.bind(this)
    this.updateQuestion = this.updateQuestion.bind(this)
  }

  changeState(obj) {
    return (e) => {
      e.preventDefault()
      this.setState(obj)
    }
  }

  changeText(field) {
    return (e) => {
      e.preventDefault()
      this.setState({[field]: e.target.value})
    }
  }

  updateQuestion(e) {
    e.preventDefault()
    const data = {
      qValue: this.state.value,
      answer: this.props.answer,
      candidate1: this.props.option0,
      candidate2: this.props.option1,
      candidate3: this.props.option2,
      candidate4: this.props.option3
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
    return (
      <form
        onSubmit = {this.updateQuestion}
        style={Styles.viewText}>
        <Row style={Styles.textSize}>
          Value:
        </Row>
        <Row>
          <textarea
            onChange={this.changeText('value')}
            value={this.state.value}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Option0:
        </Row>
        <Row>
          <textarea
            onChange={this.changeText('option0')}
            value={this.state.option0}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Option1:
        </Row>
        <Row>
          <textarea
            onChange={this.changeText('option1')}
            value={this.state.option1}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Option2:
        </Row>
        <Row>
          <textarea
            onChange={this.changeText('option2')}
            value={this.state.option2}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Option3:
        </Row>
        <Row>
          <textarea
            onChange={this.changeText('option3')}
            value={this.state.option3}
            style={Styles.editQuestionArea}/>
        </Row>
        <Row style={Styles.textSize}>
          Answer: {this.state.answer}
        </Row>
        <Row>
          <select
            onChange={this.changeText('answer')}
            style={Styles.editSelectBar}>
            <option value={''}>Which option is correct?</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
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

export default MultipleAnswerEditor