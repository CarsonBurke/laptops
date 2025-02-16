"use client";

import { useEffect, useState } from "react";
import "./laptopPreview.scss";
import Image from "next/image";
import Link from "next/link";
import { formatBytes, numberCommas, spacesToUnderscores, underscoresToSpaces } from "@/utils/units";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";

interface LaptopPreviewData {
  id: string;
  name: string;
  price: number;
  saleOf: number;
  macos: boolean;
  windows: boolean;
  linux: boolean;
  titleImageName: string;
  size: number;
  resolution: number;
  ram: number;
  storage: number;
  cores: number;
  topFrequency: number;
}

interface LaptopPreviewArgs {
  data: LaptopPreviewData;
  color?: string;
}

export default function LaptopPreview({ args }: { args: LaptopPreviewArgs }) {

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

  return (
    <Link
      href={`/laptops/${spacesToUnderscores(args.data.id)}`}
      className="laptopPreview defaultBorderRadius rowCollapsible gapMedium paddingMedium pointer defaultTransition"
      style={
        {
          borderColor: `var(--${args.color})`,
          "--laptopBackground": `var(--${args.color})`,
        } as React.CSSProperties
      }
    >
      
        <img
          alt="laptop"
          src={`/laptopTitles/${args.data.titleImageName}.webp`}
          className="laptopPreviewImage defaultBorderRadius"
        />
      

      <div className="column gapMedium width100">
        <div className="column gapSmall">
          <h3 className={"textMedium headerSmall"}>{underscoresToSpaces(args.data.name)}</h3>
          <div className="row gapSmall centerColumn">
            <h4 className={"textSmall headerSmall row"}>${numberCommas(args.data.price)}</h4>
            <div className="strikeThrough textSlightTransparent">
              {numberCommas(args.data.price + args.data.saleOf)}
            </div>
            <div>Save ${numberCommas(args.data.saleOf)}</div>
          </div>
        </div>

        <div className="column gapSmall">
          <div className="row gapSmall textSlightTransparent">
            <h4 className="textXSmall gapXSmall row centerColumn">{args.data.size} inch • {args.data.resolution}p</h4>
          </div>
          <div className="row flexWrap gapSmall textSlightTransparent">
            {/* <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Memory"
            >
              <span className="material-symbols-outlined">memory_alt</span>
              {args.data.ram} GB
            </h4> */}
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Storage"
            >
              <span className="material-symbols-outlined">storage</span>
              {formatBytes(args.data.storage)} • {args.data.ram} GB
            </h4>
          </div>
          <div className="row flexWrap gapSmall textSlightTransparent">
            <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Processor Cores"
            >
              <span className="material-symbols-outlined">memory</span>
              {args.data.cores} • {args.data.topFrequency.toFixed(1)} Ghz
            </h4>
            {/* <h4
              className="textXSmall gapXSmall row centerColumn"
              title="Top Frequency"
            >
              <span className="material-symbols-outlined">speed</span>
              {args.data.topFrequency.toFixed(1)} Ghz
            </h4> */}
          </div>
          <div className="row flexWrap gapSmall">
              {args.data.windows ? <Image src={windowsIcon} alt="windows" width={20} height={20} title="Windows" /> : <></>}
              {args.data.macos ? <Image src={macIcon} alt="macos" width={20} height={20} title="macOS"/> : <></>}
              {args.data.linux ? <Image src={linuxIcon} alt="linux" width={20} height={20} title="Linux"/> : <></>}
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
