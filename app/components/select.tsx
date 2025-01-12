export default function Select({ optionNames, groupName, className }: { optionNames: string[], groupName: string, className?: string }) {
    return (
        <select name={groupName} id={groupName} className={className + " paddingMedium pointer"}>
            {optionNames.map((optionName) => (
                <option key={optionName} value={optionName}>{optionName}</option>
            ))}
        </select>
    )
}