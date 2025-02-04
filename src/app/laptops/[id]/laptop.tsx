import { Laptop, LaptopUseCase } from "@/types/db";
import Image from "next/image";
import { useEffect, useState } from "react";
import computerImage from "../../../../outside_media/computer.jpg";
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
import { formatBytes, numberCommas } from "@/utils/units";

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
    <article className="paddingMedium column gapLarge">
      <div className="row centerRow">
        <div className="rowCollapsible gapMedium paddingMedium widthFit centerRow defaultBorderRadius centerColumn">
          
            <img
              alt="laptop"
              src={`/laptopTitles/${data.titleImageName}.png`}
              className="laptopHeroImage defaultBorderRadius"
            />
          
          <div className="column gapMedium">
            <h1 className="textLarge headerLarge">{data.name}</h1>
            <div className="row gapSmall centerColumn">
              <h4 className={"textSmall headerSmall row"}>
                ${numberCommas(data.price)}
              </h4>
              <div className="strikeThrough textSlightTransparent">
                {numberCommas(data.price + data.saleOf)}
              </div>
              <div>Save ${numberCommas(data.saleOf)}</div>
            </div>
            <div className="row gapSmall flexWrap">
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
              href="https://www.example.com"
              target="_blank"
              className="button buttonPrimary textSmall headerSmall row centerRow centerColumn"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="rowCollapsible gapLarge">
        <div className="width100 column centerRow centerColumn gapMedium">
          <h2 className="textMedium headerLarge">Overview</h2>

          {/*           <TableDouble
            header={
              <h2 className="textSmall headerSmall row gapSmall">
                <span className="material-symbols-outlined">overview_key</span>
                Overview
              </h2>
            }
            rows={[
              [
                <h3 className="textXSmall headerSmall">CPU Cores</h3>,
                <h3 className="textXSmall">{data.cores}</h3>,
              ],
              [
                <h3 className="textXSmall headerSmall">Max frequency</h3>,
                <h3 className="textXSmall">
                  {data.topFrequency.toFixed(1)} GHz
                </h3>,
              ],
              [
                <h3 className="textXSmall headerSmall">Screen Size</h3>,
                <h3 className="textXSmall">{data.size}</h3>,
              ],
              [
                <h3 className="textXSmall headerSmall">Screen Resolution</h3>,
                <h3 className="textXSmall">{data.resolution}</h3>,
              ],
              [
                <h3 className="textXSmall headerSmall">Storage</h3>,
                <h3 className="textXSmall">{data.storage} GB</h3>,
              ],
              [
                <h3 className="textXSmall headerSmall">Memory</h3>,
                <h3 className="textXSmall">{data.ram} GB</h3>,
              ],
            ]}
            background="background3"
          /> */}

          <TableDouble
            header={
              <h2 className="textSmall headerSmall row gapSmall">
                <span className="material-symbols-outlined">laptop</span>
                Screen
                <div className="textSlightTransparent">{/* Screen Type */}</div>
              </h2>
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
              <h2 className="textSmall headerSmall row gapSmall">
                <span className="material-symbols-outlined">memory_alt</span>
                Storage
                {/* <div className="textSlightTransparent">Storage Device</div> */}
              </h2>
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
              <h2 className="textSmall headerSmall row gapSmall">
                <span className="material-symbols-outlined">memory</span>
                Processor
                <div className="textSlightTransparent">{data.cpuName}</div>
              </h2>
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
              <div className="row gapSmall centerColumn">
                <h2 className="textSmall headerSmall row gapSmall">
                  <span className="material-symbols-outlined">
                    audio_video_receiver
                  </span>
                  Graphics
                  <div className="textSlightTransparent">{data.gpuName}</div>
                </h2>
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

          <h3 className="row gapXSmall flexWrap">
            Not sure what these mean? See our{" "}
            <Link
              className="button textGlowButton textPrimary"
              href="/cheatsheet"
            >
              guide
            </Link>
          </h3>
        </div>
        <div className="width100 column gapLarge">
          <div className="column gapMedium">
            <h2 className="textMedium headerLarge textCenter">Price History</h2>

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
              <h2 className="textMedium headerLarge textCenter">Our Scores</h2>
              <h3 className="textSmall textSlightTransparent textCenter">Relative scores based on expected hardware needs</h3>
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
                      <h3 className="textXSmall headerSmall">
                        {score}%
                      </h3>
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
  );
}
