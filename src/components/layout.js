import React from "react"
import Surname from "./surname"
import { graphql, useStaticQuery } from "gatsby"

export default ({ children }) => {
  const surname = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              about {
                title
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.about.title

  return (
    <main className="layout-container">
      <Surname title={surname}></Surname>
      {children}
    </main>
  )
}