import React from 'react';
import Link from 'next/link';
import styles from '../styles/ActionButton.module.css'; // Adjust path as needed
import clsx from 'clsx'; // Optional, or just use template literals

const ActionButton = ({
  link,
  white,
  className = '',
  children,
  onClick,
  style,
  ...props
}) => {
  const buttonClass = clsx(
    styles.buttonBase,
    white ? styles.white : styles.action,
    className
  );

  if (!link && !onClick) {
    console.warn('ActionButton: Neither link nor onClick provided');
    return null;
  }

  if (link) {
    const isInternal = link.startsWith('/');
    return isInternal ? (
      <Link href={link} passHref legacyBehavior>
        <a className={buttonClass} style={style} {...props}>
          {children}
        </a>
      </Link>
    ) : (
      <a
        href={link}
        className={buttonClass}
        style={style}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      role="button"
      onClick={onClick}
      className={buttonClass}
      style={style}
      {...props}
    >
      {children}
    </a>
  );
};

export default ActionButton;