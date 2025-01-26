import "./tableDouble.scss";

export default function TableDouble({
  header,
  rows,
  background,
}: {
  header?: React.ReactNode;
  rows: [React.ReactNode, React.ReactNode][];
  background: string;
}) {
  let rowEls = [];

  for (let i = 0; i < rows.length; i++) {

    const [header, value] = rows[i];

    rowEls.push(
      <div
      key={i}
        className={
          background + " tableDoubleRow row spaceBetween paddingMedium"
        }
      >
        {header}
        {value}
      </div>
    );
  }

  return (
    <div className="tableDoubleContainer column gapSmall">
      {header}
      <div className="tableDouble noOverflow defaultBorderRadius column">
        {rowEls}
      </div>
    </div>
  );
}
