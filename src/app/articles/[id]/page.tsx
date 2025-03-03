import { trpc } from "@/lib/trpc";
import * as React from "react";
import "./page.scss";
import { LaptopsOrder, LaptopUseCase } from "@/types/laptop";
import FilteredLaptops from "@/components/filteredLaptops";
import { underscoresToSpaces } from "@/utils/units";
import Loading from "@/components/loadingSpinner";
import { useRouter } from "next/navigation";
import SimilarLaptops from "@/components/similarLaptops";
import Head from "next/head";
import { SITE_NAME } from "@/constants/site";
import { Metadata } from "next";
import Content from "./content";
import e from "../../../../dbschema/edgeql-js";
import { edgeClient } from "@/scripts/db";

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;

  const article = await e
    .select(e.Article, () => ({
      title: true,
      summary: true,
      filter_single: { id },
    }))
    .run(edgeClient);

  return {
    title: article?.title,
    description: article?.summary,
    keywords: [
      "laptops",
      "macbooks",
      "computers",
      "laptop deals",
      "laptops for sale",
      "laptops for students",
      "laptops for gamers",
      "laptops for programmers",
      "laptops for office work",
      "laptops for video editing",
      "Intel",
      "AMD",
      "Nvidia",
    ],
    openGraph: {
      title: article?.title || undefined,
      description: article?.summary || undefined,
      images: [
        {
          url:
            (process.env.NEXT_PUBLIC_SITE_URL ||
              "https://laptops.marvinmediagroup.com/articleImages/") +
            id +
            ".webp",
        },
      ],
    },
  };
}

export default function Laptop({ params }: { params: Promise<Params> }) {
  const { id } = React.use(params);

  return <Content id={id} />;
}
