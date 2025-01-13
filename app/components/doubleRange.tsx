"use client";

import React, {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import "./doubleRadio.scss";

// Example: PC Part Picker's custom (using div and span and js) double slider https://ca.pcpartpicker.com/products/cpu/#X=45394,292947

const RADIO_DIAMETER = 10;

type EmitFunction = (notchLeft: number, notchRight: number) => void

export default function DoubleSlider({ steps, labelLeft, labelRight, emit }: { steps: number[], labelLeft?: string, labelRight?: string, emit: EmitFunction }) {
  let [dragEnd, setDragEnd] = useState(0);
  let [notchLeft, setNotchLeft] = useState(0);
  let [notchRight, setNotchRight] = useState(steps.length - 1);

  return (
    <div className="column gapSmall noSelect">
      <h3 className="textSmall headerSmall">Price</h3>
      <div className="column">
        <div className="row spaceBetween">
          <h3 className="textXSmall textSlightTransparent doubleSliderLeft textCenter">{labelLeft}{steps[notchLeft]}</h3>
          <h3 className="textXSmall textSlightTransparent doubleSliderRight textCenter">{labelRight}{steps[notchRight]}</h3>
        </div>
      </div>
      <div className="row doubleSliderBar">
        <div
          className="doubleSlider primary pointer"
          onMouseDown={(e) =>
            followCursor(e, steps.length, setNotchLeft, notchLeft, notchRight, emit)
          } /* onMouseDown={(e) => followCursor(e)} */ /* onMouseMove={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} onMouseUp={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} */
        ></div>
        <div
          className="doubleSlider primary pointer"
          style={{ left: "calc(100% - 20px)" }}
        ></div>
        <div className="doubleSliderBetween"></div>
      </div>
    </div>
  );
}

function followCursor(
  e: MouseEvent,
  stepsCount: number,
  setNotch: Dispatch<SetStateAction<number>>,
  radioNotch: number,
  otherRadioNotch: number,
  emit: EmitFunction
) {
  /* let newX = e.clientX */

  let el = e.target as HTMLDivElement;

  let parentEl = el.parentElement as HTMLDivElement;

  /* target.style.left = `${newX}px` */

  let stopMove = new AbortController();

  document.addEventListener(
    "mousemove",
    (mouseEvent) =>
      onDrag(mouseEvent as unknown as MouseEvent, el, parentEl, stepsCount, setNotch, otherRadioNotch),
    { signal: stopMove.signal }
  );

  let stopSelf = new AbortController();
  document.addEventListener("mouseup", () => onDragStop(stopMove, stopSelf, emit, radioNotch, otherRadioNotch), {
    signal: stopSelf.signal,
  });
}

function onDrag(
  moveEvent: MouseEvent,
  el: HTMLDivElement,
  parentEl: HTMLDivElement,
  stepsCount: number,
  setNotch: Dispatch<SetStateAction<number>>,
  otherRadioNotch: number,
) {
  let newX = moveEvent.clientX;

  let boundLeft = 0;
  let boundRight = parentEl.offsetWidth - RADIO_DIAMETER;

  let boundedX = Math.min(
    Math.max(newX - parentEl.offsetLeft, boundLeft),
    boundRight
  );
  // percent way through
  let percentX = (boundedX / boundRight) * 100;

  // 0-stepsCount
  let vX = Math.min(Math.round(percentX / (100 / stepsCount)), otherRadioNotch);

  // 0-boundRight
  let roundX =
    vX *
    (100 / stepsCount) *
    ((parentEl.offsetWidth - RADIO_DIAMETER * 2) / 100);

  el.style.left = `${roundX}px`;

  //

  setNotch(vX)

  // Move label

  let label = parentEl.parentElement?.getElementsByClassName("doubleSliderLeft")[0] as HTMLDivElement;

  label.style.transform = `translate(${roundX + RADIO_DIAMETER / 2}px)`;

  let between = parentEl.parentElement?.getElementsByClassName("doubleSliderBetween")[0] as HTMLDivElement;

  between.style.left = `${roundX}px`;
}

function onDragStop(stopMove: AbortController, stopSelf: AbortController, emit: EmitFunction, radioNotch: number, otherRadioNotch: number) {
  document.removeEventListener("mouseup", () => onDrag);
  document.removeEventListener("mousemove", () => onDragStop);

  stopMove.abort();
  stopSelf.abort();

  // emit the notched values
  // based on left vs right (order from direction)

  if (radioNotch < otherRadioNotch) {
    emit(radioNotch, otherRadioNotch)
  } else {
    emit(otherRadioNotch, radioNotch)
  }
}