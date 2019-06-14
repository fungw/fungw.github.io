import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              education {
                title
                content {
                  title
                  date
                  degree {
                    title
                  }
                  description
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.education
  
  return (
    <section id="education">
      <h1>{data.title}</h1>
      {data.content.map(( node , index ) => (
        <div key={index}>
          <div>
            <h2>{node.title}</h2>
            <p>{node.date}</p>
          </div>
          <div>
            {node.degree ? (
              node.degree.map(( degrees, index) => (
                <div key={index}>
                  <p>{degrees.title}</p>
                </div>
              ))
            ) : (
              <p>{node.description}</p>
            )
            }
          </div>
        </div>
      ))}
    </section>
  )
}