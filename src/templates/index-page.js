import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  who,
  what,
}) => (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
            })`,
          backgroundPosition: `center`,
          backgroundAttachment: `fixed`,
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '150px',
            lineHeight: '1',
            justifyContent: 'space-around',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
          <h1
            className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              boxShadow:
                '#5fa9b5 0.5rem 0px 0px, #5fa9b5 -0.5rem 0px 0px',
              backgroundColor: '#5fa9b5',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {title}
          </h1>
          <h3
            className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
            style={{
              boxShadow:
                '#5fa9b5 0.5rem 0px 0px, #5fa9b5 -0.5rem 0px 0px',
              backgroundColor: '#5fa9b5',
              color: 'white',
              lineHeight: '1',
              padding: '0.25em',
            }}
          >
            {subheading}
          </h3>
        </div>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="intro content">
                <div className="column is-12" style={{marginBottom: '1.2em'}}>
                  <h3 className="has-text-weight-semibold is-size-2">
                    {who.title}
                  </h3>
                  <div className="columns">
                    <div className="column is-5">
                      {who.image ? (
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: !!who.image.childImageSharp ? who.image.childImageSharp.fluid.src : image,
                            }}
                          /> 
                      ) : null}
                    </div>
                    <div className="column is-size-5">
                      <p>{who.description}</p>
                    </div>
                  </div>
                </div>
                <div className="column is-12 ">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {what.title}
                  </h3>
                  <div className="columns">
                    <div className="column is-size-5 ">
                      <p>{what.description}</p>
                    </div>
                    <div className="column is-5">
                      {what.image ? (
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: !!what.image.childImageSharp ? what.image.childImageSharp.fluid.src : image,
                            }}
                          /> 
                      ) : null}
                    </div>
                  </div>
                    <Link className="btn" to="/products">
                      Ver las actividades
                    </Link>
                </div>
                <div className="columns">
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        who={frontmatter.who}
        what={frontmatter.what}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        description
        who {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 450, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        what {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 450, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
