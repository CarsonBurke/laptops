"use client"

import { SyntheticEvent, useEffect, useState } from "react"

export default function CycleText({ children, cycles, speed }: { children: React.ReactNode, cycles: React.ReactNode[], speed?: number }) {

    let longest = cycles.reduce((a, b) => (a as any).toString().length > (b as any).toString().length ? a : b)

    let [state, setState] = useState([children, 0] as [React.ReactNode, number])

    // Assign default if no speed was provided
    speed = speed || 1200

    // if (state[1] == -1) {
    //     console.log("case")
    //     state[1] = 0
    //     const interval =setInterval(() => {
    //         children = cycles[state[1]] || children
    //         let i = (state[1] + 1) % cycles.length
    
    //         setState([children, i])
    //     }, speed)
    // }

    useEffect(() => {
        console.log("interval")
        
        const interval = setInterval(() => {
            let i = (state[1] + 1) % cycles.length
            children = cycles[i] || children
    
            setState([<div className="slideIn" key={i}>{children}</div>, i])
        }, speed)

        return () => clearInterval(interval)
    }, [state])

    return (
        <div className="column">
            <p style={{ height: "0px", opacity: 0, pointerEvents: "none"}}>{longest}</p>
            <h3 className="cycleText textSlightTransparent slideIn">{state[0]}</h3>
        </div>
    )
}