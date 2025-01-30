"use client";

import { generateFakeLaptopPreviews } from "../../components/fakeLaptopPreview";
import Slider from "../../components/slider";
import linuxIcon from "../public/OSIcons/linux.svg";
import macIcon from "../public/OSIcons/mac.svg";
import windowsIcon from "../public/OSIcons/windows.svg";
import Image from "next/image";
import Accordian from "../../components/accordian";
import Checkbox from "../../components/checkbox";
import RadioGroup from "../../components/radioGroup";
import Select from "../../components/select";
import DoubleSlider from "../../components/doubleSlider";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import e from "../../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";
/* import { trpc } from "../utils/trpc"; */
import { trpc } from "../../lib/trpc";
import LaptopPreview from "@/components/laptopPreview";
import Display from "./display";
import { Laptop, LaptopsOrder } from "@/types/db";

/* import e from '@/dbschema/edgeql-js'; */

const laptopsPerPage = 6;

export default function Laptops() {
  // Filter states

  let [price, setPrice] = useState([0, 5000]);
  let [order, setOrder] = useState(LaptopsOrder.BestDeal);

  // Use cases
  let [forStudents, setforStudentss] = useState(true);
  let [forGaming, setforGaming] = useState(true);
  let [forProgrammers, setforProgrammers] = useState(true);
  let [forWork, setforWork] = useState(true);

  let [hasDedicatedGpu, setHasDedicatedGpu] = useState(false);
  let [vram, setVram] = useState([4, 64]);

  let [linux, setLinux] = useState(true);
  let [macos, setMac] = useState(true);
  let [windows, setWindows] = useState(true);

  let [size, setSize] = useState([13, 18]);
  let [resolution, setResolution] = useState([1080, 3060]);
  let [ram, setRam] = useState([4, 64]);
  let [storage, setStorage] = useState([512, 8192]);

  let [topFrequency, setTopFrequency] = useState([1, 5]);
  let [cores, setCores] = useState([2, 256]);

  let [data, setData] = useState([] as any);
  let [pageOffset, setPageOffset] = useState(0);
  let [offset, setOffset] = useState(0);

  /* if (!isLoading) {
    console.log("getting new laptops")
    
    setData(data.concat(result.data));
    setIsLoading(result.isLoading);
  } */

  let [isFetching, setIsFetching] = useState(true);

  const result = trpc.getLaptops.useQuery({
    order: order,
    minPrice: price[0],
    maxPrice: price[1],
    macos: macos,
    windows: windows,
    linux: linux,
    minSize: size[0],
    maxSize: size[1],
    minResolution: resolution[0],
    maxResolution: resolution[1],
    minMemory: ram[0],
    maxMemory: ram[1],
    minStorage: storage[0],
    maxStorage: storage[1],
    minCores: cores[0],
    maxCores: cores[1],
    minCpuFrequency: topFrequency[0],
    maxCpuFrequency: topFrequency[1],
    forStudents,
    forGaming,
    forProgrammers,
    forWork,
    hasDedicatedGpu,
    minVram: vram[0],
    maxVram: vram[1],
    limit: 1,
    offset: offset + pageOffset * laptopsPerPage,
  });

  useEffect(() => {
    setData([]);
    setOffset(0);
    setIsFetching(true);
    setPageOffset(0);
  }, [
    order,
    price,
    macos,
    windows,
    linux,
    size,
    resolution,
    ram,
    storage,
    cores,
    topFrequency,
    forStudents,
    forGaming,
    forProgrammers,
    forWork,
    hasDedicatedGpu,
    vram,
  ]);

  useEffect(() => {
    setData([]);
    setOffset(0);
    setIsFetching(true);
  }, [pageOffset]);

  useEffect(() => {
    if (result.isLoading) {
      return;
    }
    if (!isFetching) {
      return;
    }

    setData((prev: any) => prev.concat(result.data));

    if (offset + 1 >= laptopsPerPage) {
      setIsFetching(false);
    }

    setOffset((prev) => prev + 1);
  }, [result]);

  // EdgeDB qeury

  /* const getLaptops = await e.select(e.Laptop, (laptop) => ({
    id: true,
    name: true,
    // titleImage: true,
    price: true,
    saleOf: true,
    linux: true,
    macos: true,
    windows: true,
    size: true,
    ram: true,
    cores: true,
    storage: true,
    topFrequency: true,
    order_by: {
      expression: laptop.saleOf,
      direction: e.DESC,
    },
    filter: e.set(
      e.op(laptop.price, ">=", price[0]),
      e.op(laptop.price, "<=", price[1]),
      e.op(forStudentss, "=", forStudentss),
      e.op(forGaming, "=", forGaming),
      e.op(forProgrammers, "=", forProgrammers),
      e.op(forWork, "=", forWork),
      e.op(dedicatedGPU, "=", dedicatedGPU),
      e.op(linux, "=", linux),
      e.op(mac, "=", mac),
      e.op(windows, "=", windows),
    )
  })).run(client);

  console.log("cores", getLaptops); */

  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible centerRow gapMedium">
        <div className="columnCollapsibleScroll gapMedium">
          <div className="column gapMedium">
            <h3 className="textMedium headerSmall">Filter</h3>

            <div className="columnCollapsible gapMedium">
              <Select
                optionNames={{
                  Basic: [
                    LaptopsOrder.BestDeal,
                    LaptopsOrder.PriceLowToHigh,
                    LaptopsOrder.PriceHighToLow,
                  ],
                  Advanced: [
                    LaptopsOrder.ByMemory,
                    LaptopsOrder.ByStorage,
                    LaptopsOrder.ByCores,
                    LaptopsOrder.ByCpuFrequency,
                  ],
                  Score: [
                    LaptopsOrder.StudentScore,
                    LaptopsOrder.GamingScore,
                    LaptopsOrder.OfficeWorkScore,
                    LaptopsOrder.ProgrammingScore,
                    LaptopsOrder.VideoEditingScore,
                  ]
                }}
                groupName="sort"
                className="borderBg3"
                onInput={(value) => {
                  "use client";
                  setOrder(value as LaptopsOrder)

                  // switch (value) {
                  //   case LaptopsOrder.BestDeal:
                  //     setOrder(LaptopsOrder.BestDeal);
                  //     break;
                  //   case LaptopsOrder.PriceLowToHigh:
                  //     setOrder(LaptopsOrder.PriceLowToHigh);
                  //     break;
                  //   case LaptopsOrder.PriceHighToLow:
                  //     setOrder(LaptopsOrder.PriceHighToLow);
                  //     break;
                  //   case LaptopsOrder.ByMemory:
                  //     setOrder(LaptopsOrder.ByMemory);
                  //     break;
                  //   case LaptopsOrder.ByStorage:
                  //     setOrder(LaptopsOrder.ByStorage);
                  //     break;
                  //   case LaptopsOrder.ByCores:
                  //     setOrder(LaptopsOrder.ByCores);
                  //     break;
                  //   case LaptopsOrder.ByCpuFrequency:
                  //     setOrder(LaptopsOrder.ByCpuFrequency);
                  //     break;
                  // }
                }}
              />

              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Price</h3>}
                steps={Array.from(
                  { length: 25 },
                  (_, i) => Math.pow(i * 100, 1.09432) /* (i + 1) * 100 - 100 */
                )}
                labelLeft={["$", ""]}
                labelRight={["$", ""]}
                emit={(left, right) => {
                  "use client";

                  setPrice([left, right]);
                }}
              />

              {/* <Accordian
                open={true}
                header={<h3 className="textSmall headerSmall">Price</h3>}
                className="borderBg3"
              >
                <div className="column gapSmall">
                  <div className="column gapXSmall">
                    <label htmlFor="minPrice" className="textXSmall">
                      Min
                    </label>
                    <input
                      className="textInput background2"
                      id="minPrice"
                      placeholder="Min"
                      type="number"
                      defaultValue={300}
                    />
                  </div>
                  <div className="column gapXSmall">
                    <label htmlFor="maxPrice" className="textXSmall">
                      Max
                    </label>
                    <input
                      className="textInput background2"
                      id="maxPrice"
                      placeholder="Max"
                      type="number"
                      defaultValue={2000}
                    />
                  </div>
                </div>
              </Accordian> */}
              <Accordian
                header={<h3 className="textSmall headerSmall">Use Case</h3>}
                open={true}
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox
                    id="forStudentss"
                    checked={forStudents}
                    onChange={(checked) => setforStudentss(checked)}
                  >
                    <h3 className="textXSmall">Students</h3>
                  </Checkbox>
                  <Checkbox
                    id="forGaming"
                    checked={forGaming}
                    onChange={(checked) => setforGaming(checked)}
                  >
                    <h3 className="textXSmall">Gaming</h3>
                  </Checkbox>
                  <Checkbox
                    id="forProgrammers"
                    checked={forProgrammers}
                    onChange={(checked) => setforProgrammers(checked)}
                  >
                    <h3 className="textXSmall">Programming</h3>
                  </Checkbox>
                  <Checkbox
                    id="forWork"
                    checked={forWork}
                    onChange={(checked) => setforWork(checked)}
                  >
                    <h3 className="textXSmall">Work</h3>
                  </Checkbox>
                </div>
              </Accordian>
            </div>
          </div>

          <div className="column gapMedium">
            <h2 className="textMedium headerSmall">Specifications</h2>

            <div className="columnCollapsible gapMedium">
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Display Size</h3>}
                steps={Array.from({ length: 6 }, (_, i) => i + 13)}
                labelLeft={["", " inches"]}
                labelRight={["", " inches"]}
                emit={(left, right) => {
                  "use client";
                  setSize([left, right]);
                }}
              />

              <DoubleSlider
                header={
                  <h3 className="textSmall headerSmall">Display Resolution</h3>
                }
                steps={Array.from(
                  { length: /* 41 */ 12 },
                  (_, i) =>
                    9 *
                    (100 +
                      (i + 1) *
                        20) /* Math.pow(2, i * 9/16 + 10) */ /* Math.sqrt((i * 400 * 1080) / (16 / 9)) + 1080 */
                )}
                labelLeft={["", "p"]}
                labelRight={["", "p"]}
                emit={(left, right) => {
                  "use client";
                  setResolution([left, right]);
                }}
              />
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Memory</h3>}
                steps={Array.from({ length: 6 }, (_, i) => Math.pow(2, i + 3))}
                labelLeft={["", " GB"]}
                labelRight={["", " GB"]}
                emit={(left, right) => {
                  "use client";
                  setRam([left, right]);
                }}
              />
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">Storage</h3>}
                steps={Array.from({ length: 5 }, (_, i) => Math.pow(2, i + 9))}
                labelLeft={["", " GB"]}
                labelRight={["", " GB"]}
                emit={(left, right) => {
                  "use client";
                  setStorage([left, right]);
                }}
              />
              <DoubleSlider
                header={<h3 className="textSmall headerSmall">CPU Cores</h3>}
                steps={Array.from({ length: 8 }, (_, i) => Math.pow(2, i + 1))}
                emit={(left, right) => {
                  "use client";
                  setCores([left, right]);
                }}
              />
              <DoubleSlider
                header={
                  <h3 className="textSmall headerSmall">Max Frequency</h3>
                }
                steps={Array.from({ length: 6 }, (_, i) => i + 1)}
                labelLeft={["", " GHz"]}
                labelRight={["", " GHz"]}
                emit={(left, right) => {
                  "use client";
                  setTopFrequency([left, right]);
                }}
              />

              <Accordian
                header={<h3 className="textSmall headerSmall">GPU</h3>}
                className="borderBg3"
              >
                <div className="column gapMedium">
                  <Checkbox
                    id="dedicatedGPU"
                    checked={hasDedicatedGpu}
                    onChange={(checked) => setHasDedicatedGpu(checked)}
                  >
                    <h3 className="textXSmall">Dedicated</h3>
                  </Checkbox>
                  <DoubleSlider
                    header={<h3 className="textSmall headerSmall">VRAM</h3>}
                    steps={Array.from({ length: 5 }, (_, i) =>
                      Math.pow(2, i * 1 + 2)
                    )}
                    labelLeft={["", " GB"]}
                    labelRight={["", " GB"]}
                    emit={(left, right) => {
                      "use client";
                      setVram([left, right]);
                    }}
                  />
                </div>
              </Accordian>
              <Accordian
                header={
                  <h3 className="textSmall headerSmall">Operating System</h3>
                }
                className="borderBg3"
              >
                <div className="column">
                  <Checkbox
                    id="windowsCheck"
                    checked={windows}
                    onChange={(checked) => setWindows(checked)}
                  >
                    <Image src={windowsIcon} alt="windows" className="osIcon" />
                    <h3 className="textXSmall">Windows</h3>
                  </Checkbox>
                  <Checkbox
                    id="macCheck"
                    checked={macos}
                    onChange={(checked) => setMac(checked)}
                  >
                    <Image src={macIcon} alt="mac" className="osIcon" />
                    <h3 className="textXSmall">macOS</h3>
                  </Checkbox>
                  <Checkbox
                    id="linuxCheck"
                    checked={linux}
                    onChange={(checked) => setLinux(checked)}
                  >
                    <Image src={linuxIcon} alt="linux" className="osIcon" />
                    <h3 className="textXSmall">Linux</h3>
                  </Checkbox>
                </div>
              </Accordian>
            </div>
          </div>
        </div>
        <div className="column gapLarge width100 centerRow centerColumn">
          <h1 className="textLarge headerLarge textCenter">Laptops</h1>
          <Display data={data as any} isFetching={isFetching} maxPreviews={laptopsPerPage} />
          <div className="row gapMedium centerRow centerColumn">
            <button
              disabled={pageOffset === 0}
              onClick={() => setPageOffset(pageOffset - 1)}
              className="button buttonBg3"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="textSmall headerSmall">{pageOffset}</h3>
            <button
              disabled={data.length < laptopsPerPage}
              onClick={() => setPageOffset(pageOffset + 1)}
              className="button buttonBg3"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
