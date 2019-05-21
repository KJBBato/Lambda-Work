import React from 'react'
import Styles from '../styles'
import {Row, Col} from 'react-flexbox-grid'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import GenerateApp from '../apps/generateApp'
import SignUpApp from '../apps/signUpApp'
import {List} from 'immutable'
import FormatListView from '../components/format/formatListView'
import ListQuestions from '../components/format/listQuestions'
import ViewApp from './viewApp'
import QuizAttemptsApp from './quizAttemptsApp'
import InstructorInstructions from '../instructions/instructorInstructions'

class InstructorRouter extends React.Component{
  render() {
    return (
      <div>
        <Row>
          <Link to='/instructor/generateApp'>
            <button style={Styles.indexButton}>
              generate
            </button>
          </Link>
        </Row>
        <Row>
          <Link to='/instructor/viewApp'>
            <button style={Styles.indexButton}>
              view/edit
            </button>
          </Link>
        </Row>
        <Row>
          <Link to='/instructor/attemptViewApp'>
            <button style={Styles.indexButton}>
              quiz attempt
            </button>
          </Link>
        </Row>
      </div>
    )
  }
}

class InstructorSwitcher extends React.Component {
  render() {
    return(
      <Switch>

        <Route
          exact path='/instructor/generateApp'
          component={GenerateApp}/>
        <Route
          exact path='/instructor/viewApp'
          component={ViewApp}/>
        <Route
          exact path='/instructor/attemptViewApp'
          component={QuizAttemptsApp}/>
          <Route
            component={InstructorInstructions}/>
      </Switch>

    )
  }
}

class InstructorApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Row center={'xs'}>
            <Col xs={3} sm={3} md={3} lg={3}>
              <InstructorRouter/>
            </Col>
            <Col xs={7} sm={7} md={7} lg={7}>
              <InstructorSwitcher/>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    )
  }
}

export default InstructorApp