import React from 'react';
import Section from '../../section';
import { Container, Row } from 'reactstrap';

export default function ServicesDetail({ content, title }) {
  return (
    <Section>
      <Container>
        <Row>
          <h2 className="text-center">{title}</h2>
        </Row>

        <Row>
          <p>{content}</p>
        </Row>
      </Container>
    </Section>
  );
}
