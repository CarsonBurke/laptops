import React from "react";
import Content from "./content";
import { Metadata } from "next";
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

  const author = await e
    .select(e.Author, () => ({
      name: true,
      description: true,
      profileImageName: true,
      filter_single: { id },
    }))
    .run(edgeClient);


    const title = `Articles by ${author?.name} | Laptop Deals`
    const description = `Read articles by ${author?.name} at Laptop Deals. Find the best deals on new laptops for students, gaming, programmers, office work, video editing and more. Get laptops and macbooks with windows, macos and linux for the lowest price.`

  return {
    title,
    description,
    keywords: [
      author?.name || "",
      `Articles by ${author?.name}`,
      "tech articles",
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
      title,
      description,
      images: [
        {
          url:
            (process.env.NEXT_PUBLIC_SITE_URL ||
              "https://laptops.marvinmediagroup.com/authorImages/") +
              author?.profileImageName +
            ".webp",
        },
      ],
    },
  };
}

export default function Author({ params }: { params: Promise<Params> }) {
  const { id } = React.use(params);

  return <Content id={id} />;
}
