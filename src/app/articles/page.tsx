"use client";

import { trpc } from "@/lib/trpc";
import ArticleView from "./[id]/article";
import ArticlePreview from "@/components/articlePreview";
import Loading from "@/components/loadingSpinner";
import FakeArticlePreview, { generateFakeArticlePreviews } from "@/components/fakeArticlePreview";

export default function Articles() {
  const { data, isLoading } = trpc.getArticles.useQuery({
    offset: 0,
    limit: 12,
  });

  return (
    <main className="main">
      <section className="sectionPadded column gapLarge">
        <h1 className="textLarge headerLarge textCenter">Articles</h1>

        <div className="row flexWrap gapMedium centerRow">
          {isLoading || !data ? (
            generateFakeArticlePreviews(12, "background2")
          ) : (
            data.map((article) => (
              <ArticlePreview key={article.id} args={{data: article as any}} />
            ))
          )}
          {/* {generateArticlePreviews(12, {
            color: "background2",
            data: { title: "This is a title of an article", id: 1, titleImageName: "Macbook_Guide_2025_01_30" },
          })} */}
        </div>
      </section>
    </main>
  );
}
