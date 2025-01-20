import Image from "next/image";
import Hero from "../components/hero";
import FakeLaptopPreview, {
  generateFakeLaptopPreviews,
} from "../components/fakeLaptopPreview";
import Button from "../components/button";
import FilteredLaptops from "@/components/FilteredLaptops";
import { LaptopsOrder } from "@/types/db";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="section bg1To2">
        <div className="column background1 container centerColumn gapLarge defaultBorderRadius">
          <div className="column">
            <h2 className="textLarge textCenter headerSmall">Huge Deals</h2>
            <h3>The best prices we - or anyone - could find</h3>
          </div>

          <div className="row flexWrap gapMedium centerRow width100">
            <FilteredLaptops args={{ maxLaptops: 12, order: LaptopsOrder.BestDeal }} />
          </div>

          <Button linkTo="/laptops" className="textGlowButton">
            <h3 className="textSmall">See More</h3>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </section>
      <section className="sectionPadded background2 column gapLarge">
        <div className="column centerRow centerColumn">
          <h1 className="textLarge headerLarge textCenter">By Use-Case</h1>
          <Button linkTo="top" className="textGlowButton">
            <h3 className="textSmall">All categories</h3>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>

        <div className="rowCollapsible gapLarge centerRow">
          <div className="column centerColumn width100 gapMedium">
            <h2 className="textMedium headerSmall">For School</h2>

            <div className="row flexWrap gapMedium centerRow width100">
              {generateFakeLaptopPreviews(4, "background3")}
            </div>
            <Button linkTo="top" className="textGlowButton">
              <h3 className="textSmall">See More</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
          <div className="column centerColumn width100 gapMedium">
            <h2 className="textMedium headerSmall">For Work</h2>

            <div className="row flexWrap gapMedium centerRow width100">
              {generateFakeLaptopPreviews(3, "background3")}
            </div>
            <Button linkTo="top" className="textGlowButton">
              <h3 className="textSmall">See More</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>
      </section>
      <section className="sectionPadded row centerRow">
        <div className="paddingLarge background2 widthFit column gapSmall defaultBorderRadius">
          <h1 className="textMedium headerLarge textCenter">
            Not sure what you're looking for?
          </h1>
          <div className="row gapXSmall centerRow centerColumn">
            <h3 className="textMedium textCenter">Try our </h3>
            <Button linkTo="discover" className="textMedium textGlowButton defaultBorderRadius">
              discovery queue
              <span className="material-symbols-outlined">conditions</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
