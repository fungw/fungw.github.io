import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

const Headshot = () => (
  <StaticQuery
    query={graphql`
      query {
        imageHeadshot: file(relativePath: { eq: "headshot.png" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div id="headshot-container">
        <Img fluid={data.imageHeadshot.childImageSharp.fluid}/>
      </div>
    )}
  />
);

export default Headshot;