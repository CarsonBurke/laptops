"use client";

import { generateArticlePreviews } from "@/components/articlePreview";

export default function Articles() {
  return (
    <main className="main">
      <section className="sectionPadded column gapLarge">
        <h1 className="textLarge headerLarge textCenter">Articles</h1>

        <div className="row flexWrap gapMedium centerRow">
          {generateArticlePreviews(12, {
            color: "background2",
            data: { title: "This is a title of an article", id: 1, titleImageName: "Macbook_Guide_2025_01_30" },
          })}
        </div>
      </section>
    </main>
  );
}
