import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              work {
                title
                content {
                  title
                  role
                  description
                  location
                  date
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.work
  return (
    <section id="work">
      <h1>{data.title}</h1>
      {data.content.map(( node , index ) => (
        <div key={index}>
          <div>
            <h2>{node.title}</h2>
            <p>{node.location}</p>
          </div>
          <div>
            <h3>{node.role}</h3>
            <p>{node.date}</p>
          </div>
          <p>{node.description}</p>
        </div>
      ))}
    </section>
  )
}