import React from 'react';
import { Collapse } from 'reactstrap';
import RichText from './richText';

function FaqQuestion({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="item">
        {/* eslint-disable */}
        <div className={`question ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <a>{question}</a>
          <a className="expand-sign">+</a>
        </div>
        {/* eslint-enable */}
        <Collapse isOpen={isOpen}>
          <div className="answer">
            <p>
              <RichText segments={answer} />
            </p>
          </div>
        </Collapse>
      </div>
      <style jsx>{`
        .item {
          border-bottom: 1px solid #e9ecef;
        }
        .question {
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          justify-content: space-between;
          min-height: 75px;
          font-size: 20px;
          text-transform: none;
          color: black;
          cursor: pointer;
          outline-width: 0px;
          margin: 0px;
        }
        .active {
          color: var(--primary-blue);
        }
        .expand-sign {
          float: right;
          padding-right: 10px;
        }
        .answer {
          margin: 0 10px;
          color: var(--gray);
        }
        .answer p {
          white-space: pre-line;
        }
      `}</style>
    </>
  );
}

export default FaqQuestion;
