export default function Select({
  optionNames,
  groupName,
  className,
  onInput,
}: {
  optionNames: { [label: string]: string[] };
  groupName: string;
  className?: string;
  onInput: (value: string) => void;
}) {
  function constructOptGroups() {
    let groups = [];

    for (groupName in optionNames) {
      groups.push(
        <optgroup label={groupName}>
          {optionNames[groupName].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </optgroup>
      );
    }

    return groups;
  }

  return (
    <select
      name={groupName}
      id={groupName}
      className={className + " paddingMedium pointer"}
      onChange={(event) => onInput(event.target.value)}
    >
      {constructOptGroups()}
    </select>
  );
}
