"use client";

import React, {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./doubleSlider.scss";

// Example: PC Part Picker's custom (using div and span and js) double slider https://ca.pcpartpicker.com/products/cpu/#X=45394,292947

const BOUND_LEFT = 0;
const RADIO_DIAMETER = 9;
/// In pixels
const WIDTH = 180;

type EmitFunction = (
  valueLeft: number,
  valueRight: number,
  notchLeft?: number,
  notchRight?: number
) => void;

enum RadioSide {
  Left,
  Right,
}

function getStepsToValues(steps: number[]) {
  // Flip axes and indexes
  return new Map(steps.map((step, index) => [step, index]));
}

export default function DoubleSlider({
  header,
  steps,
  labelLeft,
  labelRight,
  leftValue,
  rightValue,
  background = 2,
  emit,
}: {
  header?: ReactNode;
  steps: number[];
  labelLeft?: [string, string];
  labelRight?: [string, string];
  leftValue?: number;
  rightValue?: number;
  background?: number;
  emit: EmitFunction;
}) {
  const stepsToValues = getStepsToValues(steps);

  const leftStep = (() => {
    if (leftValue === undefined) return 0;

    const stepForValue = stepsToValues.get(leftValue);
    if (stepForValue === undefined) throw new Error(`[Double slider]: Left value (${leftValue}) doesn't align with steps (${steps})`);

    return stepForValue;
  })()
  // These are so we can update the HTML values and track the other in calculation
  /* const leftStep = leftValue
    ? Math.round(leftValue / steps[steps.length - 1] * (steps.length))
    : 0; */
  let [notchLeftRealtime, setNotchLeftRealtime] = useState(leftStep);

  // const rightStep = rightValue
  //   ? Math.round(
  //       (rightValue / steps[steps.length - 1]) * steps.length
  //       /* (rightValue / steps[steps.length - 1]) */
  //     ) /* / (steps.length) */
  //   : steps.length - 1;
  const rightStep = (() => {
    if (rightValue === undefined) return steps.length - 1;

    const stepForValue = stepsToValues.get(rightValue);
    if (stepForValue === undefined) throw new Error(`[Double slider]: Right value (${rightValue}) doesn't align with steps (${steps})`);

    return stepForValue;
  })()
  let [notchRightRealtime, setNotchRightRealtime] = useState(rightStep);
  // These are to trail the real-time values, properly emitting as mouseover seems to end before mouseup
  let notchLeft = notchLeftRealtime;
  let notchRight = notchRightRealtime;

  function followCursor(
    e: MouseEvent,
    /* setNotch: Dispatch<SetStateAction<number>>, */
    otherRadioNotch: number,
    side: RadioSide
  ) {
    let el = e.target as HTMLDivElement;
    let parentEl = el.parentElement as HTMLDivElement;

    let stopMove = new AbortController();

    if (side === RadioSide.Left) {
      document.addEventListener(
        "mousemove",
        (mouseEvent) =>
          onDragLeft(
            mouseEvent.clientX,
            el,
            parentEl,
            /* setNotch, */ otherRadioNotch
          ),
        { signal: stopMove.signal }
      );
    } else {
      document.addEventListener(
        "mousemove",
        (mouseEvent) =>
          onDragRight(
            mouseEvent.clientX,
            el,
            parentEl,
            /* setNotch, */ otherRadioNotch
          ),
        { signal: stopMove.signal }
      );
    }

    let stopSelf = new AbortController();
    document.addEventListener("mouseup", () => onDragStop(stopMove, stopSelf), {
      signal: stopSelf.signal,
    });
  }

  function onDragLeft(
    newX: number,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    otherRadioNotch: number
  ) {
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER * 2;

    let boundedX = Math.min(
      Math.max(newX - parentEl.offsetLeft - RADIO_DIAMETER, BOUND_LEFT),
      boundRight
    );
    // percent way through
    let percentX = (boundedX / boundRight) * 100;

    // 0-stepsCount
    let step = Math.min(
      Math.round(percentX / (100 / steps.length)),
      otherRadioNotch - 1
    );

    moveToStepLeft(step, el, parentEl, otherRadioNotch);
  }

  function moveToStepLeft(
    step: number,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    otherRadioNotch: number
  ) {
    // 0-boundRight
    let roundX =
      step *
      (100 / steps.length) *
      ((parentEl.offsetWidth - RADIO_DIAMETER * 1.5) / 100);

    el.style.transform = `translateX(${roundX}px)`;

    //

    /* setNotch(vX) */
    setNotchLeftRealtime(step);
    notchLeft = step;

    // Move label

    let label = parentEl.parentElement?.getElementsByClassName(
      "doubleSliderLeftLabel"
    )[0] as HTMLDivElement;

    let max =
      otherRadioNotch * (parentEl.offsetWidth / steps.length) -
      label.offsetWidth * 2;

    let labelX = Math.min(roundX /* - (RADIO_DIAMETER / 2) */, max);
    label.style.transform = `translateX(${labelX}px)`;

    let between = parentEl.parentElement?.getElementsByClassName(
      "doubleSliderBetween"
    )[0] as HTMLDivElement;

    between.style.left = `${roundX}px`;
  }

  function onDragRight(
    newX: number,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    /* setNotch: Dispatch<SetStateAction<number>>, */
    otherRadioNotch: number
  ) {
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER * 2;

    let boundedX = Math.min(
      Math.max(newX - parentEl.offsetLeft - RADIO_DIAMETER, BOUND_LEFT),
      boundRight
    );
    // percent way through
    let percentX = (boundedX / boundRight) * 100;

    // 0-stepsCount
    let step = Math.min(
      Math.max(
        Math.round(percentX / (100 / (steps.length - 1))),
        otherRadioNotch + 1
      ),
      steps.length - 1
    );

    moveToStepRight(step, el, parentEl, otherRadioNotch);
  }

  function moveToStepRight(
    step: number,
    el: HTMLDivElement,
    parentEl: HTMLDivElement,
    otherRadioNotch: number
  ) {
    let boundRight = parentEl.offsetWidth - RADIO_DIAMETER * 2;

    // 0-boundRight
    let roundX =
      step *
      (100 / (steps.length - 1)) *
      ((parentEl.offsetWidth - RADIO_DIAMETER * 2) / 100);

    el.style.transform = `translateX(${roundX}px)`;

    //

    setNotchRightRealtime(step);
    notchRight = step;

    // Move label

    let label = parentEl.parentElement?.getElementsByClassName(
      "doubleSliderRightLabel"
    )[0] as HTMLDivElement;

    let min =
      otherRadioNotch * (parentEl.offsetWidth / steps.length) -
      parentEl.offsetWidth +
      label.offsetWidth * 2.5;

    let labelX = Math.max(roundX - boundRight, min);
    label.style.transform = `translateX(${labelX}px)`;

    let between = parentEl.parentElement?.getElementsByClassName(
      "doubleSliderBetween"
    )[0] as HTMLDivElement;

    between.style.right = `${parentEl.offsetWidth - RADIO_DIAMETER - roundX}px`;
  }

  function onDragStop(stopMove: AbortController, stopSelf: AbortController) {
    document.removeEventListener("mouseup", () => onDragLeft);
    document.removeEventListener("mousemove", () => onDragStop);

    stopMove.abort();
    stopSelf.abort();

    // emit the notched values
    // based on left vs right (order from direction)

    emit(steps[notchLeft], steps[notchRight]);
  }

  const sliderBarRef = useRef<HTMLDivElement>(null);

  // Properly align the right radio on page load
  useEffect(() => {
    const sliderBar = sliderBarRef.current as HTMLDivElement;

    // If the left radio is not on the first step

    if (leftStep != 0) {
      const sliderLeft = sliderBar.getElementsByClassName(
        "doubleSliderLeft"
      )[0] as HTMLDivElement;
      sliderLeft.style.transform = `translateX(${RADIO_DIAMETER}px)`;

      moveToStepLeft(leftStep, sliderLeft, sliderBar, notchRight);
    }

    // If the right radio is not on the last step
    if (rightStep != steps.length - 1) {
      const sliderRight = sliderBar.getElementsByClassName(
        "doubleSliderRight"
      )[0] as HTMLDivElement;
      sliderRight.style.transform = `translateX(${
        WIDTH - RADIO_DIAMETER * 2
      }px)`;

      moveToStepRight(rightStep, sliderRight, sliderBar, notchLeft);
    }
  }, []);

  return (
    <div
      className="column gapSmall noSelect doubleSliderContainer"
      style={{ width: `${WIDTH}px` }}
    >
      {header}
      <div className="column">
        <div className="row spaceBetween">
          <h3 className="textXSmall textSlightTransparent doubleSliderLeftLabel textCenter">
            {labelLeft?.[0]}
            {steps[notchLeftRealtime]}
            {labelLeft?.[1]}
          </h3>
          <h3 className="textXSmall textSlightTransparent doubleSliderRightLabel textCenter">
            {labelRight?.[0]}
            {steps[notchRightRealtime]}
            {}
            {labelRight?.[1]}
          </h3>
        </div>
      </div>
      <div
        className={`row doubleSliderBar background${background}`}
        ref={sliderBarRef}
      >
        <div
          className="doubleSlider primary pointer doubleSliderLeft"
          onMouseDown={(e) =>
            followCursor(e, notchRightRealtime, RadioSide.Left)
          }
          onTouchMove={(e) =>
            followCursor(e as any, notchRightRealtime, RadioSide.Left)
          }
        ></div>
        <div
          style={{
            transform: `translateX(${WIDTH - RADIO_DIAMETER * 2}px)`,
          }}
          className="doubleSlider primary pointer doubleSliderRight"
          onMouseDown={(e) =>
            followCursor(e, notchLeftRealtime, RadioSide.Right)
          }
          onTouchMove={(e) =>
            followCursor(e as any, notchLeftRealtime, RadioSide.Right)
          }
        ></div>
        <div className="doubleSliderBetween"></div>
      </div>
    </div>
  );
}
