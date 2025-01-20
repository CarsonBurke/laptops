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
    let keys = Object.keys(optionNames);

    for (let i = 0; i < keys.length; i++) {
      let groupName = keys[i];
      groups.push(
        <optgroup label={groupName} key={i}>
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
