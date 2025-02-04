"use client";

import { useEffect, useState } from "react";
import "./articlePreview.scss";
import Link from "next/link";
import { spacesToUnderscores } from "@/utils/units";

interface ArticlePreviewData {
  id: number;
  title: string;
  titleImageName: string;
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
  }, [args.data.titleImage]);

  if (!args.color) {
    args.color = "background2";
  } */

  return (
    <Link
      href={`/articles/${spacesToUnderscores(args.data.title)}`}
      className="articlePreview defaultBorderRadius column gapMedium paddingMedium pointer defaultTransition"
      style={
        {
          borderColor: `var(--${args.color})`,
          "--articleBackground": `var(--${args.color})`,
        } as React.CSSProperties
      }
    >
      <img
        alt="article"
        src={`{/articleTitles/${args.data.titleImageName}.png}`}
        className="articlePreviewImage defaultBorderRadius"
      />

      <div className="column gapMedium width100">
        <div className="column gapSmall">
          <h3 className={"textMedium headerSmall textCenter"}>
            {args.data.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function generateArticlePreviews(
  count: number,
  args: ArticlePreviewArgs
) {
  const articlePreviews = [];
  for (let i = 0; i < count; i++) {
    articlePreviews.push(<ArticlePreview key={i} args={args} />);
  }
  return articlePreviews;
}
