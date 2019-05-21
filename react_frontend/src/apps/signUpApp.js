import React from 'react'
import {Row} from 'react-flexbox-grid'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Styles from '../styles'
import InstructorSignUp from '../components/signup/instructorSignUp'
import StudentSignUp from '../components/signup/studentSignUp'

class SignUpSwitcher extends React.Component {
  render() {
    return(
      <Switch>
        <Route
          exact path='/SignUpApp/InstructorSignUp'
          component={InstructorSignUp}/>
        <Route
          exact path='/SignUpApp/StudentSignUp'
          component={StudentSignUp}/>

      </Switch>
    )
  }
}

class SignUpRouter extends React.Component {
  render() {
    return(
      <Row>
        <Link to='/SignUpApp/InstructorSignUp'
          style={Styles.subIndexLink}>
          instructor sign up
        </Link>
        <Link to='/SignUpApp/StudentSignUp'
          style={Styles.subIndexLink}>
          student sign up
        </Link>
      </Row>
    )
  }
}

class SignUpApp extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <SignUpRouter/>
          <SignUpSwitcher/>
        </div>
      </BrowserRouter>
    )
  }
}

export default SignUpApp