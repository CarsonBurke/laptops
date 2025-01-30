"use client"

import { HTMLInputTypeAttribute, ReactNode } from "react";
import "./labelledInput.scss"

interface LabelledInputArgs {
    name: string;
    label: ReactNode;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    value: string | number;
    color: number;
    onChange(value: string | number): void
}

export default function LabelledInput({ args }: { args: LabelledInputArgs }) {
    return (
        <div className="column gapXSmall">
            <label className="row gapXSmall textSmall">{args.label}</label>
            <input value={args.value} className={`labelledInput paddingSmall textSmall borderBg${args.color} background${args.color}`} type={args.type} name={args.name} placeholder={args.placeholder} onChange={(e) => args.onChange(e.target.value)} />
        </div>
    )
}