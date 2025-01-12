export default function Checkbox({
  children,
  id,
  checked,
}: {
  children: React.ReactNode;
  id: string;
  checked?: boolean;
}) {
  return (
    <label
      className="row gapSmall centerColumn paddingSmall pointer"
      htmlFor={id}
    >
      <input type="checkbox" id={id} defaultChecked={checked} />
      <div className="row gapSmall centerColumn">{children}</div>
    </label>
  );
}
