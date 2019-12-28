module.exports = {
  siteMetadata: {
    title: `wesleyfung.com`,
    description: `Source code for personal website wesleyfung.com`,
    author: `@fungw`,
  },
  plugins: [
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `./static/favicons/favicon-32x32.png`,
        icons: [
          {
            "src":"./static/favicons/android-chrome-192x192.png",
            "sizes":"192x192",
            "type":"image/png"
          },
          {
            "src":"./static/favicons/android-chrome-512x512.png",
            "sizes":"512x512",
            "type":"image/png"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Libre Franklin`
          },
          {
            family: `Rubik`
          },
          {
            family: `Yesteryear`
          }
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      },
    },
    {
      resolve: `gatsby-transformer-json`
    },
    `gatsby-transformer-sharp`
  ]
}
