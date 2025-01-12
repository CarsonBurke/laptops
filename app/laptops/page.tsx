import { generateArticlePreviews } from "../components/fakeArticlePreview";
import Slider from "../components/slider";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";
import Image from "next/image";
import Accordian from "../components/accordian";
import Checkbox from "../components/checkbox";
import RadioGroup from "../components/radioGroup";

export default function Articles() {
  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible centerRow gapMedium">
        <div className="column gapMedium">
          <h3 className="textMedium headerSmall">Filter</h3>

          <Accordian
            open={true}
            header={<h3 className="textSmall headerSmall">Price</h3>}
            className="borderBg3"
          >
            <div className="column gapSmall">
              <div className="column gapXSmall">
                <label htmlFor="minPrice" className="textSmall">
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
                <label htmlFor="maxPrice" className="textSmall">
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
                <h3 className="textSmall">Students</h3>
              </Checkbox>
              <Checkbox id="useCaseStudents">
                <h3 className="textSmall">Gaming</h3>
              </Checkbox>
              <Checkbox id="useCaseStudents">
                <h3 className="textSmall">Programming</h3>
              </Checkbox>
              <Checkbox id="useCaseStudents">
                <h3 className="textSmall">Work</h3>
              </Checkbox>
            </div>
          </Accordian>
          <Accordian
            header={<h3 className="textSmall headerSmall">Operating System</h3>}
            className="borderBg3"
          >
            <div className="column">
              <Checkbox id="windowsCheck">
                <Image src={windowsIcon} alt="windows" className="osIcon" />
                <h3 className="textSmall">Windows</h3>
              </Checkbox>
              <Checkbox id="macCheck">
                <Image src={macIcon} alt="mac" className="osIcon" />
                <h3 className="textSmall">MacOS</h3>
              </Checkbox>
              <Checkbox id="linuxCheck">
                <Image src={linuxIcon} alt="linux" className="osIcon" />
                <h3 className="textSmall">Linux</h3>
              </Checkbox>
            </div>
          </Accordian>
        </div>
        <div className="column gapMedium width100">
          <h1 className="textLarge headerLarge textCenter">Laptops</h1>
          <div className="rowCollapsible flexWrap gapMedium">
            {generateArticlePreviews(12, "background2")}
          </div>
        </div>
      </section>
    </main>
  );
}
