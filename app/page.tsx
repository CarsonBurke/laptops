import Image from "next/image";
import Hero from "./components/hero";
import FakeArticlePreview, {
  generateArticlePreviews,
} from "./components/fakeArticlePreview";
import Button from "./components/button";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="section bg1To2">
        <div className="column background1 container centerColumn gapLarge defaultBorderRadius">
          <div className="column">
            <h2 className="textLarge textCenter smallHeader">Huge Deals</h2>
            <h3>The best prices we - or anyone - could find</h3>
          </div>

          <div className="row flexWrap gapMedium centerRow width100">
            {generateArticlePreviews(12, "background2")}
          </div>

          <Button linkTo="top" classNames="textGlowButton">
            <h3 className="textSmall">See More</h3>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>
      </section>
      <section className="sectionPadded background2 column gapLarge">
        <div className="column centerRow centerColumn">
          <h1 className="textLarge largeHeader textCenter">By Use-Case</h1>
          <Button linkTo="top" classNames="textGlowButton">
            <h3 className="textSmall">All categories</h3>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </div>

        <div className="rowCollapsible gapLarge centerRow">
          <div className="column centerColumn width100 gapMedium">
            <h2 className="textMedium smallHeader">For School</h2>

            <div className="row flexWrap gapMedium centerRow width100">
              {generateArticlePreviews(4, "background3")}
            </div>
            <Button linkTo="top" classNames="textGlowButton">
              <h3 className="textSmall">See More</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
          <div className="column centerColumn width100 gapMedium">
            <h2 className="textMedium smallHeader">For Work</h2>

            <div className="row flexWrap gapMedium centerRow width100">
              {generateArticlePreviews(3, "background3")}
            </div>
            <Button linkTo="top" classNames="textGlowButton">
              <h3 className="textSmall">See More</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>
      </section>
      <section className="sectionPadded row centerRow">
        <div className="paddingLarge background2 fitWidth column gapSmall defaultBorderRadius">
          <h1 className="textLarge largeHeader textCenter">
            Not sure what you're looking for?
          </h1>
          <div className="row gapXSmall centerRow centerColumn">
            <h3 className="textMedium textCenter">Try our </h3>
            <Button linkTo="discover" classNames="textMedium textGlowButton defaultBorderRadius">
              discovery queue
              <span className="material-symbols-outlined">arrow_forward</span>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
