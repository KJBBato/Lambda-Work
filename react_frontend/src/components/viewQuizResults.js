import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'
import AttemptViewApp from '../../apps/attemptViewApp'

class viewQuizResults extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.changeState = this.changeState.bind(this)
    this.state = {
      studentId: '',
      attempts: undefined
    }
  }

  changeState(obj) {
    return (e) => {
      e.preventDefault()
      console.log(obj)
      this.setState(obj)
    }
  }

  wrap(a) {
    return(
      <AttemptViewApp
          attemptKey={a.attemptKey}
	      studentUsername={a.studentUsername}
	      qValue={a.qValue}
	      qType={a.qType}
	      option0={a.candidate1}
	      option1={a.candidate2}
	      option2={a.candidate3}
	      option3={a.candidate4}
	      studentAnswer={a.studentAnswer}
	      grade={a.grade}/>
    )
  }

  handleSearch(e){
  	fetch('/attempt/get/' + this.state.studentId)
      .then((res) => (
        res.json()
      ))
      .then((res) => {
        this.setState({attempts:res})
        console.log(this.state.attempts)
      })
  }

  render(){
  	return (
  	  <div>
  		<form onSubmit={this.handleSearch}>
          <Row style={Styles.textSize}>
            Student ID:
          </Row>
          <Row>
            <textarea value={this.state.studentId} onChange={this.changeState({studentId: this.state.studentId})}
            style={Styles.textArea}/>
          </Row>
          <Row>
            <button type={'submit'}
              style={Styles.submitButton}>
              Search
            </button>
          </Row>
        </form>
        <row/>
        {this.state.attempts}
       </div>
  	)
  }

}

export default ViewQuizResults