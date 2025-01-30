import { ReactNode } from "react";
import "./labelledTextarea.scss"

interface LabelledTextareaArgs {
  name: string;
  label: ReactNode;
  placeholder: string;
  initial?: string;
  value: string;
  color: number;
  onChange(value: string | number): void;
}

export default function LabelledTextarea({
  args,
}: {
  args: LabelledTextareaArgs;
}) {
    return (
        <div className="column gapXSmall">
        <label className="row gapXSmall textSmall">{args.label}</label>
        <textarea
          className={`paddingSmall textSmall labelledTextarea borderBg${args.color} background${args.color}`}
          placeholder={args.placeholder}
          value={args.value}
          onChange={(e) => args.onChange(e.target.value)}
        >
          {args.initial}
        </textarea>
      </div>
    )
}
