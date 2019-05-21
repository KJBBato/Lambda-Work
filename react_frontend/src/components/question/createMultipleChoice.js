import React from 'react'
import {Row} from 'react-flexbox-grid'
import Styles from '../../styles'

class CreateMultipleChoice extends React.Component {

  componentWillMount() {
  }

  constructor (props){
    super(props)
    this.state = {
      option0: undefined,
      option1: undefined,
      option2: undefined,
      option3: undefined,
      answer: undefined,
      value: undefined,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeText = this.changeText.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  changeState(obj) {
    return (event) => {
      event.preventDefault()
      this.setState(obj)
    }
  }

  changeText(field) {
    return (event) => {
      event.preventDefault()
      this.setState({[field]: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    var data = {
      qType: 'MC',
      qValue: this.state.value,
      answer: this.state.answer,
      candidate1: this.state.option0,
      candidate2: this.state.option1,
      candidate3: this.state.option2,
      candidate4: this.state.option3,
    }
    console.log(data)
    fetch("/questionApi/insert/mc", {
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
    this.setState({value:'', answer:'', option0:'', option1:'', option2:'', option3:''})
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <Row style={Styles.textSize}>
              Question:
            </Row>
            <Row>
              <textarea
                value={this.state.value}
                onChange={this.changeText('value')}
                style={Styles.questionArea}/>
            </Row>
            <Row style={Styles.textSize}>
              Option A:
            </Row>
            <Row>
              <textarea
                value={this.state.option0}
                onChange={this.changeText('option0')}
                style={Styles.questionArea}/>
            </Row>
            <Row style={Styles.textSize}>
              Option B:
            </Row>
            <Row>
              <textarea
                value={this.state.option1}
                onChange={this.changeText('option1')}
                style={Styles.questionArea}/>
            </Row>
            <Row style={Styles.textSize}>
              Option C:
            </Row>
            <Row>
              <textarea
                value={this.state.option2}
                onChange={this.changeText('option2')}
                style={Styles.questionArea}/>
            </Row>
            <Row style={Styles.textSize}>
              Option D:
            </Row>
            <Row>
              <textarea
                value={this.state.option3}
                onChange={this.changeText('option3')}
                style={Styles.questionArea}/>
            </Row>
            <Row style={Styles.textSize}>
              Answer:
            </Row>
            <Row>
              <select onChange={this.changeText('answer')}
                style={Styles.selectBar}>
                <option value={''}>
                Which option is correct?
                </option>
                <option value={0}>A</option>
                <option value={1}>B</option>
                <option value={2}>C</option>
                <option value={3}>D</option>
              </select>
            </Row>
            <Row>
              <button style={Styles.submitButton}>submit</button>
            </Row>
          </form>

      </div>
    )
  }
}

export default CreateMultipleChoice