import React from 'react';
import { Container, Row } from 'reactstrap';
import DirectorQuotes from './DirectorQuotes';
import Section from '../section';
import MemberIcon from '../memberIcon';
import groupBy from '../../utils/groupBy';

function Team({ directorQuotes, members, alumni }) {
  const alumByClass = groupBy(alumni, 'classOf');
  return (
    <Section>
      <Container>
        <DirectorQuotes content={directorQuotes} />
        <Row>
          {members.map((member) => (
            <MemberIcon
              key={member.name}
              name={member.name}
              title={member.title}
              image={member.image}
              linkedIn={member.linkedIn}
            />
          ))}
        </Row>
        <h2 className="p-5 m-3 center"> Alumni </h2>
        {Object.entries(alumByClass)
          .sort()
          .reverse()
          .map(([classOf, alum]) => (
            <div key={classOf}>
              <Row>
                <h2 className="section-title center">Class of {classOf}</h2>
              </Row>
              <Row>
                {alum.map((member) => (
                  <MemberIcon
                    key={member.name}
                    name={member.name}
                    title={member.title}
                    image={member.image}
                    linkedIn={member.linkedIn}
                  />
                ))}
              </Row>
            </div>
          ))}
      </Container>
    </Section>
  );
}

export default Team;
