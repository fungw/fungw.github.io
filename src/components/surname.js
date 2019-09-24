import React from "react"
import { StaticQuery, graphql } from 'gatsby'

const Surname = () => (
  <StaticQuery
    query={graphql`
      query SurnameQuery {
        allHeaderJson {
          edges {
            node {
              title
              surname
            }
          }
        }
      }
    `}
    render={data => (
      <div id="surname-container">
        <h1>{getSurname(data)}</h1>
      </div>
    )}
  />
);

function getSurname(data) {
  return data.allHeaderJson.edges[0].node.surname
}

export default Surname;