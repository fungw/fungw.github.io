import React from "react"
import Layout from "../components/layout"
import Hero from "../sections/hero"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faFilePdf, faLongArrowAltDown)

export default () => {
  return (
    <Layout>
      <Hero></Hero>
    </Layout>
  )
}