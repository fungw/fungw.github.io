import React from "react"
import headerStyles from './header.module.sass'

export default ({ content }) => (
  <header className={headerStyles.container}>
    <h1>{ content.owner }</h1>
    <div>
      <h1>{ content.introduction }<br/>{content.basedIn}</h1>
      <h2>{ content.previously }</h2>
    </div>
  </header>
)