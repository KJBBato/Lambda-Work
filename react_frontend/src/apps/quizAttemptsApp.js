import React from 'react'
import Styles from '../styles'
import ListAttempts from '../components/format/listAttempts'

class QuizAttemptRouter extends React.Component {

}

class QuizAttemptSwitcher extends React.Component {

}

class QuizAttemptApp extends React.Component {
  render() {
    return(
      <div style={Styles.textSize}>
        <ListAttempts/>
      </div>
    )
  }
}

export default QuizAttemptApp