"use client";

import { useEffect, useState } from "react";
import "./laptopPreview.scss";
import Image from "next/image";
import heroBg from "../app/public/heroBg.jpg";
import Link from "next/link";

interface LaptopPreviewArgs {
  name: string;
  price: number;
  saleOf: number;
  macos: boolean;
  windows: boolean;
  linux: boolean;
  titleImage: Uint8Array;
  ram: number;
  storage: number;
  cores: number;
  topFrequency: number;
  color?: string;
}

export default function LaptopPreview({ args }: { args: LaptopPreviewArgs }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Create a Blob from the byte array
    const blob = new Blob([args.titleImage], { type: "image/jpeg" }); // Adjust MIME type as needed

    // Generate an object URL
    const objectUrl = URL.createObjectURL(blob);

    // Set the object URL as the image source
    setImageSrc(objectUrl);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [args.titleImage]);

  if (!args.color) {
    args.color = "background2";
  }

  let salePrice = args.price - args.saleOf;

  return (
    <Link
      href={`/laptops/${args.name}`}
      className="laptopPreview defaultBorderRadius row gapMedium paddingMedium pointer defaultTransition"
      style={
        {
          borderColor: `var(--${args.color})`,
          "--laptopBackground": `var(--${args.color})`,
        } as React.CSSProperties
      }
    >
      <Image
        alt="laptop"
        src={heroBg}
        className="laptopPreviewImage defaultBorderRadius"
      />
      <div className="column gapMedium width100">
        <div className="column gapSmall">
          <h3 className={"textMedium headerSmall"}>{args.name}</h3>
          <div className="row gapSmall centerColumn">
            <h4 className={"textSmall headerSmall row"}>${salePrice}</h4>
            <div className="strikeThrough textSlightTransparent">
              {args.price}
            </div>
            <div>Save ${args.price - salePrice}</div>
          </div>
        </div>

        <div className="column gapSmall">
          <div className="row flexWrap gapSmall textSlightTransparent">
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Memory"
            >
              <span className="material-symbols-outlined">memory_alt</span>
              {args.ram} GB
            </h4>
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Storage"
            >
              <span className="material-symbols-outlined">storage</span>
              {args.storage} GB
            </h4>
          </div>
          <div className="row flexWrap gapSmall textSlightTransparent">
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Processor Cores"
            >
              <span className="material-symbols-outlined">memory</span>
              {args.cores}
            </h4>
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Top Frequency"
            >
              <span className="material-symbols-outlined">speed</span>
              {args.topFrequency.toFixed(1)} Ghz
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function generateLaptopPreviews(count: number, args: LaptopPreviewArgs) {
  const articlePreviews = [];
  for (let i = 0; i < count; i++) {
    articlePreviews.push(<LaptopPreview key={i} args={args} />);
  }
  return articlePreviews;
}
