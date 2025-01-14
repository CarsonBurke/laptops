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

enum RadioSide {
  Left,
  Right
}

export default function DoubleSlider({ steps, labelLeft, labelRight, emit }: { steps: number[], labelLeft?: string, labelRight?: string, emit: EmitFunction }) {
  let [dragEnd, setDragEnd] = useState(0);
  let [notchLeft, setNotchLeft] = useState(0);
  let [notchRight, setNotchRight] = useState(steps.length - 1);

  function followCursor(
    e: MouseEvent,
    stepsCount: number,
    setNotch: Dispatch<SetStateAction<number>>,
    otherRadioNotch: number,
    side: RadioSide,
  ) {
    /* let newX = e.clientX */
  
    let el = e.target as HTMLDivElement;
  
    let parentEl = el.parentElement as HTMLDivElement;
  
    /* target.style.left = `${newX}px` */
  
    let stopMove = new AbortController();

    if (side === RadioSide.Left) {
      document.addEventListener(
        "mousemove",
        (mouseEvent) =>
          onDragLeft(mouseEvent as unknown as MouseEvent, el, parentEl, stepsCount, setNotch, otherRadioNotch),
        { signal: stopMove.signal }
      );
    }
    else {
      document.addEventListener(
        "mousemove",
        (mouseEvent) =>
          onDragRight(mouseEvent as unknown as MouseEvent, el, parentEl, stepsCount, setNotch, otherRadioNotch),
        { signal: stopMove.signal }
      );
    }
  
    let stopSelf = new AbortController();
    document.addEventListener("mouseup", () => onDragStop(stopMove, stopSelf), {
      signal: stopSelf.signal,
    });
  }
  
  function onDragLeft(
    moveEvent: MouseEvent,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    stepsCount: number,
    setNotch: Dispatch<SetStateAction<number>>,
    otherRadioNotch: number,
  ) {
    let newX = moveEvent.clientX;
  
    let boundLeft = 0;
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER * 2;
  
    let boundedX = Math.min(
      Math.max(newX - parentEl.offsetLeft, boundLeft),
      boundRight
    );
    // percent way through
    let percentX = (boundedX / boundRight) * 100;
  
    // 0-stepsCount
    let vX = Math.min(Math.round(percentX / (100 / stepsCount)), otherRadioNotch - 1);
  
    // 0-boundRight
    let roundX =
      vX *
      (100 / stepsCount) *
      ((parentEl.offsetWidth - RADIO_DIAMETER * 1.5) / 100);
  
    el.style.transform = `translateX(${roundX}px)`;
  
    //
  
    setNotch(vX)
    console.log("set notch", vX)
  
    // Move label
  
    let label = parentEl.parentElement?.getElementsByClassName("doubleSliderLeftLabel")[0] as HTMLDivElement;
  
    let max = otherRadioNotch * ((parentEl.offsetWidth) / stepsCount) - label.offsetWidth * 2
  
    let labelX = Math.min(roundX /* - (RADIO_DIAMETER / 2) */, max);
    label.style.transform = `translateX(${labelX}px)`;
  
    let between = parentEl.parentElement?.getElementsByClassName("doubleSliderBetween")[0] as HTMLDivElement;
  
    between.style.left = `${roundX}px`;
  }

  function onDragRight(
    moveEvent: MouseEvent,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    stepsCount: number,
    setNotch: Dispatch<SetStateAction<number>>,
    otherRadioNotch: number,
  ) {
    let newX = moveEvent.clientX;
  
    let boundLeft = RADIO_DIAMETER;
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER * 2;
  
    let boundedX = Math.min(
      Math.max(newX - parentEl.offsetLeft + RADIO_DIAMETER, boundLeft),
      boundRight
    );
    // percent way through
    let percentX = (boundedX / boundRight) * 100;
  
    // 0-stepsCount
    let vX = Math.min(Math.max(Math.round(percentX / (100 / (stepsCount - 1))), otherRadioNotch + 1), stepsCount - 1);
  
    // 0-boundRight
    let roundX =
      vX *
      (100 / (stepsCount - 1)) *
      ((parentEl.offsetWidth - RADIO_DIAMETER * 2) / 100);
  
    el.style.transform = `translateX(${roundX}px)`;
  
    //
  
    setNotch(vX)
    console.log("set notch", vX)
  
    // Move label
  
    let label = parentEl.parentElement?.getElementsByClassName("doubleSliderRightLabel")[0] as HTMLDivElement;
  
    let min = otherRadioNotch * ((parentEl.offsetWidth) / stepsCount) - parentEl.offsetWidth + label.offsetWidth * 2
    console.log("min", min)

    let labelX = Math.max(roundX - boundRight /* - (RADIO_DIAMETER / 2) */, min);
    label.style.transform = `translateX(${labelX}px)`;
  
    let between = parentEl.parentElement?.getElementsByClassName("doubleSliderBetween")[0] as HTMLDivElement;
  
    between.style.right = `${parentEl.offsetWidth - RADIO_DIAMETER - roundX}px`;
  }
  
  function onDragStop(stopMove: AbortController, stopSelf: AbortController) {
    document.removeEventListener("mouseup", () => onDragLeft);
    document.removeEventListener("mousemove", () => onDragStop);
  
    stopMove.abort();
    stopSelf.abort();
  
    // emit the notched values
    // based on left vs right (order from direction)
    console.log("emit", notchLeft, notchRight)
    emit(notchLeft, notchRight)
  
    /* if (radioNotch < otherRadioNotch) {
      emit(radioNotch, otherRadioNotch)
    } else {
      emit(otherRadioNotch, radioNotch)
    } */
  }

  return (
    <div className="column gapSmall noSelect">
      <h3 className="textSmall headerSmall">Price</h3>
      <div className="column">
        <div className="row spaceBetween">
          <h3 className="textXSmall textSlightTransparent doubleSliderLeftLabel textCenter">{labelLeft}{steps[notchLeft]}</h3>
          <h3 className="textXSmall textSlightTransparent doubleSliderRightLabel textCenter">{labelRight}{steps[notchRight]}</h3>
        </div>
      </div>
      <div className="row doubleSliderBar">
        <div
          className="doubleSlider primary pointer doubleSliderLeft"
          onMouseDown={(e) =>
            followCursor(e, steps.length, setNotchLeft, notchRight, RadioSide.Left)
          } /* onMouseDown={(e) => followCursor(e)} */ /* onMouseMove={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} onMouseUp={(e) => {executeDrag(e, steps.size, draggingLeft); setDraggingLeft(false)}} */
        ></div>
        <div
          className="doubleSlider primary pointer doubleSliderRight"
          onMouseDown={(e) =>
            followCursor(e, steps.length, setNotchRight, notchLeft, RadioSide.Right)
          }
          onLoad={(e) => onDragRight(e as unknown as MouseEvent, e.target as HTMLDivElement, (e.target as HTMLDivElement).parentElement as HTMLDivElement, steps.length, setNotchRight, notchLeft)}
        ></div>
        <div className="doubleSliderBetween"></div>
      </div>
    </div>
  );
}