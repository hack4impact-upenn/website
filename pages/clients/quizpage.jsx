import React from 'react';
import Head from '../../components/head';
import { Container, Row, Col } from 'reactstrap';
import Quiz from '../../components/clients/ProjectQuiz';
import {fetchContent} from '../../utils/fetchContent';

export async function getStaticProps() {
  const {
    pennWebsiteLayout: { projectsCollection },
  } = await fetchContent(`
  {
    pennWebsiteLayout(id: "${process.env.LAYOUT_ENTRY_ID}") {
      projectsCollection {
        items {
          title
          description {
            json
          }
          thumbnail {
            url
            description
          }
          urlSlug
          completedIn
        }
      }
    }
  }
  `);

  return {
    props: {
      projects: projectsCollection.items.filter((x) => !!x),
    },
  };
}

function QuizPage({ projects }) {
  return (
    <>
      <Head title="Nonprofit Technology Quiz" />
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="d-flex flex-column">
            <h1 className="display-6 mt-10 mb-4">Find the Right Technology Solution</h1>
            <p className="lead ">
              Answer a few questions about your nonprofit's needs, and we'll help you identify the
              best technology solutions.
            </p>

            <div className="quiz-wrapper mt-2 mb-5">
              <Quiz projects={projects} />
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        h1 {
          font-weight: 700;
          color: #333;
        }

        .lead {
          color: #666;
          line-height: 1.6;
        }

        .quiz-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .mt-10 {
          margin-top: 8rem;
        }
      `}</style>
    </>
  );
}

export default QuizPage;
