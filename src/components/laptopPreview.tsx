"use client"

import { useEffect, useState } from "react"
import "./laptopPreview.scss"
import Image from "next/image"
import heroBg from "../app/public/heroBg.jpg"

interface LaptopPreviewArgs {
    name: string
    price: number
    saleOf: number
    macos: boolean
    windows: boolean
    linux: boolean
    titleImage: Uint8Array
    color?: string
}

export default function LaptopPreview({ args }: {args: LaptopPreviewArgs}) {

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
      // Create a Blob from the byte array
      const blob = new Blob([args.titleImage], { type: 'image/jpeg' }); // Adjust MIME type as needed
  
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
        args.color = "background2"
    }

    return (
        <div className="laptopPreview defaultBorderRadius row gapMedium paddingMedium" style={{ borderColor: `var(--${args.color})`}}>
            <Image alt="laptop" src={heroBg} className="laptopPreviewImage defaultBorderRadius" />
            <div className="column gapSmall width100">
                <h3 className={"textMedium headerSmall"}>{args.name}</h3>
                <h4 className={"textSmall headerSmall row gapSmall"}>${args.price} <div className="strikeThrough textSlightTransparent">{args.saleOf}</div></h4>
            </div>
        </div>
    )
}

export function generateLaptopPreviews(count: number, args: LaptopPreviewArgs) {
    const articlePreviews = []
    for (let i = 0; i < count; i++) {
        articlePreviews.push(<LaptopPreview key={i} args={args} />)
    }
    return articlePreviews
}