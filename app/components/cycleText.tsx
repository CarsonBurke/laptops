import { SyntheticEvent, useState } from "react"

export default function CycleText({ children, cycles, speed }: { children: React.ReactNode, cycles: React.ReactNode[], speed?: number }) {

    let longest = cycles.reduce((a, b) => (a as any).toString().length > (b as any).toString().length ? a : b)

    let [state, setState] = useState([children, -1] as [React.ReactNode, number])

    // Assign default if no speed was provided
    speed = speed || 120

    if (state[1] == -1) {
        console.log("case")
        state[1] = 0
        setInterval(() => {
            children = cycles[state[1]] || children
            let i = (state[1] + 1) % cycles.length
    
            setState([children, i])
        }, speed)
    }

    return (
        <div className="column">
            <p style={{ height: "0px", opacity: 0}}>{longest}</p>
            <h3 className="cycleText textSlightTransparent">{state[0]}</h3>
        </div>
    )
}