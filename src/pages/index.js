import React from "react"
import Layout from "../components/layout"
import Contact from "../sections/contact"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faFilePdf)

export default () => {
  return (
    <Layout>
      <Contact></Contact>
    </Layout>
  )
}