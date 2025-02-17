import { useState } from "react";

export default function Accordian({
  children,
  header,
  className,
  open,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  className?: string;
  open?: boolean;
}) {
  let [toggled, setToggled] = useState(open || false);

  return (
    <details
      open={open}
      onToggle={() => setToggled(!toggled)}
      className={className + " paddingSmall noSelect"}
    >
      <summary
        className="row gapSmall paddingSmall"
        style={{ width: "max-content" }}
      >
        {header}
        <span className="material-symbols-outlined">
          {toggled ? "expand_less" : "expand_more"}
        </span>
      </summary>
      <div className="paddingSmall detailsContent column gapSmall">{children}</div>
    </details>
  );
}
