import React from 'react';
import Head from '../../components/head';
import { fetchNotionContent, fetchProjectDetail } from '../../utils/fetchContent';
import Team from '../../components/projects/Team';
import FeatureSlider from '../../components/projects/featureSlider';
import ProjectQuote from '../../components/quote';
import TextBlock from '../../components/TextBlock';
import ActionButton from '../../components/actionButton';
import { Row, Col, Container } from 'reactstrap';
import GradientBanner from '../../components/gradientBanner';
import ProjectTechUsed from '../../components/projects/projectTechUsed';

function ProjectPage({
  title,
  description,
  thumbnail,
  finalProductLink,
  codeRepoLink,
  project,
  client,
  impact,
  featuresCollection,
  testimonialsCollection,
  technologiesUsed,
  teamMembersCollection,
  pmtlCollection,
}) {
  return (
    <>
      <Head title={title} />
      <GradientBanner title={title} subHeadline={description}>
        {finalProductLink ? (
          <>
            <ActionButton className="mr-3" link={finalProductLink}>
              Try our final product
            </ActionButton>
            <ActionButton white link={codeRepoLink}>
              See our code
            </ActionButton>
          </>
        ) : (
          <ActionButton
            white
            link={codeRepoLink ? codeRepoLink : 'https://github.com/hack4impact-upenn'}>
            See our code
          </ActionButton>
        )}
      </GradientBanner>
      <section className="pt-0">
        <Row className="d-flex justify-content-center mb-5">
          <img className="thumbnail" src={thumbnail.url} alt={thumbnail.description} />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col lg="4" md="6">
            <h2 className="mb-3">About the Project</h2>
            <div className="card-body">
              <TextBlock content={project} />
            </div>
          </Col>
          <Col lg="4" md="6">
            <h2 className="mb-3">About the Client</h2>
            <div className="card-body">
              <TextBlock content={client} />
            </div>
          </Col>
        </Row>
      </section>
      {featuresCollection.items.length > 0 && <FeatureSlider features={featuresCollection.items} />}
      <section>
        <Container>
          <Row className="d-flex justify-content-center">
            <h2 className="mb-3">Impact</h2>
            <TextBlock content={impact} />
          </Row>
        </Container>
      </section>
      {technologiesUsed && <ProjectTechUsed technologiesUsed={technologiesUsed.split(',').map((t) => t.trim())} />}
      {testimonialsCollection.items.map(({ author, quote }, index) => {
        const [authorName, authorTitle] = author.split(',');
        return (
          <ProjectQuote
            key={`${authorName}-${index}`}
            quote={quote}
            source={authorName}
            sourceTitle={authorTitle}
          />
        );
      })}
      {pmtlCollection.items.length > 0 && <Team title="Project Leads" members={pmtlCollection.items} />}
      {teamMembersCollection.items.length > 0 && <Team title="Team Members" members={teamMembersCollection.items} />}
      <Row className="d-flex justify-content-center mb-5">
        <ActionButton white link="/projects">
          See more of our projects
        </ActionButton>
      </Row>
      <style jsx>{`
        :global(h2) {
          text-align: center;
          margin-bottom: 50px;
        }
        :global(section) {
          padding: 40px 0;
        }
        .thumbnail {
          @media (min-width: 600px) {
            position: relative;
            top: -30px;
            max-width: 500px;
          }
          width: 100%;
          object-fit: cover;
          box-shadow: 0 10px 20px var(--primary-dark-2);
        }
      `}</style>
    </>
  );
}

export default ProjectPage;

export async function getStaticPaths() {
  try {
  const {
    pennWebsiteLayout: { projectsCollection },
    } = await fetchNotionContent('projects');

  const paths = projectsCollection.items
      .filter((x) => !!x && !!x.urlSlug)
    .map(({ urlSlug }) => ({
      params: {
        projectSlug: urlSlug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params: { projectSlug } }) {
  try {
    const formattedProject = await fetchProjectDetail(projectSlug);
    
    if (!formattedProject) {
      throw new Error(`No project found with slug: ${projectSlug}`);
  }

  return {
      props: formattedProject,
    };
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return {
      notFound: true,
  };
  }
}
