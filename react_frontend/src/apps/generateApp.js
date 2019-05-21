import React from 'react'
import {Row} from 'react-flexbox-grid'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import Styles from '../styles'
import CreateShortAnswer from '../components/question/createShortAnswer'
import CreateMultipleChoice from '../components/question/createMultipleChoice'
import GenerateInstructions from '../instructions/generateInstructions'
import SelectQuestions from '../components/quiz/createQuiz'

class GenerateRouter extends React.Component {
  render() {
    return(
      <Row>
        <Link to='/generateApp/createShortAnswer'
          style={Styles.subIndexLink}>
          short answer
        </Link>
        <Link to='/generateApp/createMultipleChoice'
          style={Styles.subIndexLink}>
          multiple choice
        </Link>
        <Link to='/generateApp/createQuiz'
          style={Styles.subIndexLink}>
          quiz
        </Link>
      </Row>
    )
  }
}

class GenerateSwitcher extends React.Component {
  render() {
    return(
      <Switch>
        <Route
          exact path='/generateApp/createShortAnswer'
          component={CreateShortAnswer}/>
        <Route
          exact path='/generateApp/createMultipleChoice'
          component={CreateMultipleChoice}/>
        <Route
          exact path='/generateApp/createQuiz'
          component={SelectQuestions}/>
        <Route
          path=''
          component={GenerateInstructions}/>
      </Switch>
    )
  }
}

class GenerateApp extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <GenerateRouter/>
          <GenerateSwitcher/>
        </div>
      </BrowserRouter>
    )
  }
}

export default GenerateApp