import React from "react"
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from "react-helmet";
import Surname from "../components/surname"

const Header = () => (
  <StaticQuery
    query={graphql`
      query TitleQuery {
        allHeaderJson {
          edges {
            node {
              title
            }
          }
        }
      }
    `}
    render={data => (
      <header>
        <Helmet>
            <title>{getTitle(data)}</title>
        </Helmet>
        <Surname></Surname>
      </header>
    )}
  />
)

function getTitle(data) {
  return data.allHeaderJson.edges[0].node.title
}

export default Header;