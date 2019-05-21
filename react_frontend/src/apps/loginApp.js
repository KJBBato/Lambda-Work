import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {Row} from 'react-flexbox-grid'
import InstructorApp from './instructorApp'
import StudentApp from './studentApp'
import Styles from '../styles'
import LoginInstructions from '../instructions/loginInstructions'

class LoginSwitcher extends React.Component {
 render() {
   return(
     <Switch>
        <Route
          exact path='/instructor'
          component={InstructorApp}/>
        <Route
          exact path='/student'
          component={StudentApp}/>
        <Route
          conponent={LoginInstructions}/>
    </Switch>
   )
 }
}


class LoginApp extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <div>
          <LoginSwitcher/>
        </div>
      </BrowserRouter>
    )
  }
}

export default LoginApp