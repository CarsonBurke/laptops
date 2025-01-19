export default function Select({ optionNames, groupName, className, onInput }: { optionNames: string[], groupName: string, className?: string, onInput: (value: string) => void }) {
    return (
        <select name={groupName} id={groupName} className={className + " paddingMedium pointer"} onChange={(event) => onInput(event.target.value)}>
            {optionNames.map((optionName) => (
                <option key={optionName} value={optionName}>{optionName}</option>
            ))}
        </select>
    )
}