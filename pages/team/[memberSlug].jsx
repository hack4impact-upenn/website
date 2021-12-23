import React from 'react';
import Head from '../../components/head';
import fetchContent from '../../utils/fetchContent';
import { Row, Col } from 'reactstrap';
import ActionButton from '../../components/actionButton';

function MemberPage({ name, title, image, linkedIn, bio, classOf, email, github }) {
  return (
    <>
      <Head title={name} />
      <Row className="d-flex justify-content-center mb-5">
        <img className="thumbnail" src={image.url} alt={image.description} />
      </Row>
      <Row className="d-flex justify-content-center">
        <Col lg="4" md="6">
          <h3 className="name">{name}</h3>
          <h4 className="role">{title}</h4>
          <p className="text-center">Class of {classOf}</p>
          <div className="links">
            {linkedIn && (
              <a href={linkedIn} target="_blank" rel="noreferrer">
                <img
                  width="12"
                  className="linkedin-icon"
                  src="/icons/linkedin.svg"
                  alt={`${name}'s LinkedIn`}
                />
              </a>
            )}
            {'  '}

            {github && (
              <a href={`https://github.com/${github}`}>
                <img
                  width="12"
                  className="linkedin-icon"
                  src="/icons/github.svg"
                  alt={`${name}'s Github`}
                />
              </a>
            )}
            {'  '}
            {email && (
              <a href={`mailto:${email}`}>
                <img
                  width="12"
                  className="linkedin-icon"
                  src="/icons/email.svg"
                  alt={`${name}'s Email`}
                />
              </a>
            )}
          </div>
          <div className="card-body">{bio}</div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-5">
        <ActionButton white link="/about">
          Learn More About Us
        </ActionButton>
      </Row>

      <style jsx>{`
        .name {
          margin-top: 85px;
        }
        .role {
          text-align: center;
        }
        .links {
          text-align: center;
        }
        :global(h3) {
          text-align: center;
          margin-bottom: 10px;
        }
        :global(section) {
          padding: 30px 0;
        }
        .thumbnail {
          @media (min-width: 300px) {
            position: relative;
            top: 100px;
            max-width: 300px;
          }
          width: 50%;
          hight: auto;
          object-fit: cover;
          box-shadow: 0 10px 20px var(--primary-dark-2);
        }
      `}</style>
    </>
  );
}

export default MemberPage;

// necessary to statically render all paths
export async function getStaticPaths() {
  const {
    pennWebsiteLayout: { membersCollection },
  } = await fetchContent(`
  {
    pennWebsiteLayout(id: "${process.env.LAYOUT_ENTRY_ID}") {
      membersCollection {
        items {
          urlSlug
        }
      }
    }
  }
  `);

  const {
    pennWebsiteLayout: { alumniCollection },
  } = await fetchContent(`
  {
    pennWebsiteLayout(id: "${process.env.LAYOUT_ENTRY_ID}") {
      alumniCollection {
        items {
          urlSlug
        }
      }
    }
  }
  `);
  const memberPaths = membersCollection.items
    .filter((x) => !!x.urlSlug)
    .map(({ urlSlug }) => ({
      params: {
        memberSlug: urlSlug,
      },
    }));
  const alumniPaths = alumniCollection.items
    .filter((x) => !!x.urlSlug)
    .map(({ urlSlug }) => ({
      params: {
        memberSlug: urlSlug,
      },
    }));
  const paths = memberPaths.concat(alumniPaths);
  return {
    paths,
    fallback: false,
  };
}

// necessary to statically render all paths

export async function getStaticProps({ params: { memberSlug } }) {
  const { pennMemberProfileCollection } = await fetchContent(`
  {
    pennMemberProfileCollection(where: {urlSlug: "${memberSlug}"} limit: 1) {
      items {
        name
        title
        image {
          url
        }
        linkedIn
        bio
        classOf
        email
        github
      }
    }
  }
  `);
  if (!pennMemberProfileCollection?.items?.length) {
    throw `The slug ${memberSlug} doesn't have an associated Contentful entry.
    Make sure your getStaticPaths method is pulling the right slugs!`;
  }
  const memberContent = pennMemberProfileCollection.items[0];
  return {
    props: {
      ...memberContent,
    },
  };
}
