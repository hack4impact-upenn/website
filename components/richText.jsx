import React from 'react';

function renderSegment(segment, i) {
  let node = segment.text;
  if (segment.code) node = <code>{node}</code>;
  if (segment.italic) node = <em>{node}</em>;
  if (segment.bold) node = <strong>{node}</strong>;
  if (segment.strikethrough) node = <s>{node}</s>;
  if (segment.href) {
    node = (
      <a href={segment.href} target="_blank" rel="noreferrer">
        {node}
      </a>
    );
  }
  return <React.Fragment key={i}>{node}</React.Fragment>;
}

export default function RichText({ segments }) {
  if (!segments || segments.length === 0) return null;
  return segments.map(renderSegment);
}
