import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              project {
                title
                content {
                  title
                  description
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.project
  return (
    <section id="project">
      <h1>{data.title}</h1>
      {data.content.map(( node , index ) => (
        <div key={index}>
          <h2>{node.title}</h2>
          <p>{node.description}</p>
        </div>
      ))}
    </section>
  )
}