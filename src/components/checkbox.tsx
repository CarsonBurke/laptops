"use client"

export default function Checkbox({
  children,
  id,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  id: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className="row gapSmall centerColumn paddingSmall pointer"
      htmlFor={id}
    >
      <input type="checkbox" id={id} defaultChecked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className="row gapSmall centerColumn">{children}</div>
    </label>
  );
}
