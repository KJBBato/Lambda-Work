import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'

class CreateShortAnswer extends React.Component {

  componentWillMount() {
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.valueUpdate = this.valueUpdate.bind(this)
    this.answerUpdate = this.answerUpdate.bind(this)
    this.state = {
      value: '',
      answer: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    var data = {
      qType: 'SA',
      qValue: this.state.value,
      answer: this.state.answer
    }
    console.log(data)
    fetch("/questionApi/insert/sa", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).catch(function(err) {
      console.log(err)
    });
    this.setState({value:'', answer:''})
  }

  valueUpdate(event) {
    event.preventDefault()
    this.setState({value:event.target.value})
  }

  answerUpdate(event) {
    event.preventDefault()
    this.setState({answer:event.target.value})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row style={Styles.textSize}>
            Value:
          </Row>
          <Row>
            <textarea value={this.state.value} onChange={this.valueUpdate}
            style={Styles.questionArea}/>
          </Row>
          <Row style={Styles.textSize}>
            Answer:
          </Row>
          <Row>
            <textarea value={this.state.answer} onChange={this.answerUpdate}
            style={Styles.questionArea}/>
          </Row>
          <Row>
            <button style={Styles.submitButton}>
              submit
            </button>
          </Row>

        </form>
      </div>
    )
  }
}

export default CreateShortAnswer