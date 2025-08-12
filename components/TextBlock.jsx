import React from 'react';

function TextBlock({ content, className, id }) {
  if (!content) return null;
  
  return (
    <div
      className={className}
      id={id}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default TextBlock; 