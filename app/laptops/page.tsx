import { generateArticlePreviews } from "../components/fakeArticlePreview";
import Slider from "../components/slider";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";
import Image from "next/image";
import Accordian from "../components/accordian";
import Checkbox from "../components/checkbox";
import RadioGroup from "../components/radioGroup";
import Select from "../components/select";
import DoubleSlider from "../components/doubleRange";

export default async function Laptops() {
  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible centerRow gapMedium">
        <div className="columnCollapsibleScroll gapMedium">
          <div className="column gapMedium">
            <h3 className="textMedium headerSmall">Filter</h3>

            <div className="columnCollapsible gapMedium">
              <Select
                optionNames={[
                  "Best deal",
                  "Price low to high",
                  "Price high to low",
                ]}
                groupName="sort"
                className="borderBg3"
              />

              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Price</h3>}
                steps={Array.from(
                  { length: 25 },
                  (_, i) => Math.pow((i * 100), 1.09432)/* (i + 1) * 100 - 100 */
                )}
                labelLeft={["$", ""]}
                labelRight={["$", ""]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />

              {/* <Accordian
                open={true}
                header={<h3 className="textSmall headerSmall">Price</h3>}
                className="borderBg3"
              >
                <div className="column gapSmall">
                  <div className="column gapXSmall">
                    <label htmlFor="minPrice" className="textXSmall">
                      Min
                    </label>
                    <input
                      className="textInput background2"
                      id="minPrice"
                      placeholder="Min"
                      type="number"
                      defaultValue={300}
                    />
                  </div>
                  <div className="column gapXSmall">
                    <label htmlFor="maxPrice" className="textXSmall">
                      Max
                    </label>
                    <input
                      className="textInput background2"
                      id="maxPrice"
                      placeholder="Max"
                      type="number"
                      defaultValue={2000}
                    />
                  </div>
                </div>
              </Accordian> */}
              <Accordian
                header={<h3 className="textSmall headerSmall">Use Case</h3>}
                open={true}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="useCaseStudents">
                    <h3 className="textXSmall">Students</h3>
                  </Checkbox>
                  <Checkbox id="useCaseGaming">
                    <h3 className="textXSmall">Gaming</h3>
                  </Checkbox>
                  <Checkbox id="useCaseProgramming">
                    <h3 className="textXSmall">Programming</h3>
                  </Checkbox>
                  <Checkbox id="useCaseWork">
                    <h3 className="textXSmall">Work</h3>
                  </Checkbox>
                </div>
              </Accordian>
            </div>
          </div>

          <div className="column gapMedium">
            <h2 className="textMedium headerSmall">Specifications</h2>

            <div className="columnCollapsible gapMedium">
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Display Size</h3>}
                steps={Array.from({ length: 6 }, (_, i) => i + 13)}
                labelLeft={["", " inches"]}
                labelRight={["", " inches"]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />

              <DoubleSlider
                header={
                  <h3 className="textSmall headerSmall">Display Resolution</h3>
                }
                steps={Array.from(
                  { length: /* 41 */12 },
                  (_, i) => 9 * (100 + (i + 1) * 20)/* Math.pow(2, i * 9/16 + 10) *//* Math.sqrt((i * 400 * 1080) / (16 / 9)) + 1080 */
                )}
                labelLeft={["", "p"]}
                labelRight={["", "p"]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Memory</h3>}
                steps={Array.from(
                  { length: 6 },
                  (_, i) => Math.pow(2, i * 1 + 3)
                )}
                labelLeft={["", " GB"]}
                labelRight={["", " GB"]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />
                            <DoubleSlider
                header={<h3 className="textSmall headerSmall">Storage</h3>}
                steps={Array.from(
                  { length: 5 },
                  (_, i) => Math.pow(2, i * 1 + 9)
                )}
                labelLeft={["", " GB"]}
                labelRight={["", " GB"]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />
                                          <DoubleSlider
                header={<h3 className="textSmall headerSmall">CPU Cores</h3>}
                steps={Array.from(
                  { length: 7 },
                  (_, i) => Math.pow(2, i * 1 + 1)
                )}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />

              <Accordian
                header={<h3 className="textSmall headerSmall">GPU</h3>}
                className="borderBg3"
              >
                <div className="column gapMedium">
                  <Checkbox id="dedicatedGPU">
                    <h3 className="textXSmall">Dedicated</h3>
                  </Checkbox>
                  <DoubleSlider
                header={<h3 className="textSmall headerSmall">VRAM</h3>}
                steps={Array.from(
                  { length: 5 },
                  (_, i) => Math.pow(2, i * 1 + 2)
                )}
                labelLeft={["", " GB"]}
                labelRight={["", " GB"]}
                emit={async (left, right) => {
                  "use server";
                  console.log("left", left, "right", right);
                }}
              />
                </div>
              </Accordian>
              <Accordian
                header={<h3 className="textSmall headerSmall">Battery</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="dedicatedGPU">
                    <h3 className="textXSmall">Dedicated</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={
                  <h3 className="textSmall headerSmall">Operating System</h3>
                }
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="windowsCheck">
                    <Image src={windowsIcon} alt="windows" className="osIcon" />
                    <h3 className="textXSmall">Windows</h3>
                  </Checkbox>
                  <Checkbox id="macCheck">
                    <Image src={macIcon} alt="mac" className="osIcon" />
                    <h3 className="textXSmall">MacOS</h3>
                  </Checkbox>
                  <Checkbox id="linuxCheck">
                    <Image src={linuxIcon} alt="linux" className="osIcon" />
                    <h3 className="textXSmall">Linux</h3>
                  </Checkbox>
                </div>
              </Accordian>
            </div>
          </div>
        </div>
        <div className="column gapMedium width100">
          <h1 className="textLarge headerLarge textCenter">Laptops</h1>
          <div className="rowCollapsible flexWrap gapMedium centerRow centerColumn">
            {generateArticlePreviews(12, "background2")}
          </div>
        </div>
      </section>
    </main>
  );
}
