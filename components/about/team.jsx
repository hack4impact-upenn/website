import React from 'react';
import { Container, Row } from 'reactstrap';
import Section from '../section';
import MemberIcon from '../memberIcon';
import ExecBoard from '../about/ExecBoard';
import groupBy from '../../utils/groupBy';

function Team({ members, alumni, execBoard }) {
  const alumByClass = groupBy(alumni, 'classOf');
  return (
    <Section>
      <Container>
        <h1 className="p-3 m-3 center">Our Team</h1>
        <ExecBoard execBoard={execBoard} />
        <h2 className="p-5 m-3 center">Developers</h2>
        <Row>
          {members
            .filter(
              (member) =>
                ![
                  'Co-Director',
                  'Projects Chair',
                  'Education Chair',
                  'Community Chair',
                  'External Relations Chair',
                ].includes(member.title),
            )
            .map((member) => (
              <MemberIcon
                key={member.name}
                name={member.name}
                // title={member.title}
                image={member.image}
                memberSlug={`/team/${member.urlSlug}`}
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
                <h4 className="class-title center">Class of {classOf}</h4>
              </Row>
              <Row>
                {alum.map((member) => (
                  <MemberIcon
                    key={member.name}
                    name={member.name}
                    // title={member.title}
                    image={member.image}
                    memberSlug={`/team/${member.urlSlug}`}
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
