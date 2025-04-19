import React from 'react';
import Link from 'next/link';

function Anchor({ link, white, className, children, onClick, style, ...props }) {
  return (
    <>
      <a
        {...props}
        href={link}
        onClick={onClick}
        style={style}
        className={`${className ?? ''} ${white ? 'white-button' : 'action-button'}`}>
        {children}
      </a>
      <style jsx>{`
        a {
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 0.8rem 2.5rem;
          border: none;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          text-align: center;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-size: 0.9rem;
          display: inline-block;
        }
        .white-button {
          background: white;
          color: var(--black);
        }
        .action-button {
          background: var(--primary-blue);
          color: white;
        }

        a:hover {
          box-shadow: rgba(0, 0, 0, 0.12) 3px 5px 20px;
          transform: translateY(-2px);
        }

        a:active {
          transform: translateY(0);
        }

        .btn-outline-primary {
          background: transparent;
          border: 2px solid var(--primary-blue);
          color: var(--primary-blue);
        }

        .btn-outline-primary:hover {
          background: var(--primary-blue);
          color: white;
        }
      `}</style>
    </>
  );
}

const ActionButton = ({ link, onClick, ...props }) => {
  if (!link && !onClick) {
    console.warn('ActionButton: Neither link nor onClick prop provided');
    return null;
  }

  if (link) {
    return link.startsWith('/') ? (
      <Link href={link}>
        <Anchor {...props} />
      </Link>
    ) : (
      <Anchor {...props} target="_blank" rel="noreferrer" />
    );
  }

  return <Anchor onClick={onClick} {...props} />;
};

export default ActionButton;
