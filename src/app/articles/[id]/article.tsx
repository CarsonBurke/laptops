"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { trpc } from "@/lib/trpc";
import LaptopPreview from "@/components/laptopPreview";
import FakeLaptopPreview from "@/components/fakeLaptopPreview";
import { underscoresToSpaces } from "@/utils/units";
import FakeArticlePreview from "@/components/fakeArticlePreview";
import { Article } from "@/types/article";
import "./article.scss";
import Link from "next/link";
import Loading from "@/components/loadingSpinner";

/* interface ArticleArgs {
    title: string,

    content: string,
} */

export default function ArticleView({
  args,
}: {
  args: { data: Partial<Article> };
}) {
  /*   const testMarkdownContent = `
      ## **this is markdown text** etc.
    
      ~~~laptop
      5100f3cc-e2bf-11ef-80dc-27f68e18f839
      ~~~
    
      ~~~article
      53973c22-e2bf-11ef-976f-67d8231d1548
      ~~~
      `; */

  const authorResult = trpc.getAuthorById.useQuery({
    id: args.data.authorId,
  });

  return (
    <article className="column gapLarge paddingMedium background2 borderBg3 article">
      <div className="column centerColumn gapMedium">
        <div className="column centerColumn">
          <h1 className="textLarge headerLarge textCenter">
            {args.data.title}
          </h1>

          <div className="row gapSmall textXSmall centerColumn textSlightTransparent">
            {authorResult.isLoading ? (
              <Loading color={3} />
            ) : (
              <Link
                href={`/authors/${authorResult.data?.id}`}
                className="button textGlowButton"
              >
                By {underscoresToSpaces(authorResult.data?.name || "")}
              </Link>
            )}
            •
            <p>
              {args.data.published?.toDateString()}
            </p>
          </div>
        </div>

        <p className="textSmall">{args.data.summary}</p>

        <Image
          className="articleTitleImage"
          priority={true}
          alt={args.data.title || "unknown"}
          src={`/articleImages/${args.data.titleImageId}.webp`}
          width={1200}
          height={900}
        />
      </div>

      <ReactMarkdown
        // Column on markdown text might be a very bad idea
        className="textSmall articleContent column gapLarge"
        children={args.data.content}
        components={{
          a(props) {
            return (
              <a href={props.href} target="_blank">
                {props.children}
              </a>
            );
          },

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
              const cleanedId =
                children?.toString()?.replace(/(\^\s+|\s+$)/g, "") || "";

              let { data, isLoading } = trpc.getLaptopById.useQuery({
                id: cleanedId,
              });

              return isLoading || !data ? (
                <FakeLaptopPreview color={"background3"} />
              ) : (
                <LaptopPreview
                  args={{ data: data as any, color: "background3" }}
                />
              );
            }

            if (match[1] == "image") {
              // Remove trailing and proceeding whitespace
              const cleanedId =
                children?.toString()?.replace(/(\^\s+|\s+$)/g, "") || "";

              const image = args.data.contentImageIds?.[parseInt(cleanedId)];

              if (image) {
                return (
                  <Image
                    width={500}
                    height={500}
                    alt="Embedded article image"
                    src={`/articleImages/${image}.webp`}
                    className="contentImage"
                  />
                );
              }

              return (
                <div className="contentImage row centerRow centerColumn background3">
                  Image: {cleanedId.split(" ")[0]}
                </div>
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

      <div className="column gapSmall background3 borderBg4 paddingMedium defaultBorderRadius">
        <div className="row centerColumn gapSmall">
          <Image
            width={50}
            height={50}
            alt={`author: ${authorResult.data?.name}`}
            src={`/authorImages/${authorResult.data?.profileImageName}.webp`}
            className="authorImage"
          />
          <Link
            href={`/authors/${authorResult.data?.id}`}
            className="textSmall headerSmall button textGlowButton"
          >
            By {underscoresToSpaces(authorResult.data?.name || "")}
          </Link>
        </div>
        <p className="textXSmall textSlightTransparent">
          {authorResult.data?.description}
        </p>
      </div>
    </article>
  );
}
