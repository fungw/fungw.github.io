import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticQuery, graphql } from 'gatsby'

const Contacts = () => (
  <StaticQuery
    query={graphql`
      query ContactsQuery {
        allContactsJson {
          edges {
            node {
              icon {
                brand
                name
              }
              link
            }
          }
        }
      }
    `}
    render={data => (
      <div id="contact-container">
        {getContactDetails(data)}
      </div>
    )}
  />
);

function getContactDetails(data) {
  const contactDetailsArray = [];
  let icon, link;
  data.allContactsJson.edges.forEach(item => {
    icon = item.node.icon;
    link = item.node.link;
    contactDetailsArray.push(
      <div key={icon.name}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon id={icon.name} icon={icon.brand ? ['fab', icon.name] : icon.name}/>
        </a>
      </div>
    )
  })
  return contactDetailsArray;
}

export default Contacts;