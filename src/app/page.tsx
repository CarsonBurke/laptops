import Image from "next/image";
import Hero from "../components/hero";
import FakeLaptopPreview, {
  generateFakeLaptopPreviews,
} from "../components/fakeLaptopPreview";
import Button from "../components/button";
import FilteredLaptops from "@/components/filteredLaptops";
import { LaptopsOrder } from "@/types/laptop";
import Link from "next/link";
import { queryUseCaseOnly } from "@/utils/query";
import "./page.scss";

export default function Home() {
  return (
    <main>
      <div className="heroContainer column gapLarge">
        <Hero />
        <section className="section bg1To2">
          <div className="column background1 container centerColumn gapLarge defaultBorderRadius">
            <div className="column">
              <h2 className="textLarge textCenter headerSmall slideIn">
                Huge Deals
              </h2>
              <h3 className="textSmall textSlightTransparent slideIn">
                The best prices we - or anyone - could find
              </h3>
            </div>

            <div className="row flexWrap gapMedium centerRow width100">
              <FilteredLaptops
                args={{
                  maxLaptops: 12,
                  background: "background2",
                  order: LaptopsOrder.BestDeal,
                  forStudents: true,
                  forGaming: true,
                  forProgrammers: true,
                  forWork: true,
                  forVideoEditing: true,
                }}
              />
            </div>

            <Link
              href={{
                pathname: "/laptops",
                query: { order: LaptopsOrder.BestDeal, },
              }}
              className="button textGlowButton"
            >
              <h3 className="textSmall">More deals</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>
      </div>

      <section className="sectionPadded background2 column gapLarge">
        <div className="rowCollapsible gapLarge centerRow flexWrap">
          <div className="column centerColumn gapMedium">
            <h2 className="textLarge headerSmall">For School</h2>

            <div className="column centerColumn gapMedium centerRow width100">
              <FilteredLaptops
                args={{
                  maxLaptops: 3,
                  background: "background3",
                  order: LaptopsOrder.BestDeal,
                  forStudents: true,
                }}
              />
            </div>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forStudents"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textSmall">More for school</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="column centerColumn gapMedium">
            <h2 className="textLarge headerSmall">For Programming</h2>

            <div className="column centerColumn gapMedium centerRow width100">
              <FilteredLaptops
                args={{
                  maxLaptops: 3,
                  background: "background3",
                  order: LaptopsOrder.BestDeal,
                  forProgrammers: true,
                }}
              />
            </div>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forProgrammers"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textSmall">More for programming</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="rowCollapsible gapLarge centerRow flexWrap">
          <div className="column centerColumn gapMedium">
            <h2 className="textLarge headerSmall">For Gaming</h2>

            <div className="column centerColumn gapMedium centerRow width100">
              <FilteredLaptops
                args={{
                  maxLaptops: 3,
                  background: "background3",
                  order: LaptopsOrder.BestDeal,
                  forGaming: true,
                }}
              />
            </div>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forGaming"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textSmall">More for gaming</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="column centerColumn gapMedium">
            <h2 className="textLarge headerSmall">For Office Work</h2>

            <div className="column centerColumn gapMedium centerRow width100">
              <FilteredLaptops
                args={{
                  maxLaptops: 3,
                  background: "background3",
                  order: LaptopsOrder.BestDeal,
                  forWork: true,
                  
                }}
              />
            </div>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forOfficeWork"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textSmall">More for office work</h3>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="sectionPadded column centerColumn gapSmall">
        <div className="paddingMedium background2 borderBg3 widthFit centerColumn column gapMedium defaultBorderRadius">
          <h2 className="textMedium headerLarge textCenter">
            Not sure what you're looking for?
          </h2>
          <Link href="/discover" className="button buttonBg3">
            Try our discovery queue
            <span className="material-symbols-outlined">conditions</span>
          </Link>
        </div>
      </section>
      <section className="sectionPadded column centerColumn gapLarge background2">
        <div className="column centerColumn gapMedium">
          <h2 className="textLarge headerLarge">What we do</h2>

          <p className="textSmall textSlightTransparent">
            Our mission is to provide the best laptops to our users. While we
            make money through affiliate purchases, we rank laptops based on how
            good they are, not whoever pays us more.
          </p>
          <p className="textSmall textSlightTransparent">
            On Laptop Deals you can find lowest prices on the best new laptops
            for Windows, Linux and Macos. Filter by use-case including
            school/office work, gaming, programming and video editing.
          </p>
        </div>

        <div className="column centerColumn gapMedium">
          <h3 className="textMedium headerSmall">How it works</h3>
          <p className="textSmall textSlightTransparent">
            We filter laptops from top sellers, taking only the very best
            devices and identifying the greatest discounts and price trends. You
            can use our{" "}
            <Link className="textPrimaryButton" href="/laptops">
              advanced filtering tools
            </Link>{" "}
            or{" "}
            <Link className="textPrimaryButton" href="/discover">
              recommendation feature
            </Link>{" "}
            to find the best laptop for your specific needs.
          </p>
        </div>
      </section>
    </main>
  );
}
