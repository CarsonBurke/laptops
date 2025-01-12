'use client';

import Link from 'next/link';
import { JSX, MouseEventHandler } from 'react';

interface ButtonProps {
  id?: string;
  children: JSX.Element | JSX.Element[] | string | (string | JSX.Element)[];
  className?: string;
  linkTo?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  if (props.linkTo !== undefined) {
    return (
      <Link id={props.id} href={props.linkTo} className={`button ${props.className}`}>
        {props.children}
      </Link>
    );
  }

  return (
    <button id={props.id} onClick={props.onClick} className={`button ${props.className}`}>
      {props.children}
    </button>
  );
}
