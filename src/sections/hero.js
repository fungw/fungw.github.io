import React from "react"
import ContactIcons from "../components/contactIcons"
import ScrollDown from "../components/scrollDown"
import Surname from "../components/surname"
import { graphql, useStaticQuery, withPrefix } from "gatsby"

export default () => {
  const data = useStaticQuery(
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
        allJson {
          edges {
            node {
              hero {
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
        allJson {
          edges {
            node {
              hero {
                scrollDown {
                  icon
                }
              }
            }
          }
        }
      }
    `
  ).allJson.edges[0].node

  const contact = data.hero.contact;
  const scroll_down = data.hero.scrollDown;

  return (
    <section id="hero-container">
      <Surname title={data.about.title}></Surname>
      <div id="contact-container">
        <ContactIcons link={withPrefix(contact.cv.link)} icon={contact.cv.icon}></ContactIcons>
        <ContactIcons link={contact.github.link} icon={contact.github.icon}></ContactIcons>
        <ContactIcons link={contact.linkedIn.link} icon={contact.linkedIn.icon}></ContactIcons>
        <ContactIcons link={contact.mail.link} icon={contact.mail.icon}></ContactIcons>
        <ContactIcons link={contact.stackOverflow.link} icon={contact.stackOverflow.icon}></ContactIcons>
        <ContactIcons link={contact.strava.link} icon={contact.strava.icon}></ContactIcons>
      </div>
      <ScrollDown icon={scroll_down.icon}></ScrollDown>
    </section>
  )
}