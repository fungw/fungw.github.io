import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              about {
                content {
                  title
                  basedIn
                  previously
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.about.content[0]
  
  return (
    <section id="about">
      <h1>{data.title}</h1>
      <h2>{data.basedIn}</h2>
      <p>{data.previously}</p>
    </section>
  )
}