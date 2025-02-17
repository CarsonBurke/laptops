import { generateFakeLaptopPreviews } from "@/components/fakeLaptopPreview";

export default function TestLaptopPreviews() {
  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="paddingMedium column gapLarge centerColumn">
          <h1 className="textLarge headerLarge">Test laptop previews</h1>

          <div className="flexWrap row gapMedium centerRow">
            {generateFakeLaptopPreviews(12, "background2")}
          </div>
        </div>
      </section>
    </main>
  );
}
