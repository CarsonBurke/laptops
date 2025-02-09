"use client";

import { trpc } from "@/lib/trpc";
import React from "react";
import "./page.scss";

export default function Author({ params }: { params: Promise<any> }) {
  const { id } = React.use(params as any) as { id: string };

  const { data, isLoading } = trpc.getAuthorById.useQuery({
    id,
  });

  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column paddingMedium background2 borderBg3 centerColumn gapMedium">
          <div className="row centerColumn gapSmall">
            <img
              src={`/${data?.profileImageName}.webp`}
              alt="author image"
              className="authorImage"
            />
            <h1 className="textLarge headerLarge textCenter">{data?.name}</h1>
          </div>

        <p className="textSmall textSlightTransparent">{data?.description}</p>
        </div>
      </section>
    </main>
  );
}
