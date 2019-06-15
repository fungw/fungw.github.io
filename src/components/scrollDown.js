import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import scrollToElement from 'scroll-to-element';

export default class Surname extends React.Component {
  render() {
    return (
      <div id="scrollDown-container">
        <FontAwesomeIcon icon={this.props.icon} onClick={this.scroll.bind(this)}></FontAwesomeIcon>
      </div>
    )
  }

  scroll() {
    scrollToElement('#project-container', {
        offset: 0,
        ease: 'inOutQuart',
        duration: 1000
    });
  }
}
