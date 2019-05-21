import React from 'react'
import {Row} from 'react-flexbox-grid'

class FormatListView extends React.Component{

  render() {
    const fixedList = this.props.list.map((element) => (
      <Row>
        {element}
      </Row>
    ))
    return (
      <div>
        {fixedList}
      </div>
    )
  }
}

export default FormatListView