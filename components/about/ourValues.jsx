import { Container, Row, Card, CardDeck, CardBody, Col } from 'reactstrap';
import Section from '../section';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import { FaBullseye } from 'react-icons/fa';
import { IoMdArrowDropright as ArrowIcon } from 'react-icons/io';

const OurValues = ({ content }) => {
  const [selected, setSelected] = useState(3);
  const [displayValues, setDisplayValues] = useState([]);
  const [moveToNext, setMoveToNext] = useState(false);
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    setDisplayValues(content.slice(0, -1));

    // autoScrollInterval.current = setInterval(() => {
    //   setMoveToNext(true);
    // }, 4000);

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
  console.log(`Selected:${content[selected].header}`);
  return (
    <Container className={styles.root}>
      <h2>Our Values</h2>
      <div className={styles.carousel_container}>
        <div
          className={classNames(styles.value_card_container, {
            [styles.move]: moveToNext,
          })}>
          {displayValues.map(({ header, body, image }) => (
            <article
              className={classNames(styles.value_card, {
                [styles.selected]: content[selected].header === header,
              })}
              key={header}
              style={{ borderColor: '#0094FF' }}>
              {/* <FaBullseye style={{ fill: '#0094FF' }} size={50} /> */}
              <h3>{header}</h3>
              <p>{body.json.content[0].content[0].value}</p>
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
