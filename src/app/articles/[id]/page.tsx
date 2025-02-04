"use client";

import ArticlePreview, {
  generateArticlePreviews,
} from "@/components/articlePreview";
import FakeArticlePreview, {
  generateFakeArticlePreviews,
} from "@/components/fakeArticlePreview";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./article.scss";
import { trpc } from "@/lib/trpc";
import LaptopPreview from "@/components/laptopPreview";
import FakeLaptopPreview from "@/components/fakeLaptopPreview";
import { underscoresToSpaces } from "@/utils/units";
import Image from "next/image";

export default function Article({ params }: { params: Promise<any> }) {
  const { id } = React.use(params as any) as { id: string };

  const testMarkdownContent = `
  ## **this is markdown text** etc.

  ~~~laptop
  5100f3cc-e2bf-11ef-80dc-27f68e18f839
  ~~~

  ~~~article
  53973c22-e2bf-11ef-976f-67d8231d1548
  ~~~
  `;

  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible flexWrap gapMedium centerRow">
        <article className="column gapLarge paddingMedium background2 borderBg3 article">
          <div className="column centerColumn gapMedium">
            <h1 className="textLarge headerLarge textCenter">
              Article Name {id}
            </h1>

            <Image
              alt="title image"
              src="/laptopTitles/ZyphrusG14.png"
              width={500}
              height={500}
            />
          </div>

          <ReactMarkdown
            // Column on markdown text might be a very bad idea
            className="textSmall column gapMedium"
            children={testMarkdownContent}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");

                if (!match) {
                  return (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                }

                if (match[1] == "article") {
                  return <FakeArticlePreview color="background3" />;

                  // Remove trailing and proceeding whitespace
                  /* let name =
                    children?.toString()?.replace(/(\^\s+|\s+$)/g, "") || "";

                  let { data, isLoading } = trpc.getLaptopByName.useQuery({
                    name,
                  });

                  return isLoading ? (
                    <FakeArticlePreview color={"background3"} />
                  ) : (
                    <ArticlePreview
                      args={{ data: data as any, color: "background3" }}
                    />
                  ); */
                }

                if (match[1] == "laptop") {
                  // Remove trailing and proceeding whitespace
                  let cleanedId =
                    children?.toString()?.replace(/(\^\s+|\s+$)/g, "") || "";
                  console.log("cleaned id", cleanedId)
                  let { data, isLoading } = trpc.getLaptopByName.useQuery({
                    id: cleanedId,
                  });
                  console.log("result", data)
                  return isLoading ? (
                    <FakeLaptopPreview color={"background3"} />
                  ) : (
                    <LaptopPreview
                      args={{ data: data as any, color: "background3" }}
                    />
                  );
                }

                // return (
                //   <SyntaxHighlighter
                //     {...rest}
                //     children={String(children).replace(/\n$/, "")}
                //     language={match[1]}
                //     style={dark}
                //   />
                // );
                return (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </article>
        <div className="column gapMedium">
          <h2 className="textMedium headerSmall textCenter">Other Articles</h2>

          {generateFakeArticlePreviews(12, "background2")}
        </div>
      </section>
    </main>
  );
}
