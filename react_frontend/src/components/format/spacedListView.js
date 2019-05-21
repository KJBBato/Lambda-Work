import React from 'react'
import {Row} from 'react-flexbox-grid'

class SpacedListView extends React.Component {

  render() {
    const fixedList = this.props.list.map((x) => (
      <Row>
        {x}
      </Row>
    ))
    return(
      <div>
        {fixedList}
        <Row>
          <p/>
        </Row>
      </div>
    )
  }
}

export default SpacedListView