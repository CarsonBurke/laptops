export default function RadioGroup({
  optionNames,
  groupName,
}: {
  optionNames: string[];
  groupName: string;
}) {
  return (
    <div className="column gapSmall">
      <fieldset radioGroup={groupName}>{generateFields(optionNames, groupName)}</fieldset>
    </div>
  );
}

function generateFields(optionNames: string[], groupName: string) {
  let elements = [];

  for (let i = 0; i < optionNames.length; i++) {
    elements.push(
      <div className="row gapSmall centerColumn">
        <input name={groupName} type="radio" className="row gapSmall" key={i} id={groupName + i} />
        <label className="textSmall" htmlFor={groupName + i}>{optionNames[i]}</label>
      </div>
    );
  }

  return elements;
}
