"use client";

import { trpc } from "@/lib/trpc";
import React from "react";
import "./page.scss";
import Image from "next/image";
import AuthorArticles from "./authorArticles";

export default function Content({ id }: { id: string }) {

  const { data, isLoading } = trpc.getAuthorById.useQuery({
    id,
  });

  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column paddingMedium background2 borderBg3 centerColumn gapLarge">
          <div className="column gapSmall centerColumn">
            <div className="row centerColumn gapSmall">
              <Image
                width={100}
                height={100}
                alt={`author: ${data?.name}`}
                src={`/authorImages/${data?.profileImageName}.webp`}
                className="authorImage"
              />
              <h1 className="textLarge headerLarge textCenter">{data?.name}</h1>
            </div>

            <p className="textSmall textSlightTransparent">
              {data?.description}
            </p>
          </div>
          <div className="column gapMedium">
            <h2 className="textLarge headerSmall textCenter">Latest articles from {data?.name}</h2>

            <AuthorArticles authorId={data?.id || ""} />
          </div>
        </div>
      </section>
    </main>
  );
}
