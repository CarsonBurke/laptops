import "./loadingSpinner.scss";

export default function Loading({ color }: { color: number }) {
  return (
    <div className="paddingSmall gapSmall row centerRow">
      <div
        className={`loadingSpinner loadingSpinner1 background${color}`}
      ></div>
      <div
        className={`loadingSpinner loadingSpinner2 background${color}`}
      ></div>
      <div
        className={`loadingSpinner loadingSpinner3 background${color}`}
      ></div>
    </div>
  );
}
