import React from 'react';
import Link from 'next/link';

const ActionButton = ({
  link,
  white,
  className = '',
  children,
  onClick,
  style,
  ...props
}) => {
  const buttonClass = `${className} ${white ? 'white-button' : 'action-button'}`.trim();

  const content = (
    <>
      {children}
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

  if (!link && !onClick) {
    console.warn('ActionButton: Neither link nor onClick prop provided');
    return null;
  }

  if (link) {
    // Internal link
    if (link.startsWith('/')) {
      return (
        <Link href={link} passHref legacyBehavior>
          <a {...props} style={style} className={buttonClass}>
            {content}
          </a>
        </Link>
      );
    }

    // External link
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        {...props}
        style={style}
        className={buttonClass}
      >
        {content}
      </a>
    );
  }

  // Button-like link with click handler
  return (
    <a
      role="button"
      onClick={onClick}
      {...props}
      style={style}
      className={buttonClass}
    >
      {content}
    </a>
  );
};

export default ActionButton;