import React from 'react'
import {List, Map} from 'immutable'
import ShortAnswerDisplay from '../question/shortAnswerDisplay'
import MultipleAnswerDisplay from '../question/multipleAnswerDisplay'
import {Row, Col} from 'react-flexbox-grid'
import Styles from '../../styles.js'

const SHORT_ANSWER = 'SA'
const MULTIPLE_CHOICE = 'MC'

class GetQuestionDisplay extends React.Component {

  componentWillMount() {
    let pane = undefined
    if(this.props.data.get('qType') === SHORT_ANSWER) {
      pane = (
        <ShortAnswerDisplay
          value = {this.props.data.get('qValue')}
          answer = {this.props.data.get('answer')}
          index = {this.props.data.get('qKey')}/>
      )
    } else if(this.props.data.get('qType') === MULTIPLE_CHOICE) {
      pane = (
        <MultipleAnswerDisplay
          value = {this.props.data.get('qValue')}
          answer = {this.props.data.get('answer')}
          index = {this.props.data.get('qKey')}
          option0 = {this.props.data.get('candidate1')}
          option1 = {this.props.data.get('candidate2')}
          option2 = {this.props.data.get('candidate3')}
          option3 = {this.props.data.get('candidate4')}/>
      )
    }

    this.setState({
      pane: pane,

    })
  }

  render() {
    return (
      <div>
        {this.state.pane}
      </div>
    )
  }
}

class CreateQuiz extends React.Component {
  componentWillMount() {
    fetch('/questionApi/get/all')
    .then((res) => (
      res.json()
    )).then((res) => {
      this.setState(
        {
          questions: res.reduce((prev, next) => (
            prev.set(next.qKey, next)
          ), Map({})),
          selected: res.reduce((prev, next) => (
            prev.set(next.qKey, false)
          ), Map({}))
        }
      )
    }).then((res) => {
    }).catch((err)=>(
      console.log(err)
    ))
  }

  constructor(props) {
    super(props)
    this.wrap = this.wrap.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeText = this.changeText.bind(this)
    this.state = {
      questions: undefined,
      selected: undefined,
      creator: undefined,
      name: undefined
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

  checkItem(n) {
    return (e) => {
      const old = this.state
      const up = old.selected.set(n, e.target.checked)
      this.setState({selected: up})
    }
  }

  wrap(q) {
    return (
      <Row>
        <Col xs={11} sm={11} md={11} lg={11}>
          <GetQuestionDisplay data={Map(q)}/>
        </Col>
        <Col xs={1} sm={1} md={1} lg={1}>
          <input
            type='checkbox'
            onChange={this.checkItem(q.qKey)}
            checked={this.state.selected.get(q.qKey)}/>
        </Col>
      </Row>
    )
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.creator, this.state.name)
    const metaData = {
      quizCreator: this.state.creator,
      quizName: this.state.name
    }

    fetch('/quizApi/quiz/insert', {
      method: 'POST',
      body: JSON.stringify(metaData),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => (
      fetch('/quizApi/quiz/max')
      .then((res) => (
        res.json()
      ))
      .then((res) => {
        return res[0]['MAX(quizKey)']
      })
      .then((res) => (
        this.state.questions.map((q) => {
          if(this.state.selected.get(q.qKey)) {
            console.log('true:', res, q.qKey)
            const data = {
              id: res,
              questionId: q.qKey
            }
            fetch('/quizApi/quizContents/insert/'+res, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
            })
          } else {
            console.log('false:', q.qKey)
          }
        })
      ))
    ))
  }

  render() {
    let qList = undefined
    if (this.state.questions) {
      qList = this.state.questions.toArray().map(this.wrap)
    }
    return(
      <div>
        <Row style={Styles.textSize}>
          Creator:
        </Row>
        <Row>
        <textarea
          value={this.state.creator}
          onChange={this.changeText('creator')}
          style={Styles.textArea}/>
        </Row>
        <Row style={Styles.textSize}>Quiz Name:</Row>
        <Row>
        <textarea
          value={this.state.name}
          onChange={this.changeText('name')}
          style={Styles.textArea}/>
        </Row>
        {qList}
        <Row>
          <button onClick={this.handleSubmit} style={Styles.submitButton}>
            submit
          </button>
        </Row>
      </div>
    )
  }
}

export default CreateQuiz