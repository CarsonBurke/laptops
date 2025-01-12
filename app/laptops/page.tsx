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

export default function Laptops() {
  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible centerRow gapMedium">
        <div className="columnCollapsibleScroll gapMedium">
          <div className="column gapMedium">
            <h3 className="textMedium headerSmall">Filter</h3>

            <div className="columnCollapsible gapMedium">
              <Select optionNames={["Best deal", "Price low to high", "Price high to low"]} groupName="sort" className="borderBg3" />
              <Accordian
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
              </Accordian>
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
              <Accordian
                header={<h3 className="textSmall headerSmall">Display Size</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="13inch">
                    <h3 className="textXSmall">13 inch</h3>
                  </Checkbox>
                  <Checkbox id="14inch">
                    <h3 className="textXSmall">14 inch</h3>
                  </Checkbox>
                  <Checkbox id="15inch">
                    <h3 className="textXSmall">15 inch</h3>
                  </Checkbox>
                  <Checkbox id="16inch">
                    <h3 className="textXSmall">16 inch</h3>
                  </Checkbox>
                  <Checkbox id="17inch">
                    <h3 className="textXSmall">17 inch</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={
                  <h3 className="textSmall headerSmall">Display Resolution</h3>
                }
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="1080p">
                    <h3 className="textXSmall">1080p</h3>
                  </Checkbox>
                  <Checkbox id="1440p">
                    <h3 className="textXSmall">1440p</h3>
                  </Checkbox>
                  <Checkbox id="1800p">
                    <h3 className="textXSmall">1800p</h3>
                  </Checkbox>
                  <Checkbox id="2000p">
                    <h3 className="textXSmall">2000p</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={<h3 className="textSmall headerSmall">Memory</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="1080p">
                    <h3 className="textXSmall">1080p</h3>
                  </Checkbox>
                  <Checkbox id="1440p">
                    <h3 className="textXSmall">1440p</h3>
                  </Checkbox>
                  <Checkbox id="1800p">
                    <h3 className="textXSmall">1800p</h3>
                  </Checkbox>
                  <Checkbox id="2000p">
                    <h3 className="textXSmall">2000p</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={<h3 className="textSmall headerSmall">Storage</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="1080p">
                    <h3 className="textXSmall">256GB</h3>
                  </Checkbox>
                  <Checkbox id="1440p">
                    <h3 className="textXSmall">512GB</h3>
                  </Checkbox>
                  <Checkbox id="1800p">
                    <h3 className="textXSmall">1TB</h3>
                  </Checkbox>
                  <Checkbox id="2000p">
                    <h3 className="textXSmall">2TB</h3>
                  </Checkbox>
                  <Checkbox id="2000p">
                    <h3 className="textXSmall">4TB</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={<h3 className="textSmall headerSmall">CPU Cores</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="1080p">
                    <h3 className="textXSmall">1080p</h3>
                  </Checkbox>
                  <Checkbox id="1440p">
                    <h3 className="textXSmall">1440p</h3>
                  </Checkbox>
                  <Checkbox id="1800p">
                    <h3 className="textXSmall">1800p</h3>
                  </Checkbox>
                  <Checkbox id="2000p">
                    <h3 className="textXSmall">2000p</h3>
                  </Checkbox>
                </div>
              </Accordian>
              <Accordian
                header={<h3 className="textSmall headerSmall">GPU</h3>}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox id="dedicatedGPU">
                    <h3 className="textXSmall">Dedicated</h3>
                  </Checkbox>
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
