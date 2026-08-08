import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { IoMdArrowDropright as ArrowIcon } from 'react-icons/io';

const content = [
  {
    header: 'Engage in your community.',
    body: 'Our community makes us special. We are a group of friends who care deeply about our organization and each other. The strength of our community comes from the contributions of its members. We welcome new members with warmth, and we make the effort to know each other beyond superficial details.',
  },
  {
    header: 'Be dependable.',
    body: 'As an organization, we trust every single member to hold themselves and others accountable. We know that our performance affects others. If we all are engaged and follow through on our commitments, then we can be confident that others have our backs.',
  },
  {
    header: 'Develop with care.',
    body: 'We build with others in mind. Empathy and compassion are crucial to serving our partner organizations and members. When we embark on projects, we work to deeply understand the people who we are helping. We write software that meets the highest standards of development. When we deliver our final products, we ensure that others can understand how to use our code and build on it.',
  },
  {
    header: 'Go beyond technology.',
    body: 'Technology is only one tool we use in our greater mission for social impact. It is easy to fall into the trap of believing technology can solve all problems. We know that technology alone is not enough. We learn from, work with, and are inspired by other organizations and individuals who are tackling social problems using a multitude of tools.',
  },
  {
    header: 'Go for it.',
    body: 'Sometimes, the only way to learn if something works is to run with it. If we waited until our plans were perfect, we would never get anywhere. Organizational roles do not determine the value of an idea: great ideas can come from anyone and anywhere. We grow because we are always trying something new.',
  },
  {
    header: 'Learn what you don’t know.',
    body: 'There is a lot to learn. In order to improve the world, we need to know about it. We recognize that we have barely scratched the surface of what is out there. We are humble about our gaps in knowledge, and are willing to answer questions with “I don’t know.” We are hungry learners, and we teach each other whenever possible.',
  },
  {
    header: 'Be open-minded.',
    body: 'Our process depends on openness to different people, topics, and perspectives. We embrace difference and work against intolerance to foster an inclusive environment. Our goal is to expose our members to the vast opportunities and daunting challenges in our work.',
  },
  {
    header: 'Be critical.',
    body: 'Criticism helps us grow. We are critical about the world we live in, our organization, and ourselves. Our community has an obligation to question the assumptions and decisions made by those around it. Our leaders constantly strive to improve our model by assessing our impact. Our members proactively ask for feedback and are forthcoming with feedback for others.',
  },
];

const OurValues = () => {
  const [selected, setSelected] = useState(() => Math.min(3, content.length - 1));
  const [displayValues, setDisplayValues] = useState([]);
  const [moveToNext, setMoveToNext] = useState(false);
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    setDisplayValues(content.slice(0, -1));

    autoScrollInterval.current = setInterval(() => {
      setMoveToNext(true);
    }, 4000);

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  const onClickNext = () => {
    if (autoScrollInterval?.current) {
      clearInterval(autoScrollInterval.current);
    }
    setMoveToNext(true);
  };

  useEffect(() => {
    // whenever we need to move to the next element...
    if (moveToNext) {
      if (content.length === 0) {
        setMoveToNext(false);
        return;
      }
      // change which card is focused (wrapping to the start of the list if necessary)
      setSelected((selected + 1) % content.length);
      // once we're done scrolling to our focused card...
      setTimeout(() => {
        // figure out what the "next" value is
        // for example, if we are currently displaying cards 1 through 5 and our list is 5 elements long,
        // the next value will be value number 1 (so we wrap back to the beginning)
        const nextValue = selected + Math.ceil(displayValues.length / 2);
        // now, chop off the first card in the list and append our "next" value onto the end
        // if we don't chop off the front, our list could be infinitely long overtime!
        setDisplayValues([...displayValues.slice(1), content[nextValue % content.length]]);
        // finally, reset our transition
        // this will essentially undo our transition to the next card,
        // but since we chopped off the first value, we won't notice this jump visually!
        setMoveToNext(false);
      }, 300);
    }
  }, [moveToNext]);
  return (
    <Container className={styles.root}>
      <h2>Our Values</h2>
      <div className={styles.carousel_container}>
        <div
          className={classNames(styles.value_card_container, {
            [styles.move]: moveToNext,
          })}>
          {displayValues.map(({ header, body }) => (
            <article
              className={classNames(styles.value_card, {
                [styles.selected]: content[selected]?.header === header,
              })}
              key={header}
              style={{ borderColor: '#0094FF' }}>
              <h3>{header}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.button_container}>
        <button
          className={styles.next_value_button}
          onClick={onClickNext}
          style={{ backgroundColor: '#0094FF' }}>
          Next <ArrowIcon />
        </button>
      </div>
    </Container>
  );
};

export default OurValues;
