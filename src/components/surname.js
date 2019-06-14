import React from "react"
import { Link } from "gatsby"

export default class Surname extends React.Component {
  render() {
    return (
      <div>
        <Link id="fung" to={`/`}>
          <h1>{this.props.title}</h1>
        </Link>
      </div>
    )
  }
}
