import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ContactIcons extends Component {
  getSvg(e) {
    let element = e.target.getAttribute("data-icon");
    return !element ? e.target.parentElement : e.target;
  }

  hoverOn(e) {
    const element = this.getSvg(e);
    element.classList.add(element.getAttribute("data-icon") + '-hover');
  }

  hoverOff(e) {
    const element = this.getSvg(e);
    element.classList.remove(element.getAttribute("data-icon") + '-hover');
  }

  render() {
    const icon = this.props.icon;
    return (
      <div>
        <a href={this.props.link} id={icon.name} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}
            icon={icon.brand ? ['fab', icon.name] : icon.name}/>
        </a>
      </div>
    )
  }
}
