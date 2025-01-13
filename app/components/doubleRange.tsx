"use client"

import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useState } from "react";
import "./doubleRadio.scss";

// Example: PC Part Picker's custom (using div and span and js) double slider https://ca.pcpartpicker.com/products/cpu/#X=45394,292947

const RADIO_DIAMETER = 10

export default function DoubleRange({ steps }: { steps: Map<number, number> }) {

    let [dragEnd, setDragEnd] = useState(0)
    let [draggingLeft, setDraggingLeft] = useState(false)
    let [draggingRight, setDraggingRight] = useState(false)

  return (
    <div className="column gapSmall noSelect">
        <h3 className="textSmall headerSmall">Price</h3>
      <div className="column">
        <div className="row spaceBetween">
            <h3 className="textXSmall textSlightTransparent">P1</h3>
            <h3 className="textXSmall textSlightTransparent">P2</h3>
        </div>
      </div>
      <div className="row customRadioBar">
        <div className="customRadio primary pointer" onMouseDown={(e) => followCursor(e, steps.size, setDraggingLeft)} /* onMouseDown={(e) => followCursor(e)} */ /* onMouseMove={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} onMouseUp={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} */></div>
        <div className="customRadio primary pointer" style={{ left: "calc(100% - 20px)"}}></div>
      </div>
    </div>
  );
}

function followCursor(e: MouseEvent, stepsCount: number, setDragging: Dispatch<SetStateAction<boolean>>) {
    /* let newX = e.clientX */

    let el = e.target as HTMLDivElement

    let parentEl = el.parentElement as HTMLDivElement

    /* target.style.left = `${newX}px` */

    let stopMove = new AbortController();

    document.addEventListener("mousemove", (mouseEvent) => onDrag(mouseEvent as unknown as MouseEvent, el, parentEl, stepsCount), { signal: stopMove.signal })

    let stopSelf = new AbortController();
    document.addEventListener("mouseup", () => onDragStop(stopMove, stopSelf), { signal: stopSelf.signal})
}

function onDrag(moveEvent: MouseEvent, el: HTMLDivElement, parentEl: HTMLDivElement, stepsCount: number) {
    let newX = moveEvent.clientX

    let boundLeft = RADIO_DIAMETER
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER

    let boundedX = Math.min(Math.max(newX - parentEl.offsetLeft, boundLeft), boundRight)
    // percent way through 
    let percentX = (boundedX / boundRight) * 100
    // console.log(percentX)

    let vX = percentX / (100 / 7)

    let roundX = Math.round(vX) * (100 / 7) * (boundRight / 100)
    console.log(roundX)
    
    // let notchedX = Math.round(percentX / 7) * 7 * (2.28)

    // rounded percent way through notched

    // let notchedX = Math.round(percentX / stepsCount) * boundRight

    // let constrained = (boundedX + stepsCount) % (stepsCount + 1)
    // console.log(constrained)

    // console.log(notchedX)

    // let contrainedPercent = (boundedX / boundRight) * (100 / stepsCount)

    // console.log(contrainedPercent)

    el.style.left = `${roundX - RADIO_DIAMETER}px` 
}

function onDragStop(stopMove: AbortController, stopSelf: AbortController) {
    
    
    document.removeEventListener("mouseup", () => onDrag)  
    document.removeEventListener("mousemove", () => onDragStop)  

    stopMove.abort()
    stopSelf.abort()
}

function executeDrag(e: MouseEvent, stepsCount: number, isDragging: boolean) {
    console.log("drag", isDragging)
    if (!isDragging) {
        return
    }

    let newX = Math.round(e.clientX / stepsCount) * stepsCount

    let target = e.target as HTMLDivElement
    console.log(newX)
    target.style.left = `${newX}px`
}