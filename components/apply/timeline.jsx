import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import RichText from '../richText';

function Icon({ src, alt }) {
  return (
    <>
      <img src={src} alt={alt} />
      <style jsx>{`
        img {
          width: 60%;
          height: 60%;
          margin: 20%;
        }
      `}</style>
    </>
  );
}

function Timeline({ steps }) {
  return (
    <>
      <VerticalTimeline>
        {steps &&
          steps.map(({ header, body, image }) => (
            <VerticalTimelineElement
              className="vertical-timeline-element-work"
              iconStyle={{ background: 'var(--accent-orange)', color: '#fff' }}
              icon={<Icon src={image.url} alt={image.description} />}
              key={header}>
              <h3 className="vertical-timeline-element-title">{header}</h3>
              <p>
                <RichText segments={body} />
              </p>
            </VerticalTimelineElement>
          ))}
      </VerticalTimeline>
      <style jsx>{`
        p {
          white-space: pre-line;
        }
      `}</style>
    </>
  );
}

export default Timeline;
