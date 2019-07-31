import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import Layout from "../components/layout"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faFilePdf, faLongArrowAltDown)

export default () => {
  return (
    <Layout>
      <Header></Header>
      <Footer></Footer>
    </Layout>
  )
}