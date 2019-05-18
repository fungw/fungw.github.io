import React from "react"
import layoutStyles from "./layout.module.sass"

export default ({ children }) => (
  <div className={layoutStyles.container}>{children}</div>
)