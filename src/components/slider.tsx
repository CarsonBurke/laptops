"use client"

import { useState } from "react"

export default function Slider({ children, rangeMap, id, vertical, defaultValue }: { children: React.ReactNode, rangeMap: Map<number, number>, id: string, vertical?: boolean, defaultValue?: number }) {
    
    let [value, setValue] = useState(defaultValue)
    
    return (
        <div>
            <input type="range" onChange={(e) => setValue(parseInt(e.target.value))} defaultValue={defaultValue} list={id} style={{ writingMode: vertical ? "vertical-lr" : "horizontal-tb" }} />
            
            {children}
            <datalist id={id}>
                
            </datalist>
        </div>
    )
}

function generateOptions(rangeMap: Map<number, number>) {


}