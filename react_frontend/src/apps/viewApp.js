import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import {Row} from 'react-flexbox-grid'
import Styles from '../styles'
import ListQuestions from '../components/format/listQuestions'
import ListQuizzes from '../components/format/listQuizzes'
import ViewInstructions from '../instructions/viewInstructions'

class ViewRouter extends React.Component {
  render() {
    return(
      <div>
        <Route
          exact path='/viewApp/questions'
          component={ListQuestions}/>
        <Route
          exact path='/viewApp/quizzes'
          component={ListQuizzes}/>
        <Route
          component={ViewInstructions}/>
      </div>
    )
  }
}

class ViewSwitcher extends React.Component {
  render() {
    return(
      <Switch>
        <Row>
          <Link to='/viewApp/questions'
            style={Styles.subIndexLink}>
            questions
          </Link>
          <Link to='/viewApp/quizzes'
            style={Styles.subIndexLink}>
            quizzes
          </Link>
        </Row>
      </Switch>
    )
  }
}

class ViewApp extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <ViewSwitcher/>
          <ViewRouter/>
        </div>
      </BrowserRouter>
    )
  }
}

export default ViewApp