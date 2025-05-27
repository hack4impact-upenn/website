import Section from '../section';
import { Container, Row, Col } from 'reactstrap';
import ProjectCard from './projectCard';
import groupBy from '../../utils/groupBy';
import groupByYearSort from '../../utils/projectYear';

export default function ProjectList({ projects }) {
  const projectsByCompletion = groupBy(projects, 'completedIn');

  return (
    <Section>
      <Container>
        {Object.entries(projectsByCompletion)
          .sort(groupByYearSort)
          .map(([completedIn, projects]) => (
            <div key={completedIn}>
              <Row>
                <h2 className="section-title center">{completedIn}</h2>
              </Row>
              <Row>
                {projects.map(({ title, description, thumbnail, urlSlug }) => (
                  <Col md="4" sm="6" style={{ marginBottom: '25px' }} key={urlSlug}>
                    <ProjectCard
                      title={title}
                      description={description}
                      thumbnail={thumbnail}
                      urlSlug={urlSlug}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
      </Container>
    </Section>
  );
}
