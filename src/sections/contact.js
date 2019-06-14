import React from "react"
import ContactIcons from "../components/contactIcons"
import { graphql, useStaticQuery, withPrefix } from "gatsby"

export default () => {
  const data = useStaticQuery(
    graphql`
      query {
        allJson {
          edges {
            node {
              contact {
                cv {
                  icon {
                    brand
                    name
                  }
                  link
                }
                github {
                  icon {
                    brand
                    name
                  }
                  link
                }
                linkedIn {
                  icon {
                    brand
                    name
                  }
                  link
                }
                mail {
                  icon {
                    brand
                    name
                  }
                  link
                }
                stackOverflow {
                  icon {
                    brand
                    name
                  }
                  link
                }
                strava {
                  icon {
                    brand
                    name
                  }
                  link
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node.contact[0]

  return (
    <section className="contact-container" id="contact">
      <ContactIcons link={withPrefix(data.cv.link)} icon={data.cv.icon}></ContactIcons>
      <ContactIcons link={data.github.link} icon={data.github.icon}></ContactIcons>
      <ContactIcons link={data.linkedIn.link} icon={data.linkedIn.icon}></ContactIcons>
      <ContactIcons link={data.mail.link} icon={data.mail.icon}></ContactIcons>
      <ContactIcons link={data.stackOverflow.link} icon={data.stackOverflow.icon}></ContactIcons>
      <ContactIcons link={data.strava.link} icon={data.strava.icon}></ContactIcons>
    </section>
  )
}