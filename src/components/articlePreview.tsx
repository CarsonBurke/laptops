"use client";

import { useEffect, useState } from "react";
import "./articlePreview.scss";
import Link from "next/link";
import { spacesToUnderscores } from "@/utils/units";
import Image from "next/image";

interface ArticlePreviewData {
  id: number;
  title: string;
  summary: string;
  published: Date;
  titleImageId: string;
}

interface ArticlePreviewArgs {
  data: ArticlePreviewData;
  color?: string;
}

export default function ArticlePreview({ args }: { args: ArticlePreviewArgs }) {
  /* const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {

    // Create a Blob from the byte array
    const blob = new Blob([args.data.titleImage], { type: "image/jpeg" }); // Adjust MIME type as needed

    // Generate an object URL
    const objectUrl = URL.createObjectURL(blob);

    // Set the object URL as the image source
    setImageSrc(objectUrl);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [args.data.titleImage]); */

  if (!args.color) {
    args.color = "background2";
  }

  function summaryCut() {
    // regex spaces
    const words = args.data.summary.split(/\s+/);

    if (words.length > 12) {
      return words.slice(0, 12).join(" ") + "...";
    }

    return args.data.summary;
  }

  return (
    <Link
      href={`/articles/${args.data.id}`}
      className="articlePreview defaultBorderRadius column gapMedium paddingMedium pointer defaultTransition"
      style={
        {
          borderColor: `var(--${args.color})`,
          "--articleBackground": `var(--${args.color})`,
        } as React.CSSProperties
      }
    >
      <Image
        width={500}
        height={500}
        alt="article preview image"
        src={`/articleImages/${args.data.titleImageId}.webp`}
        className="articlePreviewImage defaultBorderRadius"
      />

      <div className="column gapMedium">
        <div className="column gapSmall">
          <h2 className={"textMedium headerSmall textCenter"}>
            {args.data.title}
          </h2>
        </div>

        <p className="textSmall textSlightTransparent textCenter">
          {summaryCut()}
        </p>
      </div>
    </Link>
  );
}
