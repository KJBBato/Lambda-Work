import React from 'react'
import Styles from '../styles'
import {Row, Col} from 'react-flexbox-grid'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {List} from 'immutable'
import FormatListView from '../components/format/formatListView'
import ListStudentQuiz from '../components/format/listStudentQuiz'

class StudentRouter extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Link to='/student/listStudentQuiz'>
            <button style={Styles.indexButton}>
              Select Quiz
            </button>
          </Link>
        </Row>
      </div>
    )
  }
}

class StudentSwitcher extends React.Component {
  render() {
    return(
      <Switch>
        <Route
          exact path='/student/listStudentQuiz'
          component={ListStudentQuiz}/>
      </Switch>

    )
  }
}


class StudentApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={Styles.backgroundSet}>
          <Row center={'xs'}>
            <Col xs={3} sm={3} md={3} lg={3}>
              <StudentRouter/>
            </Col>
            <Col xs={7} sm={7} md={7} lg={7}>
              <StudentSwitcher/>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    )
  }
}

export default StudentApp