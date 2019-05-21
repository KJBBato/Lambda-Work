import React from 'react'
import Deletor from '../question/deletor'
import ShortAnswerDisplay from '../question/shortAnswerDisplay'
import ShortAnswerEditor from '../question/shortAnswerEditor'
import MultipleAnswerDisplay from '../question/multipleAnswerDisplay'
import MultipleAnswerEditor from '../question/multipleAnswerEditor'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'

const SHORT_ANSWER = "SA"
const MULTIPLE_CHOICE = 'MC'

class ViewEditApp extends React.Component {

  componentWillMount() {
    let viewPane = undefined
    let editPane = undefined
    let deletePane = (
      <Deletor index={this.props.index}/>
    )
    if(this.props.type === SHORT_ANSWER) {
      viewPane = (
        <ShortAnswerDisplay
          index={this.props.index}
          value={this.props.value}
          answer={this.props.answer}/>
      )
      editPane = (
        <ShortAnswerEditor
          index={this.props.index}
          value={this.props.value}
          answer={this.props.answer}/>
      )
    } else if (this.props.type === MULTIPLE_CHOICE) {
      viewPane = (
        <MultipleAnswerDisplay
          index={this.props.index}
          value={this.props.value}
          answer={this.props.answer}
          option0={this.props.option0}
          option1={this.props.option1}
          option2={this.props.option2}
          option3={this.props.option3}/>
      )
      editPane = (
        <MultipleAnswerEditor
          index={this.props.index}
          value={this.props.value}
          answer={this.props.answer}
          option0={this.props.option0}
          option1={this.props.option1}
          option2={this.props.option2}
          option3={this.props.option3}/>
      )
    }
    this.setState({
      value: this.props.value,
      answer: this.props.answer,
      option0: this.props.option0,
      option1: this.props.option1,
      option2: this.props.option2,
      option3: this.props.option3,
      pane: viewPane,
      viewPane: viewPane,
      editPane: editPane,
      deletePane: deletePane
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      answer: undefined,
      option0: undefined,
      option1: undefined,
      option2: undefined,
      option3: undefined,
      pane: undefined
    }
    this.changeState = this.changeState.bind(this)
  }

  changeState(obj) {
    return (e) => {
      e.preventDefault()
      console.log(obj)
      this.setState(obj)
    }
  }

  render() {

    return(
      <div>
        <Row>
          <button onClick={this.changeState({pane:this.state.viewPane})}
            style={Styles.editButtonfront}>view</button>
          <button onClick={this.changeState({pane:this.state.editPane})}
            style={Styles.editButton}>edit</button>
          <button onClick={this.changeState({pane:this.state.deletePane})}
            style={Styles.editButtonlast}>delete</button>
        </Row>
        {this.state.pane}
      </div>
    )
  }
}

class ListQuestions extends React.Component {

  componentWillMount() {
    fetch('/questionApi/get/all')
      .then((res) => (
        res.json()
      ))
      .then((res) => {
        this.setState({questions:res})
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      questions: undefined
    }
  }

  wrap(q) {
    return(
      <ViewEditApp
        index={q.qKey}
        type={q.qType}
        value={q.qValue}
        answer={q.answer}
        option0={q.candidate1}
        option1={q.candidate2}
        option2={q.candidate3}
        option3={q.candidate4}/>
    )
  }

  render() {
    let qList = undefined
    if (this.state.questions) {
      qList = this.state.questions.map((q) => (
        this.wrap(q)
      ))
    } else {
      qList = undefined
    }
    return (
      <div style={Styles.borderSize}>
        {qList}
      </div>
    )
  }
}

export default ListQuestions