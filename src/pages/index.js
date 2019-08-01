import React from "react"
import Footer from "../sections/footer"
import Header from "../sections/header"
import Layout from "../components/layout"
import Main from "../sections/main"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faFilePdf, faLongArrowAltDown)

export default () => {
  return (
    <Layout>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </Layout>
  )
}