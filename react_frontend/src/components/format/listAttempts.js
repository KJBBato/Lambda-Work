import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'
import {Set} from 'immutable'
import ShortAnswerDisplay from '../question/shortAnswerDisplay'
import MultipleAnswerDisplay from '../question/multipleAnswerDisplay'

const SHORT_ANSWER = 'SA'
const MULTIPLE_CHOICE = 'MC'

class GetQuestionDisplay extends React.Component {

  componentWillMount() {
    let pane = undefined
    console.log(this.props.data.qType)
    if(this.props.data.qType === SHORT_ANSWER) {
      pane = (
        <ShortAnswerDisplay
          index = {this.props.data.qKey}
          value = {this.props.data.qValue}
          answer = {this.props.data.studentAnswer}/>
      )
    } else if(this.props.data.qType === MULTIPLE_CHOICE) {
      pane = (
        <MultipleAnswerDisplay
          index = {this.props.data.qKey}
          value = {this.props.data.qValue}
          answer = {this.props.data.studentAnswer}
          option0 = {this.props.data.candidate1}
          option1 = {this.props.data.candidate2}
          option2 = {this.props.data.candidate3}
          option3 = {this.props.data.candidate4}/>
      )
    }
    this.setState({pane: pane})
  }

  constructor(props) {
    super(props)
    this.state = {
      pane: undefined
    }
  }

  render() {
    return(
      <div>
        {this.state.pane}
      </div>
    )
  }
}

class AttemptView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pane: undefined
    }
    this.handleSpoiler = this.handleSpoiler.bind(this)
  }

  handleSpoiler(e) {
    e.preventDefault()
    if(this.state.pane) {
      this.setState({pane: undefined})
    } else {
      this.setState({
        pane: this.props.data.map(this.wrap)
      })
    }
  }

  wrap(datum) {
    return (
      <GetQuestionDisplay data={datum}/>
    )
  }

  render() {
    return(
      <div>
        <Row>
          attempt:{this.props.data[0].attemptKey}
          <button onClick={this.handleSpoiler}
            style={Styles.smallButton}>spoiler</button>
        </Row>
        {this.state.pane}
      </div>
    )
  }
}

class ListAttempts extends React.Component {

  componentWillMount() {
    fetch('/attemptApi/attempt/get/all')
    .then((res) => (res.json()))
    .then((res) => (
      this.setState({attempts: this.format(res)})
    ))
    .catch((err) => (
      console.log(err)
    ))
  }

  constructor(props) {
    super(props)
    this.state = {
      attempts: undefined
    }
    this.format = this.format.bind(this)
    this.wrap = this.wrap.bind(this)
  }

  format(data) {
    const tags = Set(
      data.map((datum) => (
        datum.attemptKey
      ))
    )
    const formattedData = tags.map((tag) => (
      data.filter((datum) => (
        datum.attemptKey !== tag
      ))
    ))
    return formattedData
  }

  wrap(attempt) {
    console.log(attempt)
    return (
      <AttemptView data={attempt}/>
    )
  }

  render() {
    let attemptList = undefined
    if(this.state.attempts) {
      attemptList = this.state.attempts.map(this.wrap)
    }
    return(
      <div>
        {attemptList}
      </div>
    )
  }
}

export default ListAttempts