import React from 'react';
import { Container, Row } from 'reactstrap';
import MemberIcon from '../memberIcon';
import CoDirectorIcon from '../CoDirectorIcon';

function ExecBoard({ execBoard }) {
  return (
    <Container>
      <h3 className="p-2 m-3 center">Co-Directors</h3>
      <Row className="justify-content-md-center">
        {execBoard
          .filter((x) => x.title === 'Co-Director')
          .map((member) => (
            <CoDirectorIcon
              key={member.name}
              name={member.name}
              image={member.image}
              title={member.title}
              linkedIn={member.linkedIn}
              memberSlug={`/team/${member.urlSlug}`}
            />
          ))}
      </Row>
      <h3 className="p-2 m-3 center">Executive Board</h3>
      <Row>
        {execBoard
          .filter((x) => x.title !== 'Co-Director')
          .map((member) => (
            <MemberIcon
              key={member.name}
              name={member.name}
              image={member.image}
              title={member.title}
              linkedIn={member.linkedIn}
              memberSlug={`/team/${member.urlSlug}`}
            />
          ))}
      </Row>
    </Container>
  );
}

export default ExecBoard;
