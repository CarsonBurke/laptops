"use client";

import Button from "@/components/button";
import DoubleSlider from "@/components/doubleSlider";
import LabelledInput from "@/components/labelledInput";
import Slider from "@/components/slider";
import { LaptopsOrder } from "@/types/laptop";
import { roundTo } from "@/utils/units";
import Link from "next/link";
import { useState } from "react";

enum FlowState {
  Budget,
  Priorities,
}

export default function DiscoverPage() {
  let [price, setPrice] = useState([0, 5000]);
  let [flowState, setFlowState] = useState(FlowState.Budget);

  let [studentScore, setStudentScore] = useState(100);
  let [gamingScore, setGamingScore] = useState(100);
  let [programmingScore, setProgrammingScore] = useState(100);
  let [officeWorkScore, setOfficeWorkScore] = useState(100);
  let [videoEditingScore, setVideoEditingScore] = useState(100);

  return (
    <main className="main">
      <section className="sectionPadded column gapLarge">
        <div className="column centerColumn">
          <h1 className="textLarge headerLarge textCenter">Discover</h1>
          <h2 className="textSmall textSlightTransparent">
            Tell us what you're looking for, we'll do the rest
          </h2>
        </div>

        <div className="column centerColumn borderBg2 paddingMedium defaultBorderRadius gapLarge background2 borderBg3">
          <form className="column widthFit gapMedium centerColumn">
            {flowState === FlowState.Budget && (
              <>
                <div className="column gapSmall centerRow centerColumn slideIn">
                  <h2 className="textMedium headerSmall textCenter">
                    Your Budget
                  </h2>
                  <DoubleSlider
                    header={<h2 className="textSmall">Price range</h2>}
                    background={3}
                    steps={Array.from(
                      { length: 25 },
                      (_, i) =>
                        Math.pow(i * 100, 1.09432) /* (i + 1) * 100 - 100 */
                    )}
                    labelLeft={["$", ""]}
                    labelRight={["$", ""]}
                    emit={(left, right) => {
                      "use client";

                      setPrice([left, right]);
                    }}
                  />
                </div>
                <Button
                  onClick={() => setFlowState(FlowState.Budget + 1)}
                  className="row gapXSmall buttonPrimary"
                >
                  Next
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Button>
              </>
            )}

            {flowState === FlowState.Priorities && (
              <div className="column gapMedium slideIn centerColumn">
                <div className="column">
                  <h2 className="textMedium headerSmall textCenter">
                    Rate Each Use-Case
                  </h2>
                  <h3 className="textSmall textSlightTransparent textCenter">
                    Give each category a score out of 10
                  </h3>
                </div>

                <div className="column gapMedium centerColumn centerRow">
                  <Slider
                    label="School work"
                    color={3}
                    defaultValue={studentScore}
                    onChange={(value) => setStudentScore(value)}
                    id="studentScore"
                  />

                  <Slider
                    label="Gaming"
                    color={3}
                    defaultValue={gamingScore}
                    onChange={(value) => setGamingScore(value)}
                    id="gamingScore"
                  />

                  <Slider
                    label="Programming"
                    color={3}
                    defaultValue={programmingScore}
                    onChange={(value) => setProgrammingScore(value)}
                    id="programmingScore"
                  />

                  <Slider
                    label="Office work"
                    color={3}
                    defaultValue={officeWorkScore}
                    onChange={(value) => setOfficeWorkScore(value)}
                    id="officeWorkScore"
                  />

                  <Slider
                    label="Video editing"
                    color={3}
                    defaultValue={videoEditingScore}
                    onChange={(value) => setVideoEditingScore(value)}
                    id="videoEditingScore"
                  />
                </div>

                <div className="row gapSmall centerColumn">
                  <Button
                    onClick={() => setFlowState(FlowState.Budget + 1)}
                    className="row gapXSmall buttonBg4"
                  >
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    Back
                  </Button>
                  <Link
                    href={{pathname: "/laptops", query: {
                      order: LaptopsOrder.WeightedScore,
                      studentScoreWeight: roundTo(studentScore, 2),
                      gamingScoreWeight: roundTo(gamingScore, 2),
                      programmingScoreWeight: roundTo(programmingScore, 2),
                      officeWorkScoreWeight: roundTo(officeWorkScore, 2),
                      videoEditingScoreWeight: roundTo(videoEditingScore, 2),
                      minPrice: price[0],
                      maxPrice: price[1],
                    }}}
                    className="button row gapXSmall buttonPrimary"
                  >
                    Go
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="row gapXSmall centerRow">
          <h4 className="textXSmall textCenter textSlightTransparent">
            have feedback?
          </h4>
          <Link
            className="button textPrimary textGlowButton textSlightTransparent"
            href="/contact"
          >
            Let us know
          </Link>
        </div>
      </section>
    </main>
  );
}
