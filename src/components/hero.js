import React from "react"
import { StaticQuery, graphql } from 'gatsby'
import Headshot from "./headshot"

const Hero = () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        allHeroJson {
          edges {
            node {
              heading
            }
          }
        }
      }
    `}
    render={data => (
      <div id="hero-container">
        <Headshot></Headshot>
        <h1>{getHeading(data)}</h1>
      </div>
    )}
  />
);

function getHeading(data) {
  return data.allHeroJson.edges[0].node.heading
}

export default Hero;