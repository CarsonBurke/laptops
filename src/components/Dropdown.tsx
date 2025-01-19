import Link from 'next/link'
import "./Dropdown.scss"
import { JSX } from 'react/jsx-runtime';

export function Dropdown({
  header,
  children,
  classNames,
  contentClassNames,
}: {
  header: JSX.Element;
  children: React.ReactNode;
  classNames?: string;
  contentClassNames?: string;
}) {
  return (
    <div className={`dropdown ${classNames}`}>
      {header}
      <div className="dropdownContent paddingSmall defaultTransition">
        <div className={`defaultBorderRadius background3 dropdownContentChild defaultBoxShadow ${contentClassNames}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
