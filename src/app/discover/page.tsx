"use client";

import Button from "@/components/button";
import DoubleSlider from "@/components/doubleSlider";
import LabelledInput from "@/components/labelledInput";
import Link from "next/link";
import { useState } from "react";

export default function DiscoverPage() {
  let [price, setPrice] = useState([0, 5000]);

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
            <div className="column gapSmall">
              <h2 className="textMedium headerSmall textCenter">Your Budget</h2>
              <DoubleSlider
                header={<h2 className="textSmall">Price range</h2>}
                background={3}
                steps={Array.from(
                  { length: 25 },
                  (_, i) => Math.pow(i * 100, 1.09432) /* (i + 1) * 100 - 100 */
                )}
                labelLeft={["$", ""]}
                labelRight={["$", ""]}
                emit={(left, right) => {
                  "use client";

                  setPrice([left, right]);
                }}
              />
            </div>

            <div className="column gapSmall">
              <div className="column">
                <h2 className="textMedium headerSmall textCenter">
                  Rate your priorities
                </h2>
                <h3 className="textSmall textSlightTransparent textCenter">
                  Rate each category from 1 to 10
                </h3>
              </div>

              <div className="row widthFit gapMedium centerColumn flexWrap centerRow">
                <DoubleSlider
                  header={<h2 className="textSmall">Student work</h2>}
                  background={3}
                  steps={Array.from({ length: 11 }, (_, i) => i)}
                  labelLeft={["", ""]}
                  labelRight={["", ""]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h2 className="textSmall">Gaming</h2>}
                  steps={Array.from({ length: 11 }, (_, i) => i)}
                  background={3}
                  labelLeft={["", ""]}
                  labelRight={["", ""]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h2 className="textSmall">Programming</h2>}
                  steps={Array.from({ length: 11 }, (_, i) => i)}
                  background={3}
                  labelLeft={["", ""]}
                  labelRight={["", ""]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h2 className="textSmall">Office work</h2>}
                  steps={Array.from({ length: 11 }, (_, i) => i)}
                  background={3}
                  labelLeft={["", ""]}
                  labelRight={["", ""]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h2 className="textSmall">Video editing</h2>}
                  steps={Array.from({ length: 11 }, (_, i) => i)}
                  background={3}
                  labelLeft={["", ""]}
                  labelRight={["", ""]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
                  }}
                />
              </div>
            </div>

            <div className="column gapSmall centerColumn">
              <Link
                href="/laptops"
                className="button row gapXSmall buttonPrimary"
              >
                Submit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <div className="row gapXSmall">
                <h4 className="textXSmall textCenter textSlightTransparent">
                  have feedback?
                </h4>
                <Link
                  className="button textGlowButton textSlightTransparent"
                  href="/contact"
                >
                  Let us know
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
