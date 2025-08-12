import MemberIcon from '../memberIcon';
import { Container, Row } from 'reactstrap';

function Team({ title, members }) {
  return (
    <section className="pt-5 mt-5">
      <h2>{title}</h2>
      <Container>
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
      </Container>
    </section>
  );
}

export default Team;
