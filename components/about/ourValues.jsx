import React from 'react';
import { Container, Row, Card, CardDeck, CardBody, Col } from 'reactstrap';
import Section from '../section';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const OurValues = ({ content }) => {
  return (
    <Section darkgrey>
      <Container>
        <Row>
          <div className="text-center project-detail-title">
            <h2>Our Values</h2>
          </div>
        </Row>
        <Row>
          {content.map(({ header, body, image }) => (
            <Col
              md="4"
              sm="6"
              style={{
                marginBottom: '25px',
                height: '400px',
                width: '400px',
              }}>
              <Card key={header}>
                {/* <img className="card-img-top" src={image.url} alt={image.description} /> */}
                <CardBody
                  style={{
                    height: '400px',
                    width: '320px',
                  }}>
                  <h4 className="text-title">{header}</h4>
                  <div
                    style={{
                      paddingLeft: '5px',
                      paddingRight: '15px',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(body.json),
                    }}></div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
};

export default OurValues;
