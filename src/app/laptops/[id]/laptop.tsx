import { Laptop, LaptopUseCase } from "@/types/laptop";
import Image from "next/image";
import { useEffect, useState } from "react";
import computerImage from "../../../../outside_media/computer.webp";
import TableDouble from "@/components/tableDouble";
import Button from "@/components/button";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  formatBytes,
  numberCommas,
  spacesToUnderscores,
  underscoresToSpaces,
} from "@/utils/units";
import "./laptop.scss";

interface LaptopViewProps {
  data: Laptop;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function LaptopView({ data }: { data: Laptop }) {
  /* const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Create a Blob from the byte array
    const blob = new Blob([data.titleImageName], { type: "image/jpeg" }); // Adjust MIME type as needed

    // Generate an object URL
    const objectUrl = URL.createObjectURL(blob);

    // Set the object URL as the image source
    setImageSrc(objectUrl);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data.titleImageName]); */

  const useCases = [
    data.forStudents,
    data.forGaming,
    data.forProgrammers,
    data.forOfficeWork,
  ];

  const useCaseNames = Object.values(LaptopUseCase).filter(
    (_, i) => useCases[i]
  );

  const avgHistoryPrice =
    data.priceHistory.reduce((sum, val) => sum + val, 0) /
    data.priceHistory.length;
  const recommendBuy = data.price <= avgHistoryPrice;

  return (
    <div className="column gapSmall">
      <article className="paddingMedium column gapLarge column background2 borderBg3 defaultBorderRadius">
        <div className="row centerRow">
          <div className="rowCollapsible gapMedium paddingMedium widthFit centerRow defaultBorderRadius centerColumn">
            <Image
              width={1000}
              height={800}
              alt={`laptop: ${data.name}`}
              src={`/laptopImages/${data.titleImageId}.webp`}
              className="laptopHeroImage defaultBorderRadius"
            />

            <div className="column gapMedium">
              <div className="column">
                <h1 className="textLarge headerLarge">
                  {underscoresToSpaces(data.name)}
                </h1>
                <div className="row gapSmall centerColumn">
                  <h4 className={"textSmall headerSmall row"}>
                    ${numberCommas(data.price)}
                  </h4>
                  {data.saleOf > 0 && (
                    <>
                      <div className="strikeThrough textSlightTransparent">
                        {numberCommas(data.price + data.saleOf)}
                      </div>
                      <div>Save ${numberCommas(data.saleOf)}</div>
                    </>
                  )}
                </div>
              </div>

              <div className="column gapSmall">
                <div className="row gapSmall flexWrap rowCenterMobile">
                  {useCaseNames.map((useCase, i) => {
                    return (
                      <div
                        key={i}
                        className="column background2 useCasePill defaultBorderRadius background3 maxBorderRadius"
                      >
                        <h3 className="textXSmall">{useCase}</h3>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={data.affiliate}
                  target="_blank"
                  className="width100Mobile button buttonPrimary textSmall headerSmall row centerRow centerColumn"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  Buy
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rowCollapsible gapLarge">
          <div className="width100 column centerRow centerColumn gapMedium">
            <h2 className="textMedium headerLarge">Overview</h2>

            <TableDouble
              header={
                <div className="row gapSmall centerColumn flexWrap">
                  <h2 className="textSmall headerSmall row gapSmall">
                    <span className="material-symbols-outlined">laptop</span>
                    Screen
                  </h2>
                  <h3 className="textXSmall center textSlightTransparent">
                    {data.displayName || "Unknown"}
                  </h3>
                </div>
              }
              rows={[
                [
                  <h3 className="textXSmall headerSmall">Size</h3>,
                  <h3 className="textXSmall">{data.size} inches</h3>,
                ],
                [
                  <h3 className="textXSmall headerSmall">Resolution</h3>,
                  <h3 className="textXSmall">{data.resolution}p</h3>,
                ],
              ]}
              background="background3"
            />

            <TableDouble
              header={
                <div className="row gapSmall centerColumn flexWrap">
                  <h2 className="textSmall headerSmall row gapSmall">
                    <span className="material-symbols-outlined">
                      memory_alt
                    </span>
                    Storage
                    {/* <div className="textSlightTransparent">Storage Device</div> */}
                  </h2>
                  <h3 className="textXSmall textSlightTransparent">
                    {data.storageName || "Unknown"}
                  </h3>
                </div>
              }
              rows={[
                [
                  <h3 className="textXSmall headerSmall">Storage</h3>,
                  <h3 className="textXSmall">{formatBytes(data.storage)}</h3>,
                ],
                [
                  <h3 className="textXSmall headerSmall">Memory</h3>,
                  <h3 className="textXSmall">{data.ram} GB</h3>,
                ],
              ]}
              background="background3"
            />

            <TableDouble
              header={
                <div className="row gapSmall centerColumn flexWrap">
                  <h2 className="textSmall headerSmall row gapSmall flexWrap">
                    <span className="material-symbols-outlined">memory</span>
                    Processor
                  </h2>
                  <h3 className="textXSmall textSlightTransparent">
                    {data.cpuName}
                  </h3>
                </div>
              }
              rows={[
                [
                  <h3 className="textXSmall headerSmall">Logical Cores</h3>,
                  <h3 className="textXSmall">{data.cores}</h3>,
                ],
                [
                  <h3 className="textXSmall headerSmall">Top speed</h3>,
                  <h3 className="textXSmall">
                    {data.topFrequency.toFixed(1)} GHz
                  </h3>,
                ],
              ]}
              background="background3"
            />

            <TableDouble
              header={
                <div className="row gapSmall centerColumn flexWrap">
                  <h2 className="textSmall headerSmall row gapSmall">
                    <span className="material-symbols-outlined">
                      audio_video_receiver
                    </span>
                  </h2>
                  Graphics
                  <div className="textXSmall textSlightTransparent">
                    {data.gpuName}
                  </div>
                  <h3 className="textXSmall textSlightTransparent">
                    ({data.hasDedicatedGpu ? <>Dedicated</> : <>Integrated</>})
                  </h3>
                </div>
              }
              rows={[
                /* [
                <h3 className="textXSmall headerSmall">Cores</h3>,
                <h3 className="textXSmall">{data.cores}</h3>,
              ], */
                [
                  <h3 className="textXSmall headerSmall">Virtual Memory</h3>,
                  <h3 className="textXSmall">
                    {data.vram || "Unknown"} GB
                    {/* {data.topFrequency.toFixed(1)} GB */}
                  </h3>,
                ],
              ]}
              background="background3"
            />

            <h3 className="row gapXSmall flexWrap textSlightTransparent textXSmall">
              Not sure what these mean? See our{" "}
              <Link
                className="button textGlowButton textPrimary"
                href="/cheatsheet"
              >
                guide
              </Link>
            </h3>
          </div>
          <div className="column gapLarge">
            <div className="column gapMedium">
              <h2 className="textMedium headerLarge textCenter">
                Price History
              </h2>

              {/* <h3 className="textSmall textSlightTrasparent textCenter">No Data at this time, sorry</h3> */}

              <Line
                options={{
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return ` $${context.parsed.y}`;
                        },
                      },
                    },
                  },
                }}
                data={{
                  labels: data.priceHistory.map((_, i) => {
                    const offsetDate = new Date(
                      new Date().setDate(new Date().getDate() - i * 7)
                    );
                    const month = monthsShort[offsetDate.getMonth()];
                    return `${month} ${offsetDate.getDate()}`;
                  }),
                  datasets: [
                    {
                      label: "Price",
                      data: data.priceHistory,
                      backgroundColor: "rgb(10, 106, 202)",
                      borderColor: "rgb(9, 119, 228)",
                      borderWidth: 3,
                      pointRadius: 6,
                      fill: true,
                    },
                  ],
                }}
              />

              <h3 className="textSmall row gapSmall centerRow textSlightTransparent">
                Determination:{" "}
                {recommendBuy ? (
                  <div className="textPositive">Good deal</div>
                ) : (
                  <div className="textDestructive">Overpriced</div>
                )}
              </h3>
            </div>

            <div className="column gapMedium">
              <div className="column">
                <h2 className="textMedium headerLarge textCenter">
                  Our Rating
                </h2>
                <h3 className="textXSmall textSlightTransparent textCenter">
                  Relative scores based on expected hardware needs
                </h3>
              </div>

              <div className="column gapSmall">
                <div className="row flexWrap gapSmall centerRow">
                  {(
                    [
                      ["Students", data.studentScore],
                      ["Gaming", data.gamingScore],
                      ["Programming", data.programmingScore],
                      ["Office work", data.officeWorkScore],
                      ["Video editing", data.videoEditingScore],
                    ] as [string, number][]
                  ).map(([name, score], i) => {
                    return (
                      <div
                        className="row background2 useCasePill defaultBorderRadius background3 maxBorderRadius gapSmall widthFit"
                        key={i}
                      >
                        <h3 className="textXSmall">{name}</h3>
                        <h3 className="textXSmall headerSmall">{score}%</h3>
                      </div>
                    );
                  })}
                </div>

                {/* <div className="row gapSmall centerRow">
                <h3 className="textSmall row gapSmall centerRow textSlightTransparent">
                  How did we come up with these?
                </h3>
                <Link
                  href="/ourScores"
                  className="button textGlowButton textPrimary"
                >
                  Here's how
                </Link>
              </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="column centerColumn">
        <h2 className="textMedium headerLarge">Detailed Specifications</h2>
      </div> */}
      </article>
      <div className="row textXSmall gapXSmall centerRow">
        <h4 className="textCenter textSlightTransparent">
          Think something is missing?
        </h4>
        <Link
          className="button textPrimary textGlowButton textSlightTransparent"
          href="/contact"
        >
          Let us know
        </Link>
      </div>
    </div>
  );
}
