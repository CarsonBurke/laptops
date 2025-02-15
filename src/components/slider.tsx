"use client";

import { ChangeEvent, useState } from "react";
import "./slider.scss";

export default function Slider(args: {
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id: string;
  label: string;
  color: number;
  vertical?: boolean;
  defaultValue?: number;
}) {
  let [value, setValue] = useState(args.defaultValue || 0);

  function onRangeChange(e: ChangeEvent) {
    const newValue = parseInt((e.target as HTMLInputElement).value);

    setValue(newValue);
    args.onChange(newValue);
  }

  return (
    <div className="column gapSmall">
      <div className="row gapSmall centerColumn">
        <label className="row gapXSmall textSmall" htmlFor={args.id}>
          {args.label}
        </label>
        <h4 className="textXSmall textSlightTransparent">{value}</h4>
      </div>

      <input
        className={`slider background${args.color}`}
        type="range"
        onChange={onRangeChange}
        defaultValue={args.defaultValue}
        id={args.id}
        style={{ writingMode: args.vertical ? "vertical-lr" : "horizontal-tb" }}
      />
    </div>
  );
}

function generateOptions(rangeMap: Map<number, number>) {}
