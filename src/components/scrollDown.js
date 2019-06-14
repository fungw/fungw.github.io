import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Surname extends React.Component {
  render() {
    return (
      <div id="scrollDown-container">
        <a><FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon></a>
      </div>
    )
  }
}
