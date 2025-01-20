import { Laptop } from "@/types/db";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LaptopViewProps {
  data: Laptop;
}

export default function LaptopView({ data }: { data: Laptop }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Create a Blob from the byte array
    const blob = new Blob([data.titleImage], { type: "image/jpeg" }); // Adjust MIME type as needed

    // Generate an object URL
    const objectUrl = URL.createObjectURL(blob);

    // Set the object URL as the image source
    setImageSrc(objectUrl);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data.titleImage]);

  return (
    <article className="paddingMedium column gapLarge">
      <h1 className="textLarge headerLarge textCenter">{data.name}</h1>

      <div className="rowCollapsible gapLarge">
        <div className="width100 column">
          {imageSrc != null ? (
            <img
              alt="laptop"
              src={imageSrc as any}
              className="sectionImage laptopPreviewImage defaultBorderRadius"
            />
          ) : (
            <div
              className={
                "sectionImage laptopPreviewImage animatePlaceholder defaultBorderRadius"
              }
            ></div>
          )}
        </div>
        <div className="width100 column centerRow centerColumn gapMedium">
          <h2 className="textMedium headerLarge">Specifications</h2>

          <table className="background3 paddingSmall defaultBorderRadius">
            <tbody>
              <tr>
                <th>CPU Cores</th>
                <th>Resolution</th>
              </tr>
              <tr>
                <td>Processor</td>
                <td>{data.cores}</td>
              </tr>
              <tr>
                <td>Screen Size</td>
                <td>{data.resolution}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="column centerColumn">
        <h2 className="textMedium headerLarge">Price History</h2>
      </div>
    </article>
  );
}
