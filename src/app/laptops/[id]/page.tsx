import { trpc } from "@/lib/trpc";
import LaptopView from "./laptop";
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

  const laptop = await e
    .select(e.Laptop, () => ({
      name: true,
      price: true,
      saleOf: true,
      forStudents: true,
      forGaming: true,
      forProgrammers: true,
      forOfficeWork: true,
      forVideoEditing: true,
      cpuName: true,
      gpuName: true,
      displayName: true,
      titleImageId: true,
      filter_single: { id },
    }))
    .run(edgeClient);

  const useCaseNameMap = Object.keys(LaptopUseCase);
  const useCaseNames = [
    laptop?.forStudents,
    laptop?.forGaming,
    laptop?.forProgrammers,
    laptop?.forOfficeWork,
    laptop?.forVideoEditing,
  ]
    .filter((value) => value)
    .map((value, i) => useCaseNameMap[i as unknown as number]);

const description = `Shop for ${laptop?.name} laptop at $${laptop?.price} ${
      (laptop?.saleOf || 0) > 0 ? "on sale for $" + laptop?.saleOf : ""
    } great for ${useCaseNames.join(", ")}. See more laptops at ${SITE_NAME}.`

  return {
    title: laptop?.name,
    description,
    keywords: [
      `${laptop?.name} laptop`,
      ...useCaseNames.map((value) => `${value} laptop`),
      laptop?.cpuName || "",
      laptop?.gpuName || "",
      laptop?.displayName || "",
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
      "Nvidia"
    ],
    openGraph: {
      title: laptop?.name || undefined,
      description,
      images: [
        {
          url:
            (process.env.NEXT_PUBLIC_SITE_URL ||
              "https://laptops.marvinmediagroup.com/laptopImages/") +
              laptop?.titleImageId +
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
