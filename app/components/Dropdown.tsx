import Link from 'next/link'
import "./Dropdown.scss"
import { JSX } from 'react/jsx-runtime';

interface DropdownOption {
  name: string;
  to: string;
}

function createDropdownLinks(options: DropdownOption[]) {
  let optionElements = [];

  let i = 0;
  for (const option of options) {
    optionElements.push(
      <Link
      key={i}
        href={option.to}
        className={`paddingMedium dropdownItem button textGlowButton textSmall`}
      >
        {option.name}
      </Link>
    );

    i++
  }

  return optionElements;
}

export function Dropdown({
  header,
  options,
  classNames,
  contentClassNames,
}: {
  header: JSX.Element;
  options: DropdownOption[];
  classNames?: string;
  contentClassNames?: string;
}) {
  return (
    <div className={`dropdown ${classNames}`}>
      {header}
      <div className="dropdownContent paddingSmall defaultTransition">
        <div className={`defaultBorderRadius background3 dropdownContentChild defaultBoxShadow ${contentClassNames}`}>
          {createDropdownLinks(options)}
        </div>
      </div>
    </div>
  );
}
