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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { trpc } from "@/lib/trpc";
import Laptop from "@/app/laptops/[id]/page";
import LaptopPreview from "@/components/laptopPreview";
import FakeLaptopPreview from "@/components/fakeLaptopPreview";

export default function Article({ params }: { params: { id: string } }) {
  const { id } = React.use(params as any) as { id: string };

  const testMarkdownContent = `
  ## **this is markdown text** etc.

  ~~~laptop
  Laptop Name 4
  ~~~

  ~~~article
  Article Name 1
  ~~~
  `;

  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible flexWrap gapMedium centerRow">
        <article className="column paddingMedium background2 borderBg3 article">
          <h1 className="textLarge headerLarge textCenter">
            Article Name {id}
          </h1>

          <img alt="title image" />

          <ReactMarkdown
            // Column on markdown text might be a very bad idea
            className="textSmall column gapSmall"
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
                  let name =
                    children?.toString()?.replace(/(\^\s+|\s+$)/g, "") || "";

                  let { data, isLoading } = trpc.getLaptopByName.useQuery({
                    name,
                  });

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
