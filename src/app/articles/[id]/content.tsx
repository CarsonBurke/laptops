"use client";

import FakeArticlePreview, {
  generateFakeArticlePreviews,
} from "@/components/fakeArticlePreview";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./page.scss";
import { trpc } from "@/lib/trpc";
import LaptopPreview from "@/components/laptopPreview";
import FakeLaptopPreview from "@/components/fakeLaptopPreview";
import { underscoresToSpaces } from "@/utils/units";
import Image from "next/image";
import ArticleView from "./article";
import { Article } from "@/types/article";
import Loading from "@/components/loadingSpinner";

export default function ArticlePage({ id }: { id: string }) {
  const { data, isLoading } = trpc.getArticleById.useQuery({
    id,
  });

  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible flexWrap centerColumn gapLarge">
        {isLoading ? (
          <div className="column width100 centerColumn">
            <Loading color={2} />
          </div>
        ) : (
          <>
            <div className="articleContainer marginAuto">
              <ArticleView args={{ data: data as any as Article }} />
            </div>
            {/* <div className="column gapMedium centerColumn">
              <h2 className="textMedium headerSmall textCenter">
                Other Articles
              </h2>

              {generateFakeArticlePreviews(12, "background2")}
            </div> */}
          </>
        )}
      </section>
    </main>
  );
}
